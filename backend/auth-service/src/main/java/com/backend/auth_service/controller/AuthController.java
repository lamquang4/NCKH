package com.backend.auth_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.auth_service.dto.request.LoginRequest;
import com.backend.auth_service.dto.request.UserRequest;
import com.backend.auth_service.dto.request.VerifyOtpRequest;
import com.backend.auth_service.dto.response.LoginResponse;
import com.backend.auth_service.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/otp")
    public ResponseEntity<Void> sendRegisterOtp(
            @RequestParam String email) {

        authService.sendRegisterOtp(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify/otp")
    public ResponseEntity<Void> verifyOtpAndRegister(
            @Valid @RequestBody VerifyOtpRequest otpRequest,
            @Valid @RequestBody UserRequest userRequest) {

        authService.verifyOtpAndRegister(otpRequest, userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
