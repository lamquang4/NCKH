package com.backend.category_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.category_service.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, String> {

}
