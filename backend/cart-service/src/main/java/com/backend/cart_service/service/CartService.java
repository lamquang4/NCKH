package com.backend.cart_service.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.cart_service.client.ProductServiceClient;
import com.backend.cart_service.dto.request.CartItemRequest;
import com.backend.cart_service.dto.response.CartItemResponse;
import com.backend.cart_service.dto.response.CartResponse;
import com.backend.cart_service.dto.response.ProductListItemResponse;
import com.backend.cart_service.exception.AppException;
import com.backend.cart_service.exception.ErrorCode;
import com.backend.cart_service.mapper.CartMapper;
import com.backend.cart_service.model.Cart;
import com.backend.cart_service.model.CartItem;
import com.backend.cart_service.repository.CartRepository;

@Service
public class CartService {
    private static final String CART_KEY_PREFIX = "cart:";
    private static final String CART_RESPONSE_KEY_PREFIX = "cart:response:";
    private static final Duration CART_TTL = Duration.ofMinutes(30);

    private final CartRepository cartRepository;
    private final ProductServiceClient productServiceClient;

    @Autowired(required = false)
    private RedisTemplate<String, Object> redisTemplate;

    public CartService(
            CartRepository cartRepository,
            ProductServiceClient productServiceClient) {
        this.cartRepository = cartRepository;
        this.productServiceClient = productServiceClient;
    }

    // lấy giỏ hàng của user
    public CartResponse getCartByUserId(String userId) {
        String responseKey = CART_RESPONSE_KEY_PREFIX + userId;
        CartResponse cached = getFromRedis(responseKey, CartResponse.class);
        if (cached != null) {
            return cached;
        }

        Cart cart = getOrCreateCart(userId);

        if (cart.getItems().isEmpty()) {
            CartResponse empty = CartMapper.toResponse(cart, List.of());
            saveToRedis(responseKey, empty, CART_TTL);
            return empty;
        }

        List<String> productIds = cart.getItems().stream()
                .map(CartItem::getProductId)
                .toList();

        List<ProductListItemResponse> products = productServiceClient.getProductsByIdsInternal(productIds);

        Map<String, ProductListItemResponse> productMap = products.stream()
                .collect(Collectors.toMap(ProductListItemResponse::getId, p -> p));

        List<CartItemResponse> items = cart.getItems().stream()
                .map(item -> {
                    ProductListItemResponse product = productMap.get(item.getProductId());
                    if (product == null)
                        throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
                    return CartMapper.toItemResponse(item, product);
                })
                .toList();

        CartResponse response = CartMapper.toResponse(cart, items);
        saveToRedis(responseKey, response, CART_TTL); // ✅ cache lại
        return response;
    }

    // thêm sản phẩm vào giỏ hàng
    public void addToCart(String userId, CartItemRequest request) {
        if (request.getQuantity() < 1)
            throw new AppException(ErrorCode.INVALID_QUANTITY);

        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst().orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            cart.getItems().add(CartMapper.toItemEntity(request));
        }

        cart = cartRepository.save(cart);
        saveToRedis(CART_KEY_PREFIX + userId, cart, CART_TTL);
        invalidateCartResponse(userId);
    }

    // xóa sản phẩm khỏi giỏ hàng
    public void removeItem(String userId, String productId) {
        Cart cart = getOrCreateCart(userId);

        boolean removed = cart.getItems()
                .removeIf(item -> item.getProductId().equals(productId));
        if (!removed)
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);

        cart = cartRepository.save(cart);
        saveToRedis(CART_KEY_PREFIX + userId, cart, CART_TTL);
        invalidateCartResponse(userId);
    }

    // cập nhật số lượng sản phẩm trong giỏ hàng
    public void updateQuantity(String userId, CartItemRequest request) {
        if (request.getQuantity() < 1)
            throw new AppException(ErrorCode.INVALID_QUANTITY);

        Cart cart = getOrCreateCart(userId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        item.setQuantity(request.getQuantity());

        cart = cartRepository.save(cart);
        saveToRedis(CART_KEY_PREFIX + userId, cart, CART_TTL);
        invalidateCartResponse(userId);
    }

    // xóa sản phẩm có id đó khỏi tất cả giỏ hàng
    @Transactional
    public void removeProductFromAllCarts(String productId) {
        List<Cart> carts = cartRepository.findByItemsProductId(productId);
        if (carts.isEmpty())
            return;

        for (Cart cart : carts) {
            boolean removed = cart.getItems()
                    .removeIf(item -> item.getProductId().equals(productId));
            if (removed) {
                cartRepository.save(cart);
                invalidateAllCartKeys(cart.getUserId());
            }
        }
    }

    @Transactional
    public void clearCartByUserId(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart == null)
            return;

        cart.getItems().clear();
        cartRepository.save(cart);
        invalidateAllCartKeys(userId);
    }

    // redis helper
    @SuppressWarnings("unchecked")
    private <T> T getFromRedis(String key, Class<T> type) {
        if (redisTemplate == null)
            return null;
        try {
            Object value = redisTemplate.opsForValue().get(key);
            return type.isInstance(value) ? (T) value : null;
        } catch (Exception e) {
            return null;
        }
    }

    private void saveToRedis(String key, Object value, Duration ttl) {
        if (redisTemplate == null)
            return;
        try {
            redisTemplate.opsForValue().set(key, value, ttl);
        } catch (Exception e) {
            throw new AppException(ErrorCode.REDIS_OPERATION_FAILED);
        }
    }

    private void invalidateCartResponse(String userId) {
        if (redisTemplate == null)
            return;
        redisTemplate.delete(CART_RESPONSE_KEY_PREFIX + userId);
    }

    private void invalidateAllCartKeys(String userId) {
        if (redisTemplate == null)
            return;
        redisTemplate.delete(List.of(
                CART_KEY_PREFIX + userId,
                CART_RESPONSE_KEY_PREFIX + userId));
    }

    // helper
    private Cart getOrCreateCart(String userId) {
        Cart cart = getFromRedis(CART_KEY_PREFIX + userId, Cart.class);
        if (cart != null)
            return cart;

        cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder()
                                .userId(userId)
                                .items(new ArrayList<>())
                                .build()));

        saveToRedis(CART_KEY_PREFIX + userId, cart, CART_TTL);
        return cart;
    }

}
