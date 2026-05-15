package com.backend.brand_service.service;

import com.backend.brand_service.client.ProductServiceClient;
import com.backend.brand_service.dto.request.BrandRequest;
import com.backend.brand_service.dto.response.BrandResponse;
import com.backend.brand_service.entity.Brand;
import com.backend.brand_service.exception.AppException;
import com.backend.brand_service.exception.ErrorCode;
import com.backend.brand_service.repository.BrandRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BrandServiceTest {

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private ProductServiceClient productServiceClient;

    @InjectMocks
    private BrandService brandService;

    private Brand brand;
    private BrandRequest brandRequest;

    @BeforeEach
    void setUp() {
        brand = createSampleBrand();
        brandRequest = BrandRequest.builder()
                .name("Samsung")
                .status(1)
                .build();
    }

    // ==========================================
    // 1. Nhóm test cho getBrands / getAllBrands / getActiveBrands
    // ==========================================

    @Test
    void getBrands_ShouldReturnPagedBrands_WhenNoFiltersProvided() {
        // Given
        Page<Brand> brandPage = new PageImpl<>(List.of(brand));
        when(brandRepository.findAll(any(Pageable.class))).thenReturn(brandPage);

        // When
        Page<BrandResponse> result = brandService.getBrands(1, 10, null, null);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Samsung");
    }

    @Test
    void getActiveBrands_ShouldReturnActiveBrands() {
        // Given
        when(brandRepository.findByStatus(1)).thenReturn(List.of(brand));

        // When
        List<BrandResponse> result = brandService.getActiveBrands();

        // Then
        assertThat(result).isNotNull();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getStatus()).isEqualTo(1);
    }

    // ==========================================
    // 2. Nhóm test cho getBrandById / getBrandBySlug
    // ==========================================

    @Test
    void getBrandById_ShouldReturnBrandResponse_WhenBrandExists() {
        // Given
        when(brandRepository.findById("brand-id")).thenReturn(Optional.of(brand));

        // When
        BrandResponse result = brandService.getBrandById("brand-id");

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Samsung");
    }

    @Test
    void getBrandById_ShouldThrowAppException_WhenBrandDoesNotExist() {
        // Given
        when(brandRepository.findById("non-exist")).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> brandService.getBrandById("non-exist"))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.BRAND_NOT_FOUND.getMessage());
    }

    // ==========================================
    // 3. Nhóm test cho createBrand
    // ==========================================

    @Test
    void createBrand_ShouldSaveBrand_WhenRequestIsValid() {
        // Given
        when(brandRepository.existsByName(brandRequest.getName())).thenReturn(false);

        // When
        brandService.createBrand(brandRequest);

        // Then
        verify(brandRepository).save(any(Brand.class));
    }

    @Test
    void createBrand_ShouldThrowException_WhenNameAlreadyExists() {
        // Given
        when(brandRepository.existsByName(brandRequest.getName())).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> brandService.createBrand(brandRequest))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.BRAND_NAME_EXISTS.getMessage());
    }

    // ==========================================
    // 4. Nhóm test cho updateBrandStatus
    // ==========================================

    @Test
    void updateBrandStatus_ShouldHideProducts_WhenStatusIsZero() {
        // Given
        when(brandRepository.findById("brand-id")).thenReturn(Optional.of(brand));

        // When
        brandService.updateBrandStatus("brand-id", 0);

        // Then
        assertThat(brand.getStatus()).isEqualTo(0);
        verify(brandRepository).save(brand);
        verify(productServiceClient).hideProductsByBrandInternal("brand-id");
    }

    // ==========================================
    // 5. Nhóm test cho deleteBrand
    // ==========================================

    @Test
    void deleteBrand_ShouldThrowException_WhenBrandInUse() {
        // Given
        when(brandRepository.findById("brand-id")).thenReturn(Optional.of(brand));
        when(productServiceClient.existsProductByBrandIdInternal("brand-id")).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> brandService.deleteBrand("brand-id"))
                .isInstanceOf(AppException.class)
                .hasMessage(ErrorCode.BRAND_IN_USE.getMessage());
    }

    // Helper Method
    private Brand createSampleBrand() {
        return Brand.builder()
                .id("brand-id")
                .name("Samsung")
                .slug("samsung")
                .status(1)
                .createdAt(LocalDateTime.now())
                .build();
    }
}