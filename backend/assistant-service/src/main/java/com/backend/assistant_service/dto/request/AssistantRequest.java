package com.backend.assistant_service.dto.request;

import java.util.List;

import com.backend.assistant_service.dto.response.MessageResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssistantRequest {
    private String chatId;
    private String userId;
    private String message;
    private List<MessageResponse> history;
}
