import { lazy, Suspense } from "react";
import useGetActiveProducts from "../../../hooks/customer/product/list/useActiveProducts";
import useGetBestsellerProducts from "../../../hooks/customer/product/list/useGetBestSellerProducts";
import BannerCarousel from "./BannerCarousel";

const ProductSlider = lazy(() => import("../product/ProductSlider"));
const PromotionBanner = lazy(() => import("./PromotionBanner"));

function HomeContainer() {
  const { products: products1, isLoading: isLoading1 } =
    useGetActiveProducts(12);
  const { products: products2, isLoading: isLoading2 } =
    useGetBestsellerProducts(12);

  return (
    <>
      <BannerCarousel />

      <Suspense fallback={null}>
        <ProductSlider
          products={products1}
          isLoading={isLoading1}
          title="Mới nhất"
        />
      </Suspense>

      <Suspense fallback={null}>
        <PromotionBanner
          banners={[
            {
              desktop: "/assets/banners/banner1.webp",
              mobile: "/assets/banners/banner1.webp",
            },
            {
              desktop: "/assets/banners/banner2.webp",
              mobile: "/assets/banners/banner2.webp",
            },
          ]}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ProductSlider
          products={products2}
          isLoading={isLoading2}
          title="Bán chạy nhất"
        />
      </Suspense>

      <Suspense fallback={null}>
        <PromotionBanner
          banners={[
            {
              desktop: "/assets/banners/banner1.webp",
              mobile: "/assets/banners/banner1.webp",
            },
            {
              desktop: "/assets/banners/banner2.webp",
              mobile: "/assets/banners/banner2.webp",
            },
          ]}
        />
      </Suspense>
    </>
  );
}

export default HomeContainer;
