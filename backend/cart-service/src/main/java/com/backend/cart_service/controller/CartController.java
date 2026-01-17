package com.backend.cart_service.controller;

import com.backend.cart_service.service.CartService;

public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
}
