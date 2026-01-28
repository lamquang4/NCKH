package com.backend.brand_service.service;

import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.brand_service.client.ProductServiceClient;
import com.backend.brand_service.dto.request.BrandRequest;
import com.backend.brand_service.dto.response.BrandResponse;
import com.backend.brand_service.dto.response.ProductResponse;
import com.backend.brand_service.entity.Brand;
import com.backend.brand_service.mapper.BrandMapper;
import com.backend.brand_service.repository.BrandRepository;
import com.backend.brand_service.util.SlugUtil;
import jakarta.persistence.EntityNotFoundException;

@Service
public class BrandService {
    private final BrandRepository brandRepository;
    private final ProductServiceClient productServiceClient;

    public BrandService(BrandRepository brandRepository, ProductServiceClient productServiceClient) {
        this.brandRepository = brandRepository;
        this.productServiceClient = productServiceClient;
    }

    // lấy tất cả brand phân trang
    public Page<BrandResponse> getBrands(int page, int limit, String q, Integer status) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());

        Page<Brand> pageBrand;

        if (q != null && !q.isEmpty() && status != null) {
            pageBrand = brandRepository
                    .findByNameContainingIgnoreCaseAndStatus(q, status, pageable);
        } else if (q != null && !q.isEmpty()) {
            pageBrand = brandRepository
                    .findByNameContainingIgnoreCase(q, pageable);
        } else if (status != null) {
            pageBrand = brandRepository
                    .findByStatus(status, pageable);
        } else {
            pageBrand = brandRepository.findAll(pageable);
        }

        return pageBrand.map(BrandMapper::toResponse);
    }

    // lấy tất cả brand không phân trang
    public List<BrandResponse> getAllBrands() {
        return brandRepository
                .findAll(Sort.by("createdAt").descending())
                .stream()
                .map(BrandMapper::toResponse)
                .collect(Collectors.toList());
    }

    // lấy 1 brand theo id
    public BrandResponse getBrandById(String id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Thương hiệu không tồn tại"));

        return BrandMapper.toResponse(brand);
    }

    // tạo brand
    public BrandResponse createBrand(BrandRequest request) {

        if (brandRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Tên thương hiệu đã tồn tại");
        }

        Brand brand = BrandMapper.toEntity(request);
        brand.setSlug(SlugUtil.toSlug(request.getName()));

        brandRepository.save(brand);

        return BrandMapper.toResponse(brand);
    }

    // cập nhật brand
    public BrandResponse updateBrand(String id, BrandRequest request) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Thương hiệu không tồn tại"));

        brandRepository.findByName(request.getName())
                .filter(b -> !b.getId().equals(id))
                .ifPresent(b -> {
                    throw new IllegalArgumentException("Tên thương hiệu đã tồn tại");
                });

        BrandMapper.updateEntity(brand, request);
        brand.setSlug(SlugUtil.toSlug(brand.getName()));

        return BrandMapper.toResponse(brand);
    }

    // cập nhật status
    @Transactional
    public BrandResponse updateBrandStatus(String id, Integer status) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Thương hiệu không tồn tại"));

        brand.setStatus(status);
        brandRepository.save(brand);

        // cập nhật status brand ẩn thì các sản phẩm thuộc brand đó sẽ ẩn theo
        if (status == 0) {
            ResponseEntity<List<ProductResponse>> response = productServiceClient.getAllActiveProductsByBrandId(id);

            List<ProductResponse> products = response.getBody();

            if (products != null && !products.isEmpty()) {
                for (ProductResponse product : products) {
                    productServiceClient.updateProductStatus(
                            product.getId(),
                            0);
                }
            }
        }

        return BrandMapper.toResponse(brand);
    }

    // xóa brand
    public void deleteBrand(String id) {

        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Thương hiệu không tồn tại"));

        Boolean isUsed = productServiceClient.existsByBrandId(id);

        if (Boolean.TRUE.equals(isUsed)) {
            throw new IllegalStateException(
                    "Thương hiệu này không thể xóa vì đang được sử dụng bởi sản phẩm");
        }

        brandRepository.delete(brand);
    }
}
