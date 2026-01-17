package com.backend.chat_service.controller;

import com.backend.chat_service.service.ChatService;

public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }
}
