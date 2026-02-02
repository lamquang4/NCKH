package com.backend.order_service.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import com.backend.order_service.dto.request.OrderRequest;
import com.backend.order_service.dto.response.OrderResponse;
import com.backend.order_service.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
        private final OrderService orderService;

        public OrderController(OrderService orderService) {
                this.orderService = orderService;
        }

        @GetMapping
        public ResponseEntity<?> getOrders(
                        @RequestParam(defaultValue = "1") int page,
                        @RequestParam(defaultValue = "12") int limit,
                        @RequestParam(required = false) String q,
                        @RequestParam(required = false) Integer status,
                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
                        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

                Page<OrderResponse> orderPage = orderService.getOrders(
                                page,
                                limit,
                                q,
                                status,
                                start,
                                end);

                return ResponseEntity.ok(
                                Map.of(
                                                "orders", orderPage.getContent(),
                                                "totalPages", orderPage.getTotalPages(),
                                                "total", orderPage.getTotalElements()));
        }

        @GetMapping("/{id}")
        public ResponseEntity<OrderResponse> getOrderById(
                        @PathVariable String id) {

                return ResponseEntity.ok(
                                orderService.getOrderById(id));
        }

        @GetMapping("/code/{orderCode}")
        public ResponseEntity<OrderResponse> getOrderByOrderCode(
                        @PathVariable String orderCode) {

                return ResponseEntity.ok(
                                orderService.getOrderByOrderCode(orderCode));
        }

        @GetMapping("/user/{userId}/{orderCode}")
        public ResponseEntity<OrderResponse> getOrderByOrderCodeAndUser(
                        @PathVariable String orderCode, @PathVariable String userId) {

                return ResponseEntity.ok(
                                orderService.getOrderByOrderCodeAndUser(orderCode, userId));
        }

        @PatchMapping("/status/{id}")
        public ResponseEntity<Void> updateOrderStatus(
                        @PathVariable String id,
                        @RequestParam Integer status) {

                orderService.updateOrderStatus(id, status);
                return ResponseEntity.noContent().build();
        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<?> getOrdersByUser(
                        @PathVariable String userId,
                        @RequestParam(defaultValue = "1") int page,
                        @RequestParam(defaultValue = "12") int limit,
                        @RequestParam(required = false) Integer status) {

                Page<OrderResponse> orderPage = orderService.getOrdersByUser(
                                userId,
                                page,
                                limit,
                                status);

                return ResponseEntity.ok(
                                Map.of(
                                                "orders", orderPage.getContent(),
                                                "totalPages", orderPage.getTotalPages(),
                                                "total", orderPage.getTotalElements()));
        }

        @PostMapping("/user/{userId}")
        public ResponseEntity<OrderResponse> createOrder(
                        @RequestBody OrderRequest request,
                        @PathVariable String userId) {

                return ResponseEntity.ok(
                                orderService.createOrder(request, userId));
        }

        @DeleteMapping("/{orderCode}")
        public ResponseEntity<Void> deleteOrderByCode(
                        @PathVariable String orderCode) {

                orderService.deleteOrderByCode(orderCode);
                return ResponseEntity.noContent().build();
        }

        @PostMapping("/payment/{orderCode}")
        public ResponseEntity<Void> confirmGatewayPayment(
                        @PathVariable String orderCode) {

                orderService.confirmGatewayPayment(orderCode);
                return ResponseEntity.ok().build();
        }

        @GetMapping("/exists/{productId}")
        public ResponseEntity<Boolean> existsProductInOrder(
                        @PathVariable String productId) {

                return ResponseEntity.ok(
                                orderService.existsOrderByProductId(productId));
        }
}
