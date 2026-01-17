package com.backend.chat_service.service;

import com.backend.chat_service.repository.ChatRepository;

public class ChatService {
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }
}
