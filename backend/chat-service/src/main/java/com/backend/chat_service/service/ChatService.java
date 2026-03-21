package com.backend.chat_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.chat_service.client.ProductServiceClient;
import com.backend.chat_service.dto.request.MessageRequest;
import com.backend.chat_service.dto.response.ChatResponse;
import com.backend.chat_service.dto.response.MessageResponse;
import com.backend.chat_service.dto.response.ProductListItemResponse;
import com.backend.chat_service.exception.NotFoundException;
import com.backend.chat_service.mapper.ChatMapper;
import com.backend.chat_service.model.Chat;
import com.backend.chat_service.model.Message;
import com.backend.chat_service.repository.ChatRepository;
import com.backend.chat_service.repository.MessageRepository;

import jakarta.ws.rs.ForbiddenException;

@Service
public class ChatService {

        private final ChatRepository chatRepository;
        private final MessageRepository messageRepository;
        private final ProductServiceClient productServiceClient;

        public ChatService(ChatRepository chatRepository,
                        MessageRepository messageRepository,
                        ProductServiceClient productServiceClient) {
                this.chatRepository = chatRepository;
                this.messageRepository = messageRepository;
                this.productServiceClient = productServiceClient;
        }

        // Lấy chat của user
        public ChatResponse getOrCreateChat(String userId) {
                Chat chat = chatRepository.findByUserId(userId)
                                .orElseGet(() -> chatRepository.save(
                                                Chat.builder()
                                                                .userId(userId)
                                                                .build()));

                List<MessageResponse> messages = messageRepository
                                .findByChatIdOrderByCreatedAtAsc(chat.getId())
                                .stream()
                                .map(this::mapMessageWithProducts)
                                .toList();

                return ChatMapper.toChatResponse(chat, messages);
        }

        // Lưu tin nhắn với role được truyền vào (USER hoặc ASSISTANT)
        public void saveMessage(MessageRequest request, String userId, String role) {
                Chat chat = chatRepository.findById(request.getChatId())
                                .orElseThrow(() -> new NotFoundException("Chat không tìm thấy"));

                if (userId != null && !chat.getUserId().equals(userId)) {
                        throw new ForbiddenException("Bạn không có quyền gửi tin nhắn vào chat này");
                }

                Message message = ChatMapper.toMessageEntity(request, chat.getId(), role);
                messageRepository.save(message);
        }

        // lấy chat bằng id
        public ChatResponse getChatById(String chatId) {
                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new NotFoundException("Chat không tìm thấy"));

                List<MessageResponse> messages = messageRepository
                                .findByChatIdOrderByCreatedAtAsc(chatId)
                                .stream()
                                .map(this::mapMessageWithProducts)
                                .toList();

                return ChatMapper.toChatResponse(chat, messages);
        }

        private MessageResponse mapMessageWithProducts(Message message) {
                if (message.getProductIds() != null && !message.getProductIds().isEmpty()) {
                        List<ProductListItemResponse> products = productServiceClient
                                        .getProductsByIdsInternal(message.getProductIds());
                        return ChatMapper.toMessageResponse(message, products);
                }
                return ChatMapper.toMessageResponse(message, List.of());
        }
}