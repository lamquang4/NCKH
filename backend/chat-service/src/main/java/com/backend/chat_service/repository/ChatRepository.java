package com.backend.chat_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.chat_service.model.Chat;

public interface ChatRepository extends MongoRepository<Chat, String> {
    
}
