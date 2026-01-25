package com.backend.cart_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.backend.cart_service.model.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

    Object findByUserId(String userId);

}
