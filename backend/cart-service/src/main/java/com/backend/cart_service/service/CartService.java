package com.backend.cart_service.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.backend.cart_service.repository.CartRepository;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public CartService(
            CartRepository cartRepository,
            RedisTemplate<String, Object> redisTemplate) {
        this.cartRepository = cartRepository;
        this.redisTemplate = redisTemplate;
    }

    private String cartKey(String userId) {
        return "cart:" + userId;
    }

    
}
