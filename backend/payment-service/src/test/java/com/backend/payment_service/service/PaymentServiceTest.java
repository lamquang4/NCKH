package com.backend.payment_service.service;

import com.backend.payment_service.dto.request.PaymentRequest;
import com.backend.payment_service.dto.response.PaymentResponse;
import com.backend.payment_service.entity.Payment;
import com.backend.payment_service.exception.AppException;
import com.backend.payment_service.exception.ErrorCode;
import com.backend.payment_service.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;

    private Payment payment;
    private PaymentRequest paymentRequest;

    @BeforeEach
    void setUp() {
        payment = createSamplePayment();
        paymentRequest = PaymentRequest.builder()
                .orderId("order-id")
                .orderCode("ORDER-123")
                .paymethod("VNPAY")
                .amount(BigDecimal.valueOf(50000))
                .transactionId("tx-123")
                .status(1)
                .build();
    }

    // ==========================================
    // 1. Nhóm test cho getAllPayments
    // ==========================================

    @Test
    void getAllPayments_ShouldReturnPagedPayments_WhenNoFiltersProvided() {
        // Given
        Page<Payment> paymentPage = new PageImpl<>(List.of(payment));
        when(paymentRepository.findAll(any(Pageable.class))).thenReturn(paymentPage);

        // When
        Page<PaymentResponse> result = paymentService.getAllPayments(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getOrderCode()).isEqualTo("ORDER-123");
    }
    

    // ==========================================
    // 2. Nhóm test cho createPayment
    // ==========================================

    @Test
    void createPayment_ShouldReturnPaymentResponse_WhenRequestIsValid() {
        // Given
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        // When
        PaymentResponse result = paymentService.createPayment(paymentRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getOrderCode()).isEqualTo("ORDER-123");
        verify(paymentRepository).save(any(Payment.class));
    }

    // ==========================================
    // 3. Nhóm test cho updatePaymentStatus
    // ==========================================

    @Test
    void updatePaymentStatus_ShouldUpdatePaymentStatus_WhenOrderCodeExists() {
        // Given
        when(paymentRepository.findByOrderCode("ORDER-123")).thenReturn(Optional.of(payment));
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        // When
        paymentService.updatePaymentStatus("ORDER-123", 0);

        // Then
        assertThat(payment.getStatus()).isEqualTo(0);
        verify(paymentRepository).save(payment);
    }

    @Test
    void updatePaymentStatus_ShouldThrowAppException_WhenOrderCodeDoesNotExist() {
        // Given
        when(paymentRepository.findByOrderCode("non-exist")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> paymentService.updatePaymentStatus("non-exist", 0))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.PAYMENT_ORDER_NOT_FOUND.getMessage());
    }

    // ==========================================
    // 4. Nhóm test cho getPaymentByOrderCode
    // ==========================================

    @Test
    void getPaymentByOrderCode_ShouldReturnPaymentResponse_WhenOrderCodeExists() {
        // Given
        when(paymentRepository.findByOrderCode("ORDER-123")).thenReturn(Optional.of(payment));

        // When
        PaymentResponse result = paymentService.getPaymentByOrderCode("ORDER-123");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getOrderCode()).isEqualTo("ORDER-123");
    }

    @Test
    void getPaymentByOrderCode_ShouldThrowAppException_WhenOrderCodeDoesNotExist() {
        // Given
        when(paymentRepository.findByOrderCode("non-exist")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> paymentService.getPaymentByOrderCode("non-exist"))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.PAYMENT_NOT_FOUND.getMessage());
    }

    // Helper Method
    private Payment createSamplePayment() {
        return Payment.builder()
                .id("payment-id")
                .orderId("order-id")
                .orderCode("ORDER-123")
                .paymethod("VNPAY")
                .amount(BigDecimal.valueOf(50000))
                .transactionId("tx-123")
                .status(1)
                .createdAt(LocalDateTime.now())
                .build();
    }
}