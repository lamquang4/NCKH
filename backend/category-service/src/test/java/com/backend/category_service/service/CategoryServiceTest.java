package com.backend.category_service.service;

import com.backend.category_service.client.ProductServiceClient;
import com.backend.category_service.dto.request.CategoryRequest;
import com.backend.category_service.dto.response.CategoryResponse;
import com.backend.category_service.entity.Category;
import com.backend.category_service.exception.AppException;
import com.backend.category_service.exception.ErrorCode;
import com.backend.category_service.repository.CategoryRepository;
import com.cloudinary.Cloudinary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductServiceClient productServiceClient;

    @Mock
    private Cloudinary cloudinary;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;
    private CategoryRequest categoryRequest;
    private MockMultipartFile mockFile;

    @BeforeEach
    void setUp() {
        category = createSampleCategory();
        categoryRequest = CategoryRequest.builder()
                .name("Laptop")
                .status(1)
                .build();

        mockFile = new MockMultipartFile(
                "image",
                "test.png",
                "image/png",
                "test image content".getBytes()
        );
    }

    // ==========================================
    // 1. Nhóm test cho getCategories / getAllCategories / getActiveCategories
    // ==========================================

    @Test
    void getCategories_ShouldReturnPagedCategories_WhenNoFiltersProvided() {
        // Given
        Page<Category> categoryPage = new PageImpl<>(List.of(category));
        when(categoryRepository.findAll(any(Pageable.class))).thenReturn(categoryPage);

        // When
        Page<CategoryResponse> result = categoryService.getCategories(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Điện thoại");
    }

    @Test
    void getActiveCategories_ShouldReturnActiveCategories() {
        // Given
        when(categoryRepository.findByStatus(1)).thenReturn(List.of(category));

        // When
        List<CategoryResponse> result = categoryService.getActiveCategories();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getStatus()).isEqualTo(1);
    }

    // ==========================================
    // 2. Nhóm test cho getCategoryById / getCategoryBySlug
    // ==========================================

    @Test
    void getCategoryById_ShouldReturnCategoryResponse_WhenCategoryExists() {
        // Given
        when(categoryRepository.findById("cat-id")).thenReturn(Optional.of(category));

        // When
        CategoryResponse result = categoryService.getCategoryById("cat-id");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Điện thoại");
    }

    @Test
    void getCategoryById_ShouldThrowAppException_WhenCategoryDoesNotExist() {
        // Given
        when(categoryRepository.findById("non-exist")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> categoryService.getCategoryById("non-exist"))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.CATEGORY_NOT_FOUND.getMessage());
    }


    @Test
    void createCategory_ShouldThrowException_WhenNameAlreadyExists() {
        // Given
        when(categoryRepository.existsByName(categoryRequest.getName())).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> categoryService.createCategory(categoryRequest, mockFile))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.CATEGORY_NAME_EXISTS.getMessage());
    }

    @Test
    void createCategory_ShouldThrowException_WhenImageIsEmpty() {
        // When & Then
        assertThatThrownBy(() -> categoryService.createCategory(categoryRequest, null))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.IMAGE_REQUIRED.getMessage());
    }

    // ==========================================
    // 4. Nhóm test cho updateCategoryStatus
    // ==========================================

    @Test
    void updateCategoryStatus_ShouldHideProducts_WhenStatusIsZero() {
        // Given
        when(categoryRepository.findById("cat-id")).thenReturn(Optional.of(category));

        // When
        categoryService.updateCategoryStatus("cat-id", 0);

        // Then
        assertThat(category.getStatus()).isEqualTo(0);
        verify(categoryRepository).save(category);
        verify(productServiceClient).hideProductsByCategoryInternal("cat-id");
    }

    // ==========================================
    // 5. Nhóm test cho deleteCategory
    // ==========================================

    @Test
    void deleteCategory_ShouldThrowException_WhenCategoryInUse() {
        // Given
        when(categoryRepository.findById("cat-id")).thenReturn(Optional.of(category));
        when(productServiceClient.existsProductByCategoryIdInternal("cat-id")).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> categoryService.deleteCategory("cat-id"))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.CATEGORY_IN_USE.getMessage());
    }

    // Helper Method
    private Category createSampleCategory() {
        Category c = new Category();
        c.setId("cat-id");
        c.setName("Điện thoại");
        c.setSlug("dien-thoai");
        c.setStatus(1);
        c.setImage("phone-image.png");
        c.setCreatedAt(LocalDateTime.now());
        return c;
    }
}