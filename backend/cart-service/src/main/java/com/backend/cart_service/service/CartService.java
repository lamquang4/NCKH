package com.backend.cart_service.service;

import com.backend.cart_service.repository.CartRepository;

public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }
}
