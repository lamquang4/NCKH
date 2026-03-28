package com.backend.chat_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.chat_service.dto.request.MessageRequest;
import com.backend.chat_service.dto.response.ApiResponse;
import com.backend.chat_service.dto.response.ChatResponse;
import com.backend.chat_service.service.ChatService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@Validated
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<ChatResponse>> getOrCreateChat(
            @AuthenticationPrincipal String userId) {

        return ResponseEntity.ok(
                ApiResponse.<ChatResponse>builder()
                        .message("Lấy cuộc hội thoại thành công")
                        .data(chatService.getOrCreateChat(userId))
                        .build());
    }

    // internal
    @GetMapping("/internal/user/{userId}")
    public ResponseEntity<ChatResponse> getOrCreateChatInternal(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                chatService.getOrCreateChat(userId));
    }

    @PostMapping("/internal/user/message/{userId}")
    public ResponseEntity<Void> sendUserMessage(
            @PathVariable String userId,
            @Valid @RequestBody MessageRequest messageRequest) {

        chatService.saveMessage(messageRequest, userId, "USER");
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/internal/assistant/message")
    public ResponseEntity<Void> saveAssistantMessage(
            @Valid @RequestBody MessageRequest messageRequest) {
        chatService.saveMessage(messageRequest, null, "ASSISTANT");
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/internal/{chatId}")
    public ResponseEntity<ChatResponse> getChatByIdInternal(
            @PathVariable String chatId) {
        return ResponseEntity.ok(chatService.getChatById(chatId));
    }

}