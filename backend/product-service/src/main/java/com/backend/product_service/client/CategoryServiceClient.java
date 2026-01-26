package com.backend.product_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.product_service.dto.response.CategoryResponse;

@FeignClient(name = "category-service")
public interface CategoryServiceClient {

    @GetMapping("/api/category/{id}")
    CategoryResponse getCategoryById(@PathVariable String id);

    @GetMapping("/api/category/slug/{slug}")
    CategoryResponse getCategoryBySlug(@PathVariable String slug);
}
