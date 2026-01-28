package com.backend.product_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.product_service.dto.response.BrandResponse;

@FeignClient(name = "brand-service")
public interface BrandServiceClient {

    @GetMapping("/api/brand/{id}")
    BrandResponse getBrandById(@PathVariable String id);
}
