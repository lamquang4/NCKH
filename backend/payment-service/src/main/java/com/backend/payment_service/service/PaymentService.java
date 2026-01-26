package com.backend.payment_service.service;

import org.springframework.stereotype.Service;

import com.backend.payment_service.repository.PaymentRepository;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
}
