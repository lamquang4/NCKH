package com.backend.user_service.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.user_service.dto.request.UserRequest;
import com.backend.user_service.dto.response.UserFullnameResponse;
import com.backend.user_service.dto.response.UserResponse;
import com.backend.user_service.entity.User;
import com.backend.user_service.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    // ==========================================
    // 1. Nhóm test cho việc lấy danh sách (getCustomers, getAdmins)
    // ==========================================

    @Test
    void getCustomers_ShouldReturnPagedCustomers_WhenNoFilters() {
        // Given
        User user = createSampleUser("CUSTOMER");
        Page<User> userPage = new PageImpl<>(List.of(user));

        when(userRepository.findByRole(anyString(), any(Pageable.class))).thenReturn(userPage);

        // When
        Page<UserResponse> result = userService.getCustomers(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void getAdmins_ShouldReturnPagedAdmins_WhenNoFilters() {
        // Given
        User user = createSampleUser("ADMIN");
        Page<User> userPage = new PageImpl<>(List.of(user));

        when(userRepository.findByRoleIn(any(List.class), any(Pageable.class))).thenReturn(userPage);

        // When
        Page<UserResponse> result = userService.getAdmins(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
    }

    // ==========================================
    // 2. Nhóm test cho getUserById / getFullnameById
    // ==========================================

    @Test
    void getUserById_ShouldReturnUserResponse_WhenUserExists() {
        // Given
        User user = createSampleUser("CUSTOMER");
        user.setId("user-id");

        when(userRepository.findById("user-id")).thenReturn(Optional.of(user));

        // When
        UserResponse result = userService.getUserById("user-id");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo("user-id");
    }

    @Test
    void getFullnameById_ShouldReturnFullname_WhenUserExists() {
        // Given
        User user = createSampleUser("CUSTOMER");
        user.setId("user-id");
        user.setFullname("Nguyen Van A");

        when(userRepository.findById("user-id")).thenReturn(Optional.of(user));

        // When
        UserFullnameResponse result = userService.getFullnameById("user-id");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getFullname()).isEqualTo("Nguyen Van A");
    }

    // ==========================================
    // 3. Nhóm test cho tạo mới user (createUser)
    // ==========================================

    @Test
    void createUser_ShouldSaveUser_WhenRequestIsValid() {
        // Given
        UserRequest request = UserRequest.builder()
                .email("newuser@example.com")
                .fullname("Nguyen Van A")
                .phone("0912345678")
                .password("password123")
                .build();

        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(userRepository.existsByPhone("0912345678")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");

        // When
        userService.createUser(request);

        // Then
        verify(userRepository).save(any(User.class));
    }


    // ==========================================
    // 4. Nhóm test cho update User
    // ==========================================

    @Test
    void updateUser_ShouldUpdateUser_WhenRequestIsValid() {
        // Given
        User existingUser = createSampleUser("CUSTOMER");
        existingUser.setId("user-id");

        when(userRepository.findById("user-id")).thenReturn(Optional.of(existingUser));

        UserRequest request = UserRequest.builder()
                .email("updated@example.com")
                .fullname("Nguyen Van B")
                .phone("0987654321")
                .build();

        when(userRepository.findByEmail("updated@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByPhone("0987654321")).thenReturn(Optional.empty());

        // When
        userService.updateUser("user-id", request);

        // Then
        assertThat(existingUser.getFullname()).isEqualTo("Nguyen Van B");
        assertThat(existingUser.getPhone()).isEqualTo("0987654321");
    }

    // ==========================================
    // 5. Nhóm test cho xóa User / update status
    // ==========================================

    @Test
    void deleteUser_ShouldDeleteUser_WhenUserExists() {
        // Given
        User user = createSampleUser("CUSTOMER");
        user.setId("user-id");
        when(userRepository.findById("user-id")).thenReturn(Optional.of(user));

        // When
        userService.deleteUser("user-id");

        // Then
        verify(userRepository).delete(user);
    }

    @Test
    void updateUserStatus_ShouldUpdateStatus_WhenUserExists() {
        // Given
        User user = createSampleUser("CUSTOMER");
        user.setId("user-id");
        when(userRepository.findById("user-id")).thenReturn(Optional.of(user));

        // When
        userService.updateUserStatus("user-id", 0);

        // Then
        assertThat(user.getStatus()).isEqualTo(0);
        verify(userRepository).save(user);
    }

    // Helper Method
    private User createSampleUser(String role) {
        return User.builder()
                .id("test-id")
                .email("test@example.com")
                .fullname("Test User")
                .phone("0901234567")
                .role(role)
                .status(1)
                .birthDate(LocalDate.of(1995, 1, 1))
                .gender(1)
                .build();
    }
}