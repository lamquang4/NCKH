package com.backend.user_service.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.backend.user_service.dto.request.UserRequest;
import com.backend.user_service.dto.response.UserResponse;
import com.backend.user_service.entity.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {
        if (user == null)
            return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullname(user.getFullname())
                .phone(user.getPhone())
                .birthDate(user.getBirthDate())
                .gender(user.getGender())
                .role(user.getRole())
                .status(user.getStatus())
                .googleId(user.getGoogleId())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public static void updateEntity(
            User user,
            UserRequest request,
            PasswordEncoder passwordEncoder) {

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
    }
}
