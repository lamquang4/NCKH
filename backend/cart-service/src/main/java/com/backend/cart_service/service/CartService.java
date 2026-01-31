package com.backend.cart_service.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.backend.cart_service.client.ProductServiceClient;
import com.backend.cart_service.dto.request.CartItemRequest;
import com.backend.cart_service.dto.response.CartItemResponse;
import com.backend.cart_service.dto.response.CartResponse;
import com.backend.cart_service.dto.response.ProductResponse;
import com.backend.cart_service.exception.BadRequestException;
import com.backend.cart_service.exception.NotFoundException;
import com.backend.cart_service.mapper.CartMapper;
import com.backend.cart_service.model.Cart;
import com.backend.cart_service.model.CartItem;
import com.backend.cart_service.repository.CartRepository;

@Service
public class CartService {
    private static final String CART_KEY_PREFIX = "cart:";
    private final CartRepository cartRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ProductServiceClient productServiceClient;

    public CartService(
            CartRepository cartRepository,
            RedisTemplate<String, Object> redisTemplate,
            ProductServiceClient productServiceClient) {
        this.cartRepository = cartRepository;
        this.redisTemplate = redisTemplate;
        this.productServiceClient = productServiceClient;
    }

    // lấy giỏ hàng của user
    public CartResponse getCartByUserId(String userId) {
        Cart cart = getCartFromRedis(userId);

        if (cart == null) {
            cart = cartRepository.findByUserId(userId)
                    .orElseGet(() -> {
                        Cart newCart = Cart.builder()
                                .userId(userId)
                                .items(new ArrayList<>())
                                .build();
                        return cartRepository.save(newCart);
                    });

            saveCartToRedis(userId, cart);
        }

        List<CartItemResponse> items = cart.getItems().stream()
                .map(this::mapWithClient)
                .toList();

        return CartMapper.toResponse(cart, items);
    }

    // thêm sản phẩm vào giỏ hàng
    public CartResponse addToCart(String userId, CartItemRequest request) {

        if (request.getQuantity() < 1) {
            throw new BadRequestException("Số lượng phải lớn hơn hoặc bằng 1");
        }

        Cart cart = getCartFromRedis(userId);

        if (cart == null) {
            cart = cartRepository.findByUserId(userId)
                    .orElseGet(() -> Cart.builder()
                            .userId(userId)
                            .items(new ArrayList<>())
                            .build());
        }

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(request.getProductId()))
                .findFirst()
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            cart.getItems().add(CartMapper.toItemEntity(request));
        }

        cart = cartRepository.save(cart);

        saveCartToRedis(userId, cart);

        return getCartByUserId(userId);
    }

    // xóa sản phẩm khỏi giỏ hàng
    public CartResponse removeItem(String userId, String productId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Giỏ hàng không tìm thấy"));

        boolean removed = cart.getItems()
                .removeIf(item -> item.getProductId().equals(productId));

        if (!removed) {
            throw new NotFoundException("Sản phẩm không có trong giỏ hàng");
        }

        cart = cartRepository.save(cart);
        saveCartToRedis(userId, cart);

        return getCartByUserId(userId);
    }

    // cập nhật số lượng sản phẩm trong giỏ hàng
    public CartResponse updateQuantity(
            String userId,
            String productId,
            int quantity) {

        if (quantity < 1) {
            throw new BadRequestException("Số lượng phải lớn hơn hoặc bằng 1");
        }

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("Giỏ hàng không tìm thấy"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Sản phẩm không có trong giỏ"));

        item.setQuantity(quantity);

        cart = cartRepository.save(cart);
        saveCartToRedis(userId, cart);

        return getCartByUserId(userId);
    }

    // xóa sản phẩm có id đó khỏi tất cả giỏ hàng
    @Transactional
    public void removeProductFromAllCarts(String productId) {

        List<Cart> carts = cartRepository.findByItemsProductId(productId);

        if (carts.isEmpty()) {
            return;
        }

        for (Cart cart : carts) {

            boolean removed = cart.getItems()
                    .removeIf(item -> item.getProductId().equals(productId));

            if (removed) {
                cartRepository.save(cart);

                redisTemplate.delete(CART_KEY_PREFIX + cart.getUserId());
            }
        }
    }

    @Transactional
    public void clearCartByUserId(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);

        if (cart == null) {
            return;
        }

        cart.getItems().clear();
        cartRepository.save(cart);

        redisTemplate.delete(CART_KEY_PREFIX + userId);
    }

    private CartItemResponse mapWithClient(CartItem cartItem) {

        ProductResponse product = productServiceClient
                .getProductById(cartItem.getProductId())
                .getBody();

        if (product == null) {
            throw new NotFoundException("Sản phẩm không tìm thấy");
        }

        return CartMapper.toItemResponse(cartItem, product);
    }

    private Cart getCartFromRedis(String userId) {
        return (Cart) redisTemplate.opsForValue()
                .get(CART_KEY_PREFIX + userId);
    }

    private void saveCartToRedis(String userId, Cart cart) {
        redisTemplate.opsForValue()
                .set(CART_KEY_PREFIX + userId, cart);
    }

}
