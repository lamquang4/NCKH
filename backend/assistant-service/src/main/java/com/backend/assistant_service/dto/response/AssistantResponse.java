package com.backend.assistant_service.dto.response;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssistantResponse {
    private String content;
    private String intent;
    private List<String> productIds;
    private Map<String, Object> extraData;
}