package com.backend.payment_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.payment_service.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, String> {

}
