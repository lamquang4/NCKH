package com.backend.brand_service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.brand_service.dto.response.ProductResponse;

import jakarta.validation.constraints.NotNull;

@FeignClient(name = "product-service")
public interface ProductServiceClient {
    @GetMapping("/api/product/exist/brand/{brandId}")
    Boolean existsProductByBrandId(@PathVariable String brandId);

    @GetMapping("/api/product/brand/{brandId}")
    ResponseEntity<List<ProductResponse>> getAllActiveProductsByBrandId(@PathVariable String brandId);

    @PatchMapping("/api/product/status/{id}")
    ResponseEntity<ProductResponse> updateProductStatus(@PathVariable String id, @RequestParam @NotNull Integer status);
}
