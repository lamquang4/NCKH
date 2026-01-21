import Image from "../../Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";
import { mockCategories } from "../../../mocks/mockCategories";

function CategoryList() {
  const categories = mockCategories;

  return (
    <>
      {categories.length > 0 && (
        <section className="mb-[40px] px-[15px]">
          <div className="mx-auto max-w-[1200px] w-full">
            <h2 className="mb-[20px]">Danh mục</h2>

            <div className="flex justify-center">
              <Swiper
                spaceBetween={20}
                slidesPerView={"auto"}
                modules={[FreeMode]}
                grabCursor={true}
              >
                {categories.map((category) => (
                  <SwiperSlide
                    key={category.id}
                    className="!flex !flex-col !items-center !w-auto group"
                  >
                    <Link
                      to={`/products/${category.slug}`}
                      className="space-y-[8px]"
                    >
                      <div className="w-[110px] sm:w-[130px]  border border-gray-300 overflow-hidden rounded-full group-hover:border-black">
                        <Image
                          source={category.image || ""}
                          alt={category.name}
                          className="w-full h-full block object-cover rounded-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="text-center">
                        <h5 className="font-medium">{category.name} </h5>
                        <p className="font-normal">(0 sản phẩm)</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CategoryList;
