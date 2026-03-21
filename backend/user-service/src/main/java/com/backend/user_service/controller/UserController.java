package com.backend.user_service.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import org.springframework.http.HttpStatus;

@Validated
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
                                                "customers", userPage.getContent(),
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
                                                "admins", userPage.getContent(),
                                                "totalPages", userPage.getTotalPages(),
                                                "total", userPage.getTotalElements()));
        }

        @GetMapping("/{id}")
        public ResponseEntity<UserResponse> getUserById(
                        @PathVariable String id) {

                return ResponseEntity.ok(userService.getUserById(id));
        }

        @PutMapping("/{id}")
        public ResponseEntity<Void> updateUser(
                        @PathVariable String id,
                        @Valid @RequestBody UserRequest request) {
                userService.updateUser(id, request);
                return ResponseEntity.noContent().build();
        }

        @PatchMapping("/status/{id}")
        public ResponseEntity<Void> updateUserStatus(
                        @PathVariable String id,
                        @RequestParam @NotNull Integer status) {
                userService.updateUserStatus(id, status);
                return ResponseEntity.noContent().build();
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable String id) {
                userService.deleteUser(id);
                return ResponseEntity.noContent().build();
        }

        @PostMapping
        public ResponseEntity<Void> createUser(
                        @Valid @RequestBody UserRequest request) {

                userService.createUser(request);
                return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        // internal
        @GetMapping("/internal/{id}")
        public ResponseEntity<UserResponse> getUserByIdInternal(
                        @PathVariable String id) {

                return ResponseEntity.ok(userService.getUserById(id));
        }

        @GetMapping("/internal/exist/user/{email}")
        public ResponseEntity<Boolean> existsUserByEmailInternal(
                        @PathVariable String email) {

                return ResponseEntity.ok(
                                userService.existsUserByEmail(email));
        }

        @GetMapping("/internal/email/{email}")
        public UserAuthResponse getUserByEmailInternal(@PathVariable String email) {
                return UserMapper.toAuthResponse(
                                userService.getUserByEmail(email));
        }

        @PostMapping("/internal")
        public ResponseEntity<Void> createUserInternal(
                        @Valid @RequestBody UserRequest request) {

                userService.createUser(request);
                return ResponseEntity.status(HttpStatus.CREATED).build();
        }
}
