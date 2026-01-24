package com.backend.category_service.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    private String fullname;
    private String phone;
    private String speaddress;
    private String city;
    private String ward;
    private String paymethod;
    private List<OrderItemRequest> items;
}
