package com.backend.order_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecificationRequest {
    private String specKey;
    private String specValue;
    private Integer displayOrder;
    private Boolean isNew;
}
