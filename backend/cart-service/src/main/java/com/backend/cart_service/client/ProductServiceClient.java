package com.backend.cart_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.cart_service.dto.response.ProductResponse;

@FeignClient(name = "product-service")
public interface ProductServiceClient {
    @GetMapping("/api/product/{id}")
    ResponseEntity<ProductResponse> getProductById(@PathVariable String id);
}