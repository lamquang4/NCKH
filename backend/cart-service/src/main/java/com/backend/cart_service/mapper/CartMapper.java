package com.backend.cart_service.mapper;

import java.util.List;

import com.backend.cart_service.dto.response.CartItemResponse;
import com.backend.cart_service.dto.response.CartResponse;
import com.backend.cart_service.model.Cart;

public final class CartMapper {

    private CartMapper() {
    }

    public static CartResponse toResponse(
            Cart cart,
            List<CartItemResponse> items) {

        if (cart == null)
            return null;

        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(items)
                .build();
    }
}
