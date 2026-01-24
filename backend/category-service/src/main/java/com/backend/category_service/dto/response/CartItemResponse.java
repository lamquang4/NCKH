package com.backend.category_service.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponse {
    private String id;
    private String productId;
    private String name;
    private List<String> images;
    private double price;
    private double discount;
    private String slug;
    private int quantity;
    private int stock;
}
