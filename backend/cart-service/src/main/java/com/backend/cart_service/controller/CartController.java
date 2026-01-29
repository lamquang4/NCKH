package com.backend.cart_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.cart_service.dto.request.CartItemRequest;
import com.backend.cart_service.dto.response.CartResponse;
import com.backend.cart_service.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                cartService.getCartByUserId(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<CartResponse> addToCart(
            @PathVariable String userId,
            @RequestBody @Valid CartItemRequest request) {

        return ResponseEntity.ok(
                cartService.addToCart(userId, request));
    }

    @PutMapping("/{userId}/item/{productId}")
    public ResponseEntity<CartResponse> updateQuantity(
            @PathVariable String userId,
            @PathVariable String productId,
            @RequestParam int quantity) {

        return ResponseEntity.ok(
                cartService.updateQuantity(userId, productId, quantity));
    }

    @DeleteMapping("/{userId}/item/{productId}")
    public ResponseEntity<CartResponse> removeItem(
            @PathVariable String userId,
            @PathVariable String productId) {

        return ResponseEntity.ok(
                cartService.removeItem(userId, productId));
    }

    @DeleteMapping("/all/{productId}")
    public ResponseEntity<Void> removeProductFromAllCarts(@PathVariable String productId) {
        cartService.removeProductFromAllCarts(productId);
        return ResponseEntity.noContent().build();
    }
}
