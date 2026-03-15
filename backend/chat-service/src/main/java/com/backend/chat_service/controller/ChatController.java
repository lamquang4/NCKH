package com.backend.chat_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.backend.chat_service.dto.request.MessageRequest;
import com.backend.chat_service.dto.response.ChatResponse;
import com.backend.chat_service.dto.response.MessageResponse;
import com.backend.chat_service.exception.BadRequestException;
import com.backend.chat_service.service.ChatService;
import com.backend.chat_service.utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.ws.rs.ForbiddenException;

@Validated
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final JwtUtil jwtUtil;

    public ChatController(ChatService chatService, JwtUtil jwtUtil) {
        this.chatService = chatService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/user")
    public ResponseEntity<ChatResponse> getOrCreateChat(HttpServletRequest request) {
        String userId = extractUserIdFromHeader(request);
        return ResponseEntity.ok(chatService.getOrCreateChat(userId));
    }

    @PostMapping("/user/message")
    public ResponseEntity<MessageResponse> sendMessage(
            @Valid @RequestBody MessageRequest messageRequest,
            HttpServletRequest request) {
        String userId = extractUserIdFromHeader(request);
        return ResponseEntity.ok(chatService.sendMessage(userId, messageRequest));
    }

    // internal
    @GetMapping("/internal/{chatId}")
    public ResponseEntity<ChatResponse> getChatByIdInternal(
            @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatById(chatId));
    }

    private String extractUserIdFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || authHeader.isEmpty()) {
            throw new BadRequestException("Authorization header không được để trống");
        }

        String token = authHeader.replace("Bearer ", "");

        if (!jwtUtil.isTokenValid(token)) {
            throw new BadRequestException("Token không hợp lệ");
        }

        String role = jwtUtil.extractRole(token);
        if (!"customer".equals(role)) {
            throw new ForbiddenException("Chỉ customer mới có thể truy cập");
        }

        return jwtUtil.extractUserId(token);
    }
}