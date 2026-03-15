package com.backend.assistant_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.backend.assistant_service.client.ChatServiceClient;
import com.backend.assistant_service.dto.request.AssistantRequest;
import com.backend.assistant_service.dto.request.MessageRequest;
import com.backend.assistant_service.dto.response.AssistantResponse;
import com.backend.assistant_service.dto.response.ChatResponse;
import com.backend.assistant_service.dto.response.MessageResponse;

@Service
public class AssistantService {
    private final ChatServiceClient chatServiceClient;
    private final WebClient webClient;

    @Value("${n8n.webhook}")
    private String webhookPath;

    public AssistantService(ChatServiceClient chatServiceClient,
            WebClient.Builder builder,
            @Value("${n8n.url}") String n8nUrl) {

        this.chatServiceClient = chatServiceClient;

        this.webClient = builder
                .baseUrl(n8nUrl)
                .build();
    }

    public MessageResponse handleChat(String token, MessageRequest request) {

        // 1 lấy chat
        ChatResponse chat = chatServiceClient.getOrCreateChat(token);

        // 2 lưu message user
        MessageResponse userMessage = chatServiceClient.sendMessage(token, request);

        // 3 gọi AI agent
        AssistantResponse aiResponse = callAI(chat, userMessage);

        // 4 lưu message assistant
        MessageRequest aiMessage = MessageRequest.builder()
                .chatId(chat.getId())
                .content(aiResponse.getContent())
                .build();

        return chatServiceClient.sendMessage(token, aiMessage);
    }

    private AssistantResponse callAI(ChatResponse chat,
            MessageResponse userMessage) {

        AssistantRequest aiRequest = AssistantRequest.builder()
                .chatId(chat.getId())
                .userId(chat.getUserId())
                .message(userMessage.getContent())
                .history(chat.getMessages())
                .build();

        return webClient.post()
                .uri("/webhook/ai-agent")
                .bodyValue(aiRequest)
                .retrieve()
                .bodyToMono(AssistantResponse.class)
                .block();
    }
}