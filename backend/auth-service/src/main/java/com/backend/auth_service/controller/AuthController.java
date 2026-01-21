package com.backend.auth_service.controller;

import com.backend.auth_service.service.AuthService;

public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
}
