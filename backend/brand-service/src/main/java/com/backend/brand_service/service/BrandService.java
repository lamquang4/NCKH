package com.backend.brand_service.service;

import com.backend.brand_service.repository.BrandRepository;

public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }
}
