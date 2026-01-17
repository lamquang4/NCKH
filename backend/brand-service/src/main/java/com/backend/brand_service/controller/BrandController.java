package com.backend.brand_service.controller;

import com.backend.brand_service.service.BrandService;

public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }
}
