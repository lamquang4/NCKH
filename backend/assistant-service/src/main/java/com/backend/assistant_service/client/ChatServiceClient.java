package com.backend.assistant_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.backend.assistant_service.dto.request.MessageRequest;
import com.backend.assistant_service.dto.response.ChatResponse;
import com.backend.assistant_service.dto.response.MessageResponse;

@FeignClient(name = "chat-service")
public interface ChatServiceClient {

    @GetMapping("/api/chat/user")
    ChatResponse getOrCreateChat(
            @RequestHeader("Authorization") String token);

    @PostMapping("/api/chat/user/message")
    MessageResponse sendMessage(
            @RequestHeader("Authorization") String token,
            @RequestBody MessageRequest request);

    @GetMapping("/api/chat/internal/{chatId}")
    ChatResponse getChatById(
            @PathVariable String chatId);
}
