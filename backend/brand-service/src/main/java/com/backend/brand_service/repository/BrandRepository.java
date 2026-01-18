package com.backend.brand_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.brand_service.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, String> {
    
}
