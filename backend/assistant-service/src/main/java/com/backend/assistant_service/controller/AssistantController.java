package com.backend.assistant_service.controller;

import com.backend.assistant_service.service.AssistantService;

public class AssistantController {
    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }
}
