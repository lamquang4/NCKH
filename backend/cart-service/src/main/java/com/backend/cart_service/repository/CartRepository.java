package com.backend.cart_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.backend.cart_service.model.Cart;

public interface CartRepository extends MongoRepository<Cart, String> {

}
