package com.backend.order_service.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.order_service.dto.request.OrderRequest;
import com.backend.order_service.dto.response.OrderResponse;
import com.backend.order_service.dto.response.ProductResponse;
import com.backend.order_service.entity.Order;
import com.backend.order_service.entity.OrderItem;
import com.backend.order_service.exception.NotFoundException;
import com.backend.order_service.mapper.OrderMapper;
import com.backend.order_service.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.backend.order_service.client.ProductServiceClient;

@Service
public class OrderService {
        private final OrderRepository orderRepository;
        private final ProductServiceClient ProductServiceClient;

        public OrderService(OrderRepository orderRepository, ProductServiceClient ProductServiceClient) {
                this.orderRepository = orderRepository;
                this.ProductServiceClient = ProductServiceClient;
        }

        // lấy tất cả đơn hàng phân trang
        public Page<OrderResponse> getOrders(
                        int page,
                        int limit,
                        String orderCode,
                        Integer status,
                        LocalDate start,
                        LocalDate end) {

                Pageable pageable = PageRequest.of(
                                page - 1,
                                limit,
                                Sort.by("createdAt").descending());

                LocalDateTime startDateTime = null;
                LocalDateTime endDateTime = null;

                if (start != null) {
                        startDateTime = start.atStartOfDay();
                }
                if (end != null) {
                        endDateTime = end.atTime(LocalTime.MAX);
                }

                Page<Order> orderPage;

                if (orderCode != null && !orderCode.isBlank()
                                && status != null
                                && startDateTime != null
                                && endDateTime != null) {

                        orderPage = orderRepository
                                        .findByOrderCodeContainingIgnoreCaseAndStatusAndCreatedAtBetween(
                                                        orderCode,
                                                        status,
                                                        startDateTime,
                                                        endDateTime,
                                                        pageable);

                } else if (orderCode != null && !orderCode.isBlank()
                                && startDateTime != null
                                && endDateTime != null) {

                        orderPage = orderRepository
                                        .findByOrderCodeContainingIgnoreCaseAndCreatedAtBetween(
                                                        orderCode,
                                                        startDateTime,
                                                        endDateTime,
                                                        pageable);

                } else if (status != null
                                && startDateTime != null
                                && endDateTime != null) {

                        orderPage = orderRepository
                                        .findByStatusAndCreatedAtBetween(
                                                        status,
                                                        startDateTime,
                                                        endDateTime,
                                                        pageable);

                } else if (startDateTime != null && endDateTime != null) {

                        orderPage = orderRepository
                                        .findByCreatedAtBetween(
                                                        startDateTime,
                                                        endDateTime,
                                                        pageable);

                } else if (orderCode != null && !orderCode.isBlank()
                                && status != null) {

                        orderPage = orderRepository
                                        .findByOrderCodeContainingIgnoreCaseAndStatus(
                                                        orderCode,
                                                        status,
                                                        pageable);

                } else if (orderCode != null && !orderCode.isBlank()) {

                        orderPage = orderRepository
                                        .findByOrderCodeContainingIgnoreCase(
                                                        orderCode,
                                                        pageable);

                } else if (status != null) {

                        orderPage = orderRepository
                                        .findByStatus(
                                                        status,
                                                        pageable);

                } else {
                        orderPage = orderRepository.findAll(pageable);
                }

                return orderPage.map(this::mapWithClient);
        }

        // lấy các đơn hàng của người dùng
        public Page<OrderResponse> getOrdersByUser(
                        String userId,
                        int page,
                        int limit,
                        Integer status) {

                Pageable pageable = PageRequest.of(
                                page - 1,
                                limit,
                                Sort.by("createdAt").descending());

                Page<Order> orderPage;

                if (status != null && status >= 0) {
                        orderPage = orderRepository
                                        .findByUserIdAndStatus(
                                                        userId,
                                                        status,
                                                        pageable);
                } else {
                        orderPage = orderRepository
                                        .findByUserIdAndStatusGreaterThanEqual(
                                                        userId,
                                                        0,
                                                        pageable);
                }

                return orderPage.map(this::mapWithClient);
        }

        // lấy 1 đơn hàng theo id
        public OrderResponse getOrderById(String id) {

                Order order = orderRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Đơn hàng không tìm thấy"));

                return mapWithClient(order);
        }

        // lấy 1 đơn hàng theo orderCode
        public OrderResponse getOrderByOrderCode(String orderCode) {

                Order order = orderRepository.findByOrderCode(orderCode)
                                .orElseThrow(() -> new NotFoundException("Đơn hàng không tìm thấy"));

                return mapWithClient(order);
        }

        // tạo đơn hàng
        @Transactional
        public OrderResponse createOrder(
                        OrderRequest request,
                        String userId) {

                String orderCode = generateOrderCode();

                Order order = OrderMapper.toEntity(
                                request,
                                userId,
                                orderCode);

                Order savedOrder = orderRepository.save(order);

                return OrderMapper.toResponse(savedOrder);
        }

        // cập nhật status đơn hàng
        @Transactional
        public void updateOrderStatus(
                        String orderId,
                        Integer status) {

                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new NotFoundException("Đơn hàng không tìm thấy"));

                order.setStatus(status);

                orderRepository.save(order);
        }

        private String generateOrderCode() {
                String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                Random random = new Random();
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < 6; i++) {
                        sb.append(chars.charAt(random.nextInt(chars.length())));
                }
                return sb.toString();
        }

        private OrderResponse mapWithClient(Order order) {

                List<String> productIds = order.getItems()
                                .stream()
                                .map(OrderItem::getProductId)
                                .distinct()
                                .toList();

                List<ProductResponse> products = ProductServiceClient.getProductsByIds(productIds);

                Map<String, ProductResponse> productMap = products.stream()
                                .collect(Collectors.toMap(
                                                ProductResponse::getId,
                                                p -> p));

                return OrderMapper.toResponse(order, productMap);
        }

}
