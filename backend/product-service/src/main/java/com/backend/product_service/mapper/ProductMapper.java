package com.backend.product_service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.backend.product_service.dto.request.ImageProductRequest;
import com.backend.product_service.dto.request.ProductRequest;
import com.backend.product_service.dto.request.SpecificationRequest;
import com.backend.product_service.dto.response.ImageProductResponse;
import com.backend.product_service.dto.response.ProductResponse;
import com.backend.product_service.dto.response.SpecificationResponse;
import com.backend.product_service.entity.ImageProduct;
import com.backend.product_service.entity.Product;
import com.backend.product_service.entity.Specification;

public class ProductMapper {

    private ProductMapper() {
    }

    public static Product toEntity(ProductRequest request) {
        if (request == null) {
            return null;
        }

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .discount(request.getDiscount())
                .description(request.getDescription())
                .status(request.getStatus())
                .stock(request.getStock())
                .categoryId(request.getCategoryId())
                .brandId(request.getBrandId())
                .build();

        if (request.getImages() != null) {
            product.setImages(
                    request.getImages().stream()
                            .map(ProductMapper::toImageEntity)
                            .collect(Collectors.toList()));
        }

        if (request.getSpecifications() != null) {
            product.setSpecifications(
                    request.getSpecifications().stream()
                            .map(ProductMapper::toSpecificationEntity)
                            .collect(Collectors.toList()));
        }

        return product;
    }

    private static ImageProduct toImageEntity(ImageProductRequest request) {
        return ImageProduct.builder()
                .image(request.getImage())
                .build();
    }

    private static Specification toSpecificationEntity(SpecificationRequest request) {
        return Specification.builder()
                .specKey(request.getSpecKey())
                .specValue(request.getSpecValue())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public static void updateEntity(Product product, ProductRequest request) {

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDiscount(request.getDiscount());
        product.setDescription(request.getDescription());
        product.setStatus(request.getStatus());
        product.setStock(request.getStock());
        product.setCategoryId(request.getCategoryId());
        product.setBrandId(request.getBrandId());

        if (request.getImages() != null) {
            product.getImages().clear();
            product.getImages().addAll(
                    request.getImages().stream()
                            .map(ProductMapper::toImageEntity)
                            .collect(Collectors.toList()));
        }

        if (request.getSpecifications() != null) {
            product.getSpecifications().clear();
            product.getSpecifications().addAll(
                    request.getSpecifications().stream()
                            .map(ProductMapper::toSpecificationEntity)
                            .collect(Collectors.toList()));
        }
    }

    public static ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .description(product.getDescription())
                .status(product.getStatus())
                .stock(product.getStock())
                .images(
                        product.getImages() == null
                                ? List.of()
                                : product.getImages().stream()
                                        .map(ProductMapper::toImageResponse)
                                        .collect(Collectors.toList()))
                .specifications(
                        product.getSpecifications() == null
                                ? List.of()
                                : product.getSpecifications().stream()
                                        .map(ProductMapper::toSpecificationResponse)
                                        .collect(Collectors.toList()))
                .createdAt(product.getCreatedAt())
                .build();
    }

    private static ImageProductResponse toImageResponse(ImageProduct image) {
        return ImageProductResponse.builder()
                .id(image.getId())
                .image(image.getImage())
                .build();
    }

    private static SpecificationResponse toSpecificationResponse(Specification spec) {
        return SpecificationResponse.builder()
                .id(spec.getId())
                .specKey(spec.getSpecKey())
                .specValue(spec.getSpecValue())
                .displayOrder(spec.getDisplayOrder())
                .build();
    }
}
