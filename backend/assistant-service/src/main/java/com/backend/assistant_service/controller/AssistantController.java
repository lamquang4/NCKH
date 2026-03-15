package com.backend.assistant_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.assistant_service.dto.request.MessageRequest;
import com.backend.assistant_service.dto.response.MessageResponse;
import com.backend.assistant_service.service.AssistantService;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/chat")
    public ResponseEntity<MessageResponse> chat(
            @RequestHeader("Authorization") String token,
            @RequestBody MessageRequest request) {

        MessageResponse response =
                assistantService.handleChat(token, request);

        return ResponseEntity.ok(response);
    }
}