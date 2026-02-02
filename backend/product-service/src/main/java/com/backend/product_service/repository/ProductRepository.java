package com.backend.product_service.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

        List<Product> findByStatusAndTotalSoldGreaterThan(
                        Integer status,
                        Integer totalSold,
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

        boolean existsByBrandId(String brandId);

        boolean existsByCategoryId(String categoryId);

        List<Product> findByStatusAndCategoryId(
                        Integer status,
                        String categoryId,
                        Sort sort);

        List<Product> findByStatusAndBrandId(
                        Integer status,
                        String brandId,
                        Sort sort);

        List<Product> findByIdInAndStatus(List<String> ids, Integer status);

        Page<Product> findByStatusAndDiscountGreaterThan(
                        Integer status,
                        BigDecimal discount,
                        Pageable pageable);

        Page<Product> findByStatusAndDiscountGreaterThanAndNameContainingIgnoreCase(
                        Integer status,
                        BigDecimal discount,
                        String name,
                        Pageable pageable);

        Page<Product> findByStatusAndTotalSoldGreaterThan(
                        int status,
                        int totalSold,
                        Pageable pageable);

        List<Product> findTop10ByStatusOrderByCreatedAtDesc(int status);

        Optional<Product> findBySlugAndStatus(String slug, int status);

        @Query("""
                            SELECT p FROM Product p
                            WHERE p.status = 1
                              AND LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%'))
                        """)
        List<Product> searchActiveProducts(
                        @Param("q") String q,
                        Pageable pageable);
}
