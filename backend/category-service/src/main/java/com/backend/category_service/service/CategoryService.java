package com.backend.category_service.service;

import com.backend.category_service.repository.CategoryRepository;

public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
}
