package com.backend.assistant_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.assistant_service.dto.request.MessageRequest;
import com.backend.assistant_service.service.AssistantService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Void> handleChat(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody MessageRequest request) {

        assistantService.handleChat(token, request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}