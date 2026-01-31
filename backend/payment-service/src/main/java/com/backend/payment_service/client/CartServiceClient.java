package com.backend.payment_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cart-service")
public interface CartServiceClient {
    @DeleteMapping("/api/cart/clear/{userId}")
    ResponseEntity<Void> clearCart(@PathVariable String userId);
}
