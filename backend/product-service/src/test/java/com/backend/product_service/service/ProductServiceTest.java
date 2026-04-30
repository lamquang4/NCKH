package com.backend.product_service.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.backend.product_service.dto.request.ProductRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.backend.product_service.client.BrandServiceClient;
import com.backend.product_service.client.CartServiceClient;
import com.backend.product_service.client.CategoryServiceClient;
import com.backend.product_service.client.OrderServiceClient;
import com.backend.product_service.dto.request.ProductQueryRequest;
import com.backend.product_service.dto.response.BrandResponse;
import com.backend.product_service.dto.response.CategoryResponse;
import com.backend.product_service.dto.response.ProductAssistantResponse;
import com.backend.product_service.dto.response.ProductDetailResponse;
import com.backend.product_service.dto.response.ProductListItemResponse;
import com.backend.product_service.entity.Product;
import com.backend.product_service.exception.AppException;
import com.backend.product_service.exception.ErrorCode;
import com.backend.product_service.repository.ImageProductRepository;
import com.backend.product_service.repository.ProductRepository;
import com.backend.product_service.repository.SpecificationRepository;
import com.cloudinary.Cloudinary;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ImageProductRepository imageProductRepository;

    @Mock
    private SpecificationRepository specificationRepository;

    @Mock
    private CategoryServiceClient categoryServiceClient;

    @Mock
    private BrandServiceClient brandServiceClient;

    @Mock
    private CartServiceClient cartServiceClient;

    @Mock
    private OrderServiceClient orderServiceClient;

    @Mock
    private Cloudinary cloudinary;

    @InjectMocks
    private ProductService productService;

    // ==========================================
    // 1. Nhóm test cho getAllProducts và các hàm phân trang
    // ==========================================

    @Test
    void getAllProducts_ShouldReturnMappedPage_WhenNoFiltersProvided() {
        // Given
        Product product = createSampleProduct();
        Page<Product> productPage = new PageImpl<>(List.of(product));
        when(productRepository.findAll(any(Pageable.class))).thenReturn(productPage);

        when(categoryServiceClient.getCategoriesByIdsInternal(anyList()))
                .thenReturn(Map.of("cat-id", new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1)));
        when(brandServiceClient.getBrandsByIdsInternal(anyList()))
                .thenReturn(Map.of("brand-id", new BrandResponse("brand-id", "BrandName", "brand-slug", 1)));

        // When
        Page<ProductListItemResponse> result = productService.getAllProducts(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Laptop Gaming");
    }

    @Test
    void getAllProducts_ShouldReturnFilteredPage_WhenQueryAndStatusProvided() {
        // Given
        Product product = createSampleProduct();
        Page<Product> productPage = new PageImpl<>(List.of(product));
        when(productRepository.findByNameContainingIgnoreCaseAndStatus(eq("Laptop"), eq(1), any(Pageable.class)))
                .thenReturn(productPage);

        when(categoryServiceClient.getCategoriesByIdsInternal(anyList()))
                .thenReturn(Map.of("cat-id", new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1)));
        when(brandServiceClient.getBrandsByIdsInternal(anyList()))
                .thenReturn(Map.of("brand-id", new BrandResponse("brand-id", "BrandName", "brand-slug", 1)));

        // When
        Page<ProductListItemResponse> result = productService.getAllProducts(1, 10, "Laptop", 1);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
    }

    @Test
    void getActiveProducts_ShouldReturnMappedPage_WhenQueryIsProvided() {
        // Given
        Product product = createSampleProduct();
        Page<Product> productPage = new PageImpl<>(List.of(product));
        when(productRepository.findByStatusAndNameContainingIgnoreCase(eq(1), eq("laptop"), any(Pageable.class)))
                .thenReturn(productPage);

        when(categoryServiceClient.getCategoriesByIdsInternal(anyList()))
                .thenReturn(Map.of("cat-id", new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1)));
        when(brandServiceClient.getBrandsByIdsInternal(anyList()))
                .thenReturn(Map.of("brand-id", new BrandResponse("brand-id", "BrandName", "brand-slug", 1)));

        // When
        Page<ProductListItemResponse> result = productService.getActiveProducts(1, 10, "laptop", "price-asc");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
    }

    // ==========================================
    // 2. Nhóm test cho getProductById / getActiveProductBySlug
    // ==========================================

    @Test
    void getProductById_ShouldReturnProductDetail_WhenProductExists() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findById("prod-id")).thenReturn(Optional.of(product));

        when(categoryServiceClient.getCategoryByIdInternal("cat-id"))
                .thenReturn(new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1));
        when(brandServiceClient.getBrandByIdInternal("brand-id"))
                .thenReturn(new BrandResponse("brand-id", "BrandName", "brand-slug", 1));

        // When
        ProductDetailResponse result = productService.getProductById("prod-id");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Laptop Gaming");
    }

    @Test
    void getActiveProductBySlug_ShouldReturnProductDetail_WhenActiveAndExists() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findBySlugAndStatus("laptop-gaming", 1)).thenReturn(Optional.of(product));

        when(categoryServiceClient.getCategoryByIdInternal("cat-id"))
                .thenReturn(new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1));
        when(brandServiceClient.getBrandByIdInternal("brand-id"))
                .thenReturn(new BrandResponse("brand-id", "BrandName", "brand-slug", 1));

        // When
        ProductDetailResponse result = productService.getActiveProductBySlug("laptop-gaming");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getSlug()).isEqualTo("laptop-gaming");
    }

    // ==========================================
    // 3. Nhóm test cho queryProductsForAssistant (Dùng cho AI)
    // ==========================================

    @Test
    void queryProductsForAssistant_ShouldReturnProducts_WhenFiltersMatch() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findByStatus(eq(1), any(Sort.class))).thenReturn(List.of(product));

        when(categoryServiceClient.getCategoriesByIdsInternal(anyList()))
                .thenReturn(Map.of("cat-id", new CategoryResponse("cat-id", "CatName", "cat-slug", "default.png", 1)));
        when(brandServiceClient.getBrandsByIdsInternal(anyList()))
                .thenReturn(Map.of("brand-id", new BrandResponse("brand-id", "BrandName", "brand-slug", 1)));

        ProductQueryRequest request = new ProductQueryRequest();
        request.setSortBy("createdAt");

        // When
        List<ProductAssistantResponse> result = productService.queryProductsForAssistant(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
    }

    @Test
    void queryProductsForAssistant_ShouldReturnEmpty_WhenCategoryClientFails() {
        // Given
        ProductQueryRequest request = new ProductQueryRequest();
        request.setCategory("invalid-category-slug");

        when(categoryServiceClient.getCategoryBySlugInternal("invalid-category-slug"))
                .thenThrow(new RuntimeException("Service Unavailable"));

        // When
        List<ProductAssistantResponse> result = productService.queryProductsForAssistant(request);

        // Then
        assertThat(result).isEmpty();
    }

    // Helper Method tạo dữ liệu mẫu
    private Product createSampleProduct() {
        Product p = new Product();
        p.setId("prod-id");
        p.setName("Laptop Gaming");
        p.setSlug("laptop-gaming");
        p.setPrice(BigDecimal.valueOf(1500));
        p.setFinalPrice(BigDecimal.valueOf(1500));
        p.setStatus(1);
        p.setDiscount(BigDecimal.ZERO);
        p.setTotalSold(10);
        p.setStock(20);
        p.setCategoryId("cat-id");
        p.setBrandId("brand-id");
        return p;
    }

    // ==========================================
    // 4. Nhóm test cho updateProductStatus
    // ==========================================

    @Test
    void updateProductStatus_ShouldUpdateStatus_WhenStatusIsZero() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findById("prod-id")).thenReturn(Optional.of(product));

        // When
        productService.updateProductStatus("prod-id", 0);

        // Then
        assertThat(product.getStatus()).isEqualTo(0);
        verify(productRepository).save(product);
    }

    // ==========================================
    // 4. Nhóm test cho updateProductStatus
    // ==========================================

    @Test
    void updateProductStatus_ShouldThrowException_WhenCategoryIsInactive() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findById("prod-id")).thenReturn(Optional.of(product));

        CategoryResponse categoryResponse = CategoryResponse.builder()
                .id("cat-id")
                .name("CatName")
                .slug("cat-slug")
                .image("default.png")
                .status(0) // Inactive
                .build();
        when(categoryServiceClient.getCategoryByIdInternal("cat-id")).thenReturn(categoryResponse);

        // When & Then
        assertThatThrownBy(() -> productService.updateProductStatus("prod-id", 1))
                .isInstanceOf(AppException.class)
                .hasMessage("Danh mục đang bị ẩn, không thể kích hoạt sản phẩm");
    }

    @Test
    void updateProductStatus_ShouldThrowException_WhenBrandIsInactive() {
        // Given
        Product product = createSampleProduct();
        when(productRepository.findById("prod-id")).thenReturn(Optional.of(product));

        CategoryResponse categoryResponse = CategoryResponse.builder()
                .id("cat-id")
                .name("CatName")
                .slug("cat-slug")
                .image("default.png")
                .status(1)
                .build();
        when(categoryServiceClient.getCategoryByIdInternal("cat-id")).thenReturn(categoryResponse);

        BrandResponse brandResponse = BrandResponse.builder()
                .id("brand-id")
                .name("BrandName")
                .slug("brand-slug")
                .status(0) // Inactive
                .build();
        when(brandServiceClient.getBrandByIdInternal("brand-id")).thenReturn(brandResponse);

        // When & Then
        assertThatThrownBy(() -> productService.updateProductStatus("prod-id", 1))
                .isInstanceOf(AppException.class)
                .hasMessage("Thương hiệu đang bị ẩn, không thể kích hoạt sản phẩm");
    }

    // ==========================================
    // 5. Nhóm test cho createProduct
    // ==========================================

    @Test
    void createProduct_ShouldThrowException_WhenPriceIsZeroOrNegative() {
        // Given
        ProductRequest request = new ProductRequest();
        request.setPrice(BigDecimal.ZERO);

        // When & Then
        assertThatThrownBy(() -> productService.createProduct(request, List.of()))
                .isInstanceOf(AppException.class)
                .hasMessage("Giá bán phải lớn hơn 0");
    }

    @Test
    void createProduct_ShouldThrowException_WhenDiscountExceedsOrEqualsPrice() {
        // Given
        ProductRequest request = new ProductRequest();
        request.setPrice(BigDecimal.valueOf(100));
        request.setDiscount(BigDecimal.valueOf(150)); // Giảm giá lớn hơn giá

        // When & Then
        assertThatThrownBy(() -> productService.createProduct(request, List.of()))
                .isInstanceOf(AppException.class)
                .hasMessage("Số tiền giảm giá phải nhỏ hơn giá bán");
    }

    @Test
    void createProduct_ShouldThrowException_WhenFilesAreEmpty() {
        // Given
        ProductRequest request = new ProductRequest();
        request.setPrice(BigDecimal.valueOf(500));
        request.setDiscount(BigDecimal.ZERO);
        request.setStock(10);
        request.setSpecifications(List.of(new com.backend.product_service.dto.request.SpecificationRequest()));

        // When & Then
        assertThatThrownBy(() -> productService.createProduct(request, null))
                .isInstanceOf(AppException.class)
                .hasMessage("Vui lòng thêm ít nhất một hình sản phẩm");
    }

    // ==========================================
    // 6. Nhóm test cho updateProduct
    // ==========================================

    @Test
    void updateProduct_ShouldThrowException_WhenProductNotFound() {
        // Given
        when(productRepository.findById("non-exist")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> productService.updateProduct("non-exist", new ProductRequest(), List.of()))
                .isInstanceOf(AppException.class)
                .hasMessage("Sản phẩm không tìm thấy");
    }
    
}