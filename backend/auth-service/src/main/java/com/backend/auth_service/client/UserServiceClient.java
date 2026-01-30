package com.backend.auth_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.backend.auth_service.dto.request.UserRequest;
import com.backend.auth_service.dto.response.UserAuthResponse;
import com.backend.auth_service.dto.response.UserResponse;

import jakarta.validation.Valid;

@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/api/user/exist/user/{email}")
    Boolean existsUserByEmail(@PathVariable String email);

    @PostMapping("/api/user")
    ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request);

    @GetMapping("/api/user/email/{email}")
    UserAuthResponse getUserByEmail(@PathVariable String email);
}
