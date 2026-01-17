package com.backend.category_service.controller;

import com.backend.category_service.service.CategoryService;

public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
}
