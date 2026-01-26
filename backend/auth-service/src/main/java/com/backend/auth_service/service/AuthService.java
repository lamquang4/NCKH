package com.backend.auth_service.service;

import org.springframework.stereotype.Service;

import com.backend.auth_service.repository.AuthRepository;

@Service
public class AuthService {
    private final AuthRepository authRepository;

    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }
}
