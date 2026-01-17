package com.backend.user_service.controller;

import com.backend.user_service.service.UserService;

public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
