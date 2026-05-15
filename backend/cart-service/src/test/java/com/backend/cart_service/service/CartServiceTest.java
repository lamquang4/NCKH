package com.backend.cart_service.service;

import com.backend.cart_service.client.ProductServiceClient;
import com.backend.cart_service.dto.request.CartItemRequest;
import com.backend.cart_service.exception.AppException;
import com.backend.cart_service.exception.ErrorCode;
import com.backend.cart_service.model.Cart;
import com.backend.cart_service.model.CartItem;
import com.backend.cart_service.repository.CartRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private ProductServiceClient productServiceClient;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @Mock
    private ValueOperations<String, Object> valueOperations;

    @InjectMocks
    private CartService cartService;

    private Cart cart;
    private CartItem cartItem;
    private CartItemRequest cartItemRequest;

    @BeforeEach
    void setUp() {
        cart = createSampleCart();
        cartItem = createSampleCartItem();

        cartItemRequest = CartItemRequest.builder()
                .productId("prod-id")
                .quantity(1)
                .build();

        // Lenient để tránh UnnecessaryStubbingException ở các testcase không sử dụng hết
        lenient().when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }



    @Test
    void addToCart_ShouldThrowException_WhenQuantityLessThanOne() {
        // Given
        String userId = "user-id";
        CartItemRequest request = CartItemRequest.builder()
                .productId("prod-id")
                .quantity(0)
                .build();

        // When & Then
        assertThatThrownBy(() -> cartService.addToCart(userId, request))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.INVALID_QUANTITY.getMessage());
    }


    // Helper Method
    private Cart createSampleCart() {
        return Cart.builder()
                .id("cart-id")
                .userId("user-id")
                .items(new ArrayList<>())
                .build();
    }

    private CartItem createSampleCartItem() {
        return CartItem.builder()
                .productId("prod-id")
                .quantity(1)
                .build();
    }
}