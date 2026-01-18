import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: any[];
}

function ProductSlider({ title, products }: Props) {
  return (
    <>
      {products.length > 0 && (
        <section className="mb-[40px] px-[15px] text-black">
          <div className="mx-auto max-w-[1200px] w-full">
            <h2 className="mb-[20px]">{title}</h2>
            <Swiper
              spaceBetween={10}
              modules={[FreeMode]}
              freeMode={true}
              grabCursor={true}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1640: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.map((product) => {
                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default ProductSlider;
