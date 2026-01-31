package com.backend.payment_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.backend.payment_service.dto.response.OrderResponse;

@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/api/order/code/{orderCode}")
    OrderResponse getOrderByOrderCode(@PathVariable String orderCode);

    @PatchMapping("/api/order/status/{id}")
    void updateOrderStatus(
            @PathVariable String id,
            @RequestParam Integer status);

    @DeleteMapping("/api/order/{orderCode}")
    ResponseEntity<Void> deleteOrderByCode(@PathVariable String orderCode);

    @PostMapping("/api/order/payment/{orderCode}")
    ResponseEntity<Void> confirmGatewayPayment(@PathVariable String orderCode);
}
