package com.backend.product_service.service;

import org.springframework.stereotype.Service;

import com.backend.product_service.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
}
