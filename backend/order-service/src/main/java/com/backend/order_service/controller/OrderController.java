package com.backend.order_service.controller;

import com.backend.order_service.service.OrderService;

public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
}
