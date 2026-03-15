package com.backend.chat_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.chat_service.dto.request.MessageRequest;
import com.backend.chat_service.dto.response.ChatResponse;
import com.backend.chat_service.dto.response.MessageResponse;
import com.backend.chat_service.exception.NotFoundException;
import com.backend.chat_service.mapper.ChatMapper;
import com.backend.chat_service.model.Chat;
import com.backend.chat_service.model.Message;
import com.backend.chat_service.repository.ChatRepository;
import com.backend.chat_service.repository.MessageRepository;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public ChatService(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
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
                .map(ChatMapper::toMessageResponse)
                .toList();

        return ChatMapper.toChatResponse(chat, messages);
    }

    // Gửi tin nhắn
    public MessageResponse sendMessage(String userId, MessageRequest request) {
        Chat chat = chatRepository.findByUserId(userId)
                .orElseGet(() -> chatRepository.save(
                        Chat.builder()
                                .userId(userId)
                                .build()));

        Message userMessage = ChatMapper.toMessageEntity(request, chat.getId(), "USER");
        messageRepository.save(userMessage);

        return ChatMapper.toMessageResponse(userMessage);
    }

    // lấy chat bằng id
    public ChatResponse getChatById(String chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new NotFoundException("Chat không tồn tại"));

        List<MessageResponse> messages = messageRepository
                .findByChatIdOrderByCreatedAtAsc(chatId)
                .stream()
                .map(ChatMapper::toMessageResponse)
                .toList();

        return ChatMapper.toChatResponse(chat, messages);
    }
}