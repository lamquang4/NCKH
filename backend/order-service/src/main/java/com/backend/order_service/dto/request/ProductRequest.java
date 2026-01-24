package com.backend.order_service.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
    private String name;
    private double price;
    private double discount;
    private String description;
    private Integer status;
    private Integer stock;
    private String categoryId;
    private String brandId;
    private List<ImageProductRequest> images;
    private List<SpecificationRequest> specifications;
}
