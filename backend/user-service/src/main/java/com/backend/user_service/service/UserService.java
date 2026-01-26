package com.backend.user_service.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.user_service.dto.request.UserRequest;
import com.backend.user_service.dto.response.UserResponse;
import com.backend.user_service.entity.User;
import com.backend.user_service.mapper.UserMapper;
import com.backend.user_service.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<UserResponse> getCustomers(int page, int limit, String q, Integer status) {

        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        String role = "customer";

        Page<User> pageUser;

        if (q != null && !q.isBlank() && status != null) {
            pageUser = userRepository
                    .findByEmailContainingIgnoreCaseAndRoleAndStatus(q, role, status, pageable);
        } else if (q != null && !q.isBlank()) {
            pageUser = userRepository
                    .findByEmailContainingIgnoreCaseAndRole(q, role, pageable);
        } else if (status != null) {
            pageUser = userRepository
                    .findByRoleAndStatus(role, status, pageable);
        } else {
            pageUser = userRepository
                    .findByRole(role, pageable);
        }

        return pageUser.map(UserMapper::toResponse);
    }

    public Page<UserResponse> getAdmins(int page, int limit, String q, Integer status) {

        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        List<String> roles = List.of("admin");

        Page<User> pageUser;

        if (q != null && !q.isBlank() && status != null) {
            pageUser = userRepository
                    .findByEmailContainingIgnoreCaseAndRoleInAndStatus(q, roles, status, pageable);
        } else if (q != null && !q.isBlank()) {
            pageUser = userRepository
                    .findByEmailContainingIgnoreCaseAndRoleIn(q, roles, pageable);
        } else if (status != null) {
            pageUser = userRepository
                    .findByRoleInAndStatus(roles, status, pageable);
        } else {
            pageUser = userRepository
                    .findByRoleIn(roles, pageable);
        }

        return pageUser.map(UserMapper::toResponse);
    }

    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Người dùng không tồn tại"));

        return UserMapper.toResponse(user);
    }

    public UserResponse updateUser(String id, UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Người dùng không tồn tại"));

        if (request.getEmail() != null &&
                !request.getEmail().equals(user.getEmail()) &&
                userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }

        UserMapper.updateEntity(user, request, passwordEncoder);

        return UserMapper.toResponse(user);
    }

    public UserResponse updateUserStatus(String id, Integer status) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Người dùng không tồn tại"));

        user.setStatus(status);

        return UserMapper.toResponse(user);
    }

    public void deleteUser(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Người dùng không tồn tại"));

        userRepository.delete(user);
    }
}
