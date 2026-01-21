package com.backend.auth_service.service;

import com.backend.auth_service.repository.AuthRepository;

public class AuthService {
    private final AuthRepository authRepository;

    public AuthService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }
}
