import MainBanner from "./MainBanner";
import CategoryList from "./CategoryList";
import ProductSlider from "../product/ProductSlider";
import PromotionBanner from "./PromotionBanner";
import { mockProducts } from "../../../mocks/mockProducts";

function Home() {
  const products = mockProducts;

  return (
    <>
      <MainBanner />
      <CategoryList />
      <ProductSlider products={products} title="Mới nhất" />
      <PromotionBanner
        banners={[
          {
            desktop: "/assets/banners/banner1.png",
            mobile: "/assets/banners/banner1.png",
          },
          {
            desktop: "/assets/banners/banner2.png",
            mobile: "/assets/banners/banner2.png",
          },
        ]}
      />
    </>
  );
}

export default Home;
