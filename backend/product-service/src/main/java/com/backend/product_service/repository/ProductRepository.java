package com.backend.product_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.product_service.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
        Page<Product> findByNameContainingIgnoreCaseAndStatus(
                        String name,
                        Integer status,
                        Pageable pageable);

        Page<Product> findByNameContainingIgnoreCase(
                        String name,
                        Pageable pageable);

        Page<Product> findByStatus(
                        Integer status,
                        Pageable pageable);

        Page<Product> findByStatusAndNameContainingIgnoreCase(
                        Integer status,
                        String name,
                        Pageable pageable);

        List<Product> findByStatus(
                        Integer status,
                        Sort sort);

        boolean existsByName(String name);

        Optional<Product> findByIdAndStatus(String id, int i);

        Optional<Product> findByName(String name);

        Page<Product> findByStatusAndCategoryId(
                        int status,
                        String categoryId,
                        Pageable pageable);

        Page<Product> findByStatusAndCategoryIdAndNameContainingIgnoreCase(
                        int status,
                        String categoryId,
                        String name,
                        Pageable pageable);

}
