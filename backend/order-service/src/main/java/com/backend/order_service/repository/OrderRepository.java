package com.backend.order_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.order_service.entity.Order;

public interface OrderRepository extends JpaRepository<Order, String> {
    
}
