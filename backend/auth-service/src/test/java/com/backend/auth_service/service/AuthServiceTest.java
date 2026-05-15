package com.backend.auth_service.service;

import com.backend.auth_service.client.UserServiceClient;
import com.backend.auth_service.dto.request.LoginRequest;
import com.backend.auth_service.dto.request.UserRequest;
import com.backend.auth_service.dto.request.VerifyOtpRequest;
import com.backend.auth_service.dto.response.LoginResponse;
import com.backend.auth_service.dto.response.UserAuthResponse;
import com.backend.auth_service.entity.Otp;
import com.backend.auth_service.exception.AppException;
import com.backend.auth_service.exception.ErrorCode;
import com.backend.auth_service.repository.AuthRepository;
import feign.FeignException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthRepository authRepository;

    @Mock
    private UserServiceClient userServiceClient;

    @Mock
    private EmailService emailService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    // ==========================================
    // 1. Nhóm test cho sendRegisterOtp
    // ==========================================

    @Test
    void sendRegisterOtp_ShouldSendOtp_WhenRequestIsValid() {
        // Given
        String email = "test@example.com";
        when(userServiceClient.existsUserByEmailInternal(email)).thenReturn(false);
        when(authRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("hashedOtp");

        // When
        authService.sendRegisterOtp(email);

        // Then
        verify(authRepository).save(any(Otp.class));
        verify(emailService).sendOtp(anyString(), anyString());
    }

    @Test
    void sendRegisterOtp_ShouldThrowException_WhenInvalidEmail() {
        // Given
        String email = "invalid-email";

        // When & Then
        assertThatThrownBy(() -> authService.sendRegisterOtp(email))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.INVALID_EMAIL.getMessage());
    }

    @Test
    void sendRegisterOtp_ShouldThrowException_WhenEmailAlreadyUsed() {
        // Given
        String email = "used@example.com";
        when(userServiceClient.existsUserByEmailInternal(email)).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> authService.sendRegisterOtp(email))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.EMAIL_ALREADY_USED.getMessage());
    }

    @Test
    void sendRegisterOtp_ShouldThrowException_WhenOtpStillValid() {
        // Given
        String email = "test@example.com";
        when(userServiceClient.existsUserByEmailInternal(email)).thenReturn(false);

        Otp existingOtp = Otp.builder()
                .email(email)
                .expiredAt(LocalDateTime.now().plusMinutes(2))
                .build();
        when(authRepository.findByEmail(email)).thenReturn(Optional.of(existingOtp));

        // When & Then
        assertThatThrownBy(() -> authService.sendRegisterOtp(email))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.OTP_STILL_VALID.getMessage());
    }

    @Test
    void verifyOtpAndRegister_ShouldThrowException_WhenEmailMismatch() {
        // Given
        VerifyOtpRequest otpRequest = VerifyOtpRequest.builder()
                .email("different@example.com")
                .otp("123456")
                .build();

        UserRequest userRequest = new UserRequest();
        userRequest.setEmail("test@example.com");

        // When & Then
        assertThatThrownBy(() -> authService.verifyOtpAndRegister(otpRequest, userRequest))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.OTP_EMAIL_MISMATCH.getMessage());
    }

    @Test
    void verifyOtpAndRegister_ShouldThrowException_WhenOtpExpired() {
        // Given
        VerifyOtpRequest otpRequest = VerifyOtpRequest.builder()
                .email("test@example.com")
                .otp("123456")
                .build();

        UserRequest userRequest = new UserRequest();
        userRequest.setEmail("test@example.com");

        Otp otpEntity = Otp.builder()
                .email("test@example.com")
                .expiredAt(LocalDateTime.now().minusMinutes(1)) // Hết hạn
                .build();

        when(authRepository.findByEmail("test@example.com")).thenReturn(Optional.of(otpEntity));

        // When & Then
        assertThatThrownBy(() -> authService.verifyOtpAndRegister(otpRequest, userRequest))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.OTP_EXPIRED.getMessage());
    }

    @Test
    void verifyOtpAndRegister_ShouldIncrementAttempts_WhenPasswordDoesNotMatch() {
        // Given
        VerifyOtpRequest otpRequest = VerifyOtpRequest.builder()
                .email("test@example.com")
                .otp("wrong-otp")
                .build();

        UserRequest userRequest = new UserRequest();
        userRequest.setEmail("test@example.com");

        Otp otpEntity = Otp.builder()
                .email("test@example.com")
                .otp("hashedOtp")
                .expiredAt(LocalDateTime.now().plusMinutes(5))
                .failedAttempts(1)
                .build();

        when(authRepository.findByEmail("test@example.com")).thenReturn(Optional.of(otpEntity));
        when(passwordEncoder.matches("wrong-otp", "hashedOtp")).thenReturn(false);

        // When & Then
        assertThatThrownBy(() -> authService.verifyOtpAndRegister(otpRequest, userRequest))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.OTP_INCORRECT.getMessage());

        assertThat(otpEntity.getFailedAttempts()).isEqualTo(2);
        verify(authRepository).save(otpEntity);
    }

    @Test
    void verifyOtpAndRegister_ShouldDeleteOtp_WhenTooManyAttempts() {
        // Given
        VerifyOtpRequest otpRequest = VerifyOtpRequest.builder()
                .email("test@example.com")
                .otp("wrong-otp")
                .build();

        UserRequest userRequest = new UserRequest();
        userRequest.setEmail("test@example.com");

        Otp otpEntity = Otp.builder()
                .email("test@example.com")
                .otp("hashedOtp")
                .expiredAt(LocalDateTime.now().plusMinutes(5))
                .failedAttempts(4)
                .build();

        when(authRepository.findByEmail("test@example.com")).thenReturn(Optional.of(otpEntity));
        when(passwordEncoder.matches("wrong-otp", "hashedOtp")).thenReturn(false);

        // When & Then
        assertThatThrownBy(() -> authService.verifyOtpAndRegister(otpRequest, userRequest))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.OTP_TOO_MANY_ATTEMPTS.getMessage());

        verify(authRepository).delete(otpEntity);
    }

    // ==========================================
    // 3. Nhóm test cho handleLogin
    // ==========================================

    @Test
    void handleLogin_ShouldReturnToken_WhenCredentialsAreValid() {
        // Given
        LoginRequest request = LoginRequest.builder()
                .email("test@example.com")
                .password("password123")
                .build();

        UserAuthResponse userAuthResponse = UserAuthResponse.builder()
                .id("user-id")
                .email("test@example.com")
                .password("encodedPassword")
                .role("CUSTOMER")
                .status(1)
                .fullname("Test User")
                .build();

        when(userServiceClient.getUserByEmailInternal("test@example.com")).thenReturn(userAuthResponse);
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(jwtService.generateAccessToken(userAuthResponse)).thenReturn("dummy-jwt-token");

        // When
        LoginResponse result = authService.handleLogin(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getToken()).isEqualTo("dummy-jwt-token");
        assertThat(result.getRole()).isEqualTo("CUSTOMER");
    }

    @Test
    void handleLogin_ShouldThrowException_WhenUserNotFound() {
        // Given
        LoginRequest request = LoginRequest.builder()
                .email("not-found@example.com")
                .password("any")
                .build();

        when(userServiceClient.getUserByEmailInternal("not-found@example.com"))
                .thenThrow(FeignException.NotFound.class);

        // When & Then
        assertThatThrownBy(() -> authService.handleLogin(request))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.LOGIN_FAILED.getMessage());
    }

    @Test
    void handleLogin_ShouldThrowException_WhenAccountIsLocked() {
        // Given
        LoginRequest request = LoginRequest.builder()
                .email("locked@example.com")
                .password("password123")
                .build();

        UserAuthResponse userAuthResponse = UserAuthResponse.builder()
                .id("user-id")
                .email("locked@example.com")
                .password("encodedPassword")
                .status(0) // Locked
                .build();

        when(userServiceClient.getUserByEmailInternal("locked@example.com")).thenReturn(userAuthResponse);
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> authService.handleLogin(request))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.ACCOUNT_LOCKED.getMessage());
    }

    // ==========================================
    // 4. Nhóm test cho cleanupExpiredOtp
    // ==========================================

    @Test
    void cleanupExpiredOtp_ShouldDeleteExpiredOtp_Successfully() {
        // When
        authService.cleanupExpiredOtp();

        // Then
        verify(authRepository).deleteExpiredOtp(any(LocalDateTime.class));
    }
}