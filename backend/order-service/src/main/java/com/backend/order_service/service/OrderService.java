package com.backend.order_service.service;

import org.springframework.stereotype.Service;

import com.backend.order_service.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}
