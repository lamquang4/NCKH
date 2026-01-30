package com.backend.user_service.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import com.backend.user_service.dto.request.UserRequest;
import com.backend.user_service.dto.response.UserAuthResponse;
import com.backend.user_service.dto.response.UserResponse;
import com.backend.user_service.mapper.UserMapper;
import com.backend.user_service.service.UserService;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/customers")
    public ResponseEntity<?> getCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer status) {

        Page<UserResponse> userPage = userService.getCustomers(page, limit, q, status);

        return ResponseEntity.ok(
                Map.of(
                        "data", userPage.getContent(),
                        "totalPages", userPage.getTotalPages(),
                        "total", userPage.getTotalElements()));
    }

    @GetMapping("/admins")
    public ResponseEntity<?> getAdmins(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int limit,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Integer status) {

        Page<UserResponse> userPage = userService.getAdmins(page, limit, q, status);

        return ResponseEntity.ok(
                Map.of(
                        "data", userPage.getContent(),
                        "totalPages", userPage.getTotalPages(),
                        "total", userPage.getTotalElements()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable String id) {

        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String id,
            @Valid @RequestBody UserRequest request) {

        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable String id,
            @RequestParam @NotNull Integer status) {

        return ResponseEntity.ok(
                userService.updateUserStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exist/user/{email}")
    public ResponseEntity<Boolean> existsUserByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(
                userService.existsUserByEmail(email));
    }

    @GetMapping("/email/{email}")
    public UserAuthResponse getUserByEmail(@PathVariable String email) {
        return UserMapper.toAuthResponse(
                userService.getUserByEmail(email));
    }

}
