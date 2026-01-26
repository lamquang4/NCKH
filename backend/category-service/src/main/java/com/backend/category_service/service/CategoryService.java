package com.backend.category_service.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.backend.category_service.dto.request.CategoryRequest;
import com.backend.category_service.dto.response.CategoryResponse;
import com.backend.category_service.entity.Category;
import com.backend.category_service.mapper.CategoryMapper;
import com.backend.category_service.repository.CategoryRepository;
import com.backend.category_service.utils.SlugUtil;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final Cloudinary cloudinary;

    public CategoryService(CategoryRepository categoryRepository, Cloudinary cloudinary) {
        this.categoryRepository = categoryRepository;
        this.cloudinary = cloudinary;
    }

    // lấy tất cả category phân trang
    public Page<CategoryResponse> getCategories(int page, int limit, String q, Integer status) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());

        Page<Category> pageCategory;

        if (q != null && !q.isEmpty() && status != null) {
            pageCategory = categoryRepository
                    .findByNameContainingIgnoreCaseAndStatus(q, status, pageable);
        } else if (q != null && !q.isEmpty()) {
            pageCategory = categoryRepository
                    .findByNameContainingIgnoreCase(q, pageable);
        } else if (status != null) {
            pageCategory = categoryRepository
                    .findByStatus(status, pageable);
        } else {
            pageCategory = categoryRepository.findAll(pageable);
        }

        return pageCategory.map(CategoryMapper::toResponse);
    }

    // lấy tất cả category không phân trang
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository
                .findAll(Sort.by("createdAt").descending())
                .stream()
                .map(CategoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    // lấy 1 category theo id
    public CategoryResponse getCategoryById(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));

        return CategoryMapper.toResponse(category);
    }

    // lấy 1 category theo slug
    public CategoryResponse getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));

        return CategoryMapper.toResponse(category);
    }

    // thêm category
    @Transactional
    public CategoryResponse createCategory(
            CategoryRequest request,
            MultipartFile image) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Tên danh mục đã tồn tại");
        }

        Category category = CategoryMapper.toEntity(request);
        category.setSlug(SlugUtil.toSlug(request.getName()));

        Category savedCategory = categoryRepository.save(category);

        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadImage(image, savedCategory.getId());
            savedCategory.setImage(imageUrl);
        }

        return CategoryMapper.toResponse(savedCategory);
    }

    // cập nhật category
    @Transactional
    public CategoryResponse updateCategory(
            String id,
            CategoryRequest request,
            MultipartFile image) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));

        categoryRepository.findByName(request.getName())
                .filter(c -> !c.getId().equals(id))
                .ifPresent(c -> {
                    throw new IllegalArgumentException("Tên danh mục đã tồn tại");
                });

        CategoryMapper.updateEntity(category, request);
        category.setSlug(SlugUtil.toSlug(category.getName()));

        if (image != null && !image.isEmpty()) {
            String imageUrl = uploadImage(image, category.getId());
            category.setImage(imageUrl);
        }

        return CategoryMapper.toResponse(category);
    }

    // cập nhật status category
    public CategoryResponse updateCategoryStatus(String id, Integer status) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));

        category.setStatus(status);
        return CategoryMapper.toResponse(category);
    }

    // xóa category
    @Transactional
    public void deleteCategory(String id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Danh mục không tồn tại"));

        deleteFolder(category.getId());

        categoryRepository.delete(category);
    }

    private void deleteFolder(String categoryId) {
        try {
            String folderPath = "nckh/categories/" + categoryId;

            cloudinary.api().deleteResourcesByPrefix(
                    folderPath,
                    ObjectUtils.emptyMap());

            cloudinary.api().deleteFolder(
                    folderPath,
                    ObjectUtils.emptyMap());

        } catch (Exception e) {
            throw new IllegalStateException("Xóa hình thất bại", e);
        }
    }

    private String uploadImage(MultipartFile file, String categoryId) {

        // validate size (2MB)
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("Dung lượng hình tối đa 2MB");
        }

        // validate type
        String contentType = file.getContentType();
        List<String> allowedTypes = List.of(
                "image/jpeg",
                "image/png",
                "image/webp");

        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new IllegalArgumentException("Chỉ cho phép JPG, PNG, WEBP");
        }

        try {
            String publicId = "nckh/categories/" + categoryId;

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId,
                            "overwrite", true,
                            "resource_type", "image"));

            return uploadResult.get("secure_url").toString();

        } catch (IOException e) {
            throw new IllegalStateException("Upload hình thất bại", e);
        }
    }

}
