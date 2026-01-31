package com.backend.product_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/api/order/exists/{productId}")
    boolean existsProductInOrder(@PathVariable("productId") String productId);
}
