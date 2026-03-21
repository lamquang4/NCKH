package com.backend.assistant_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.backend.assistant_service.dto.request.MessageRequest;
import com.backend.assistant_service.dto.response.ChatResponse;

@FeignClient(name = "chat-service")
public interface ChatServiceClient {

        @GetMapping("/api/chat/user")
        ChatResponse getOrCreateChat(@RequestHeader("Authorization") String token);

        @PostMapping("/api/chat/user/message")
        void sendUserMessage(
                        @RequestHeader("Authorization") String token,
                        @RequestBody MessageRequest request);

        @PostMapping("/api/chat/internal/assistant/message")
        void saveAssistantMessage(@RequestBody MessageRequest request);

        @GetMapping("/api/chat/internal/{chatId}")
        ChatResponse getChatById(@PathVariable("chatId") String chatId);
}
