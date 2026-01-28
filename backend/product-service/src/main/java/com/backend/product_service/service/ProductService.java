package com.backend.product_service.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import com.backend.product_service.client.BrandServiceClient;
import com.backend.product_service.client.CategoryServiceClient;
import com.backend.product_service.dto.request.ProductRequest;
import com.backend.product_service.dto.request.SpecificationRequest;
import com.backend.product_service.dto.response.BrandResponse;
import com.backend.product_service.dto.response.CategoryResponse;
import com.backend.product_service.dto.response.ProductResponse;
import com.backend.product_service.entity.ImageProduct;
import com.backend.product_service.entity.Product;
import com.backend.product_service.entity.Specification;
import com.backend.product_service.mapper.ProductMapper;
import com.backend.product_service.repository.ImageProductRepository;
import com.backend.product_service.repository.ProductRepository;
import com.backend.product_service.repository.SpecificationRepository;
import com.backend.product_service.utils.SlugUtil;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageProductRepository imageProductRepository;
    private final SpecificationRepository specificationRepository;
    private final CategoryServiceClient categoryServiceClient;
    private final BrandServiceClient brandServiceClient;
    private final Cloudinary cloudinary;

    public ProductService(ProductRepository productRepository, ImageProductRepository imageProductRepository,
            SpecificationRepository specificationRepository,
            CategoryServiceClient categoryServiceClient,
            BrandServiceClient brandServiceClient,
            Cloudinary cloudinary) {
        this.productRepository = productRepository;
        this.imageProductRepository = imageProductRepository;
        this.specificationRepository = specificationRepository;
        this.categoryServiceClient = categoryServiceClient;
        this.brandServiceClient = brandServiceClient;
        this.cloudinary = cloudinary;
    }

    // lấy các sản phẩm có phân trang
    public Page<ProductResponse> getProducts(
            int page,
            int limit,
            String q,
            Integer status) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());

        Page<Product> productPage;

        if (q != null && !q.isBlank() && status != null) {
            productPage = productRepository.findByNameContainingIgnoreCaseAndStatus(
                    q, status, pageable);
        } else if (q != null && !q.isBlank()) {
            productPage = productRepository.findByNameContainingIgnoreCase(q, pageable);
        } else if (status != null) {
            productPage = productRepository.findByStatus(status, pageable);
        } else {
            productPage = productRepository.findAll(pageable);
        }

        return productPage.map(this::mapWithClient);
    }

    // lấy các sản phẩm có status = 1 phân trang
    public Page<ProductResponse> getActiveProducts(
            int page,
            int limit,
            String q,
            String sort) {

        Sort sortOption = buildSort(sort);

        Pageable pageable = PageRequest.of(
                page - 1,
                limit,
                sortOption);

        Page<Product> productPage;

        if (q != null && !q.isBlank()) {
            productPage = productRepository.findByStatusAndNameContainingIgnoreCase(
                    1, q, pageable);
        } else {
            productPage = productRepository.findByStatus(1, pageable);
        }

        return productPage.map(this::mapWithClient);
    }

    // lấy các sản phẩm dựa vào category slug và có status = 1 phân trang
    public Page<ProductResponse> getActiveProductsByCategory(
            int page,
            int limit,
            String q,
            String sort,
            String slug) {

        Sort sortOption = buildSort(sort);

        Pageable pageable = PageRequest.of(
                page - 1,
                limit,
                sortOption);

        CategoryResponse category = categoryServiceClient.getCategoryBySlug(slug);

        Page<Product> productPage;

        if (q != null && !q.isBlank()) {
            productPage = productRepository
                    .findByStatusAndCategoryIdAndNameContainingIgnoreCase(
                            1,
                            category.getId(),
                            q,
                            pageable);
        } else {
            productPage = productRepository
                    .findByStatusAndCategoryId(
                            1,
                            category.getId(),
                            pageable);
        }

        return productPage.map(this::mapWithClient);
    }

    // lấy tất cả sản phẩm có status = 1
    public List<ProductResponse> getAllActiveProducts() {
        return productRepository
                .findByStatus(1, Sort.by("createdAt").descending())
                .stream()
                .map(this::mapWithClient)
                .collect(Collectors.toList());
    }

    // lấy tất cả sản phẩm có status = 1 theo category id
    public List<ProductResponse> getAllActiveProductsByCategoryId(String categoryId) {
        return productRepository
                .findByStatusAndCategoryId(
                        1,
                        categoryId,
                        Sort.by("createdAt").descending())
                .stream()
                .map(this::mapWithClient)
                .collect(Collectors.toList());
    }

    // lấy tất cả sản phẩm có status = 1 theo brand id
    public List<ProductResponse> getAllActiveProductsByBrandId(String brandId) {
        return productRepository
                .findByStatusAndBrandId(
                        1,
                        brandId,
                        Sort.by("createdAt").descending())
                .stream()
                .map(this::mapWithClient)
                .collect(Collectors.toList());
    }

    // lấy sản phẩm theo id
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));

        return mapWithClient(product);
    }

    // lấy sản phẩm có status = 1 theo id
    public ProductResponse getActiveProductById(String id) {

        Product product = productRepository.findByIdAndStatus(id, 1)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa"));

        return mapWithClient(product);
    }

    // cập nhật status sản phẩm
    public ProductResponse updateProductStatus(String id, Integer status) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));

        product.setStatus(status);

        return ProductMapper.toResponse(product);
    }

    // thêm sản phẩm
    @Transactional
    public ProductResponse createProduct(
            ProductRequest request,
            List<MultipartFile> files) {

        if (productRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Tên sản phẩm đã tồn tại");
        }

        Product product = ProductMapper.toEntity(request);
        product.setSlug(SlugUtil.toSlug(request.getName()));

        if (product.getSpecifications() != null) {
            product.getSpecifications().forEach(spec -> spec.setProduct(product));
        }

        Product savedProduct = productRepository.save(product);

        if (files != null && !files.isEmpty()) {
            List<ImageProduct> images = files.stream()
                    .map(file -> uploadImageOnCloudinary(file, savedProduct))
                    .collect(Collectors.toList());
            savedProduct.setImages(images);
        }

        return ProductMapper.toResponse(savedProduct);
    }

    // cập nhật sản phẩm
    @Transactional
    public ProductResponse updateProduct(
            String id,
            ProductRequest request,
            List<MultipartFile> files) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));

        productRepository.findByName(request.getName())
                .filter(p -> !p.getId().equals(id))
                .ifPresent(p -> {
                    throw new IllegalArgumentException("Tên sản phẩm đã tồn tại");
                });

        ProductMapper.updateEntity(product, request);
        product.setSlug(SlugUtil.toSlug(product.getName()));

        syncSpecifications(product, request.getSpecifications());

        if (files != null && !files.isEmpty()) {

            List<ImageProduct> newImages = files.stream()
                    .map(file -> uploadImageOnCloudinary(file, product))
                    .collect(Collectors.toList());

            if (product.getImages() == null) {
                product.setImages(newImages);
            } else {
                product.getImages().addAll(newImages);
            }
        }

        return ProductMapper.toResponse(product);
    }

    // xóa sản phẩm
    @Transactional
    public void deleteProduct(String id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sản phẩm không tồn tại"));

        deleteFolderOnCloudinary(product.getId());

        productRepository.delete(product);
    }

    // xóa 1 hình của sản phẩm
    @Transactional
    public void deleteProductImage(String productId, String imageId) {

        ImageProduct image = imageProductRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Hình không tồn tại"));

        if (!image.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Hình không thuộc sản phẩm");
        }

        deleteImageOnCloudinary(productId, imageId);

        imageProductRepository.delete(image);
    }

    // xóa 1 thông tin chi tiết của sản phẩm
    @Transactional
    public void deleteSpecification(
            String productId,
            String specificationId) {

        Specification specification = specificationRepository.findById(specificationId)
                .orElseThrow(() -> new EntityNotFoundException("Thông số không tồn tại"));

        // đảm bảo spec thuộc product
        if (!specification.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Thông số không thuộc sản phẩm");
        }

        specificationRepository.delete(specification);
    }

    // kiểm tra product nào có id brand không
    public boolean existsProductByBrandId(String brandId) {
        return productRepository.existsByBrandId(brandId);
    }

    // kiểm tra product nào có id category không
    public boolean existsProductByCategoryId(String categoryId) {
        return productRepository.existsByCategoryId(categoryId);
    }

    private void deleteImageOnCloudinary(String productId, String imageId) {
        try {
            String publicId = "nckh/products/"
                    + productId
                    + "/"
                    + imageId;

            cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap("resource_type", "image"));

        } catch (Exception e) {
            throw new IllegalStateException("Xóa hình thất bại", e);
        }
    }

    private void deleteFolderOnCloudinary(String productId) {
        try {
            String folderPath = "nckh/products/" + productId;

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

    private ImageProduct uploadImageOnCloudinary(
            MultipartFile file,
            Product product) {

        // Validate size
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("Dung lượng hình tối đa 2MB");
        }

        // Validate type
        String contentType = file.getContentType();
        List<String> allowedTypes = List.of(
                "image/jpeg",
                "image/png",
                "image/webp");

        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new IllegalArgumentException("Chỉ cho phép JPG, PNG, WEBP");
        }

        String imageId = UUID.randomUUID().toString();

        try {
            String publicId = "nckh/products/"
                    + product.getId()
                    + "/"
                    + imageId;

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", publicId,
                            "overwrite", true,
                            "resource_type", "image"));

            return ImageProduct.builder()
                    .id(imageId)
                    .image(uploadResult.get("secure_url").toString())
                    .product(product)
                    .build();

        } catch (IOException e) {
            throw new IllegalStateException("Upload hình thất bại", e);
        }
    }

    private Sort buildSort(String sort) {

        if (sort == null || sort.isBlank()) {
            return Sort.by("createdAt").descending();
        }

        switch (sort) {
            case "price-asc":
                return Sort.by("price").ascending();

            case "price-desc":
                return Sort.by("price").descending();

            case "bestseller":
                return Sort.by("totalSold").descending();

            default:
                return Sort.by("createdAt").descending();
        }
    }

    // xử lý thêm, sửa, xóa specifications
    private void syncSpecifications(
            Product product,
            List<SpecificationRequest> requests) {

        Map<String, Specification> existingMap = product.getSpecifications().stream()
                .collect(Collectors.toMap(
                        Specification::getId,
                        s -> s));

        List<Specification> newList = new ArrayList<>();

        if (requests != null) {
            for (SpecificationRequest req : requests) {

                if (req.getId() != null && existingMap.containsKey(req.getId())) {
                    // UPDATE
                    Specification spec = existingMap.get(req.getId());
                    spec.setSpecKey(req.getSpecKey());
                    spec.setSpecValue(req.getSpecValue());
                    spec.setDisplayOrder(req.getDisplayOrder());
                    newList.add(spec);
                } else {
                    // INSERT
                    newList.add(
                            Specification.builder()
                                    .specKey(req.getSpecKey())
                                    .specValue(req.getSpecValue())
                                    .displayOrder(req.getDisplayOrder())
                                    .product(product)
                                    .build());
                }
            }
        }

        // cái nào không có trong newList → bị orphan → DB DELETE
        product.getSpecifications().clear();
        product.getSpecifications().addAll(newList);
    }

    private ProductResponse mapWithClient(Product product) {

        CategoryResponse category = categoryServiceClient.getCategoryById(product.getCategoryId());

        BrandResponse brand = brandServiceClient.getBrandById(product.getBrandId());

        return ProductMapper.toResponse(product, category, brand);
    }

}
