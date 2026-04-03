package com.backend.chat_service.mapper;

import java.util.List;

import com.backend.chat_service.dto.request.MessageRequest;
import com.backend.chat_service.dto.response.MessageResponse;
import com.backend.chat_service.dto.response.ProductListItemResponse;
import com.backend.chat_service.model.Chat;
import com.backend.chat_service.model.Message;

public final class ChatMapper {

    private ChatMapper() {
    }

    public static MessageResponse toMessageResponse(Message message, List<ProductListItemResponse> products) {
        return MessageResponse.builder()
                .id(message.getId())
                .chatId(message.getChatId())
                .role(message.getRole())
                .content(message.getContent())
                .products(products)
                .createdAt(message.getCreatedAt())
                .build();
    }

    public static Message toMessageEntity(MessageRequest request, String chatId, String role) {
        return Message.builder()
                .chatId(chatId)
                .role(role)
                .content(request.getContent())
                .productIds(request.getProductIds())
                .build();
    }
}