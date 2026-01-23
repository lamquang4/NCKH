import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import InputImage from "../InputImage";
import Image from "../../Image";
import ImageViewer from "../../ImageViewer";
import { HiMiniXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import TextBoxEditor from "../textboxeditor/TextBoxEditor";
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import InputImage1 from "../InputImage1";
import { useInputImage } from "../../../hooks/admin/useInputImage";
import { useInputImage1 } from "../../../hooks/admin/useInputImage1";
import { mockCategories } from "../../../mocks/mockCategories";
import { mockBrands } from "../../../mocks/mockBrands";
import { mockProducts } from "../../../mocks/mockProducts";
import { useSpecification } from "../../../hooks/admin/useSpecification";
import SpecificationEditor from "./SpecificationEditor";

function EditProduct() {
  const navigate = useNavigate();
  // const { id } = useParams();

  const product = mockProducts[0];
  const isLoading = false;
  const categories = mockCategories;
  const brands = mockBrands;

  const {
    specifications,
    setSpecifications,
    addSpecification,
    removeSpecification,
    updateSpecification,
  } = useSpecification();

  const [data, setData] = useState({
    name: "",
    price: 1,
    discount: 0,
    description: "",
    stock: 1,
    category: "",
    brand: "",
    status: "",
  });

  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [viewerImage, setViewerImage] = useState<string>("");

  const max = 10;

  const {
    previewImages,
    setPreviewImages,
    selectedFiles,
    setSelectedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
  } = useInputImage(max);

  const {
    previewImages1,
    selectedFiles1,
    setPreviewImages1,
    setSelectedFiles1,
    onFileSelect,
    handleClear,
  } = useInputImage1();

  const handleOpenViewer = (image: string) => {
    setViewerImage(image);
    setOpenViewer(true);
  };

  useEffect(() => {
    if (product?.specifications?.length) {
      setSpecifications(
        product.specifications
          .slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((s) => ({
            ...s,
            isNew: false,
          })),
      );
    }
  }, [product, setSpecifications]);

  useEffect(() => {
    if (isLoading) return;

    if (!product) {
      toast.error("Sản phẩm không tìm thấy");
      navigate("/admin/products");
      return;
    }

    setData({
      name: product.name || "",
      price: product.price || 1,
      discount: product.discount || 0,
      description: product.description || "",
      stock: product.stock || 1,
      category: product.category?.id || "",
      brand: product.brand?.id || "",
      status: product.status?.toString() || "",
    });
  }, [isLoading, product, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = useCallback((val: string) => {
    setData((prev) => ({ ...prev, description: val }));
  }, []);

  const handleDeleteImage = async (imageId: string) => {
    if (product?.images.length === 1 || !imageId) {
      toast.error(
        "Bạn không thể xóa hình này vì mỗi sách phải có ít nhất một hình ảnh",
      );
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(data.price) < Number(data.discount)) {
      toast.error("Số tiền giảm không được lớn hơn giá bán");
      return;
    }

    if (Number(data.discount) < 0) {
      toast.error("Số tiền giảm phải lớn hơn hoặc bằng 0");
      return;
    }

    if (Number(data.price) <= 0) {
      toast.error("Giá bán phải lớn hơn 0");
      return;
    }

    if (Number(data.stock) < 0) {
      toast.error("Số lượng hiện có phải lớn hơn hoặc bằng 0");
      return;
    }

    try {
      const formData = new FormData();

      const productData = {
        name: data.name,
        price: Number(data.price),
        discount: Number(data.discount),
        description: data.description,
        stock: Number(data.stock),
        status: data.status,
        category: { id: data.category },
        brand: { id: data.brand },
      };

      formData.append(
        "product",
        new Blob([JSON.stringify(productData)], { type: "application/json" }),
      );

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      if (selectedFiles1.length > 0) {
        const newFiles = selectedFiles1.filter((f) => f !== null);
        if (newFiles.length > 0) {
          const oldImageIds = product?.images
            .map((img, index) => (selectedFiles1[index] ? img.id : null))
            .filter((id) => id !== null);

          const formData = new FormData();
          selectedFiles1.forEach((file) => formData.append("files", file));
          oldImageIds?.forEach((id) => formData.append("oldImageIds", id));
        }
      }

      setPreviewImages([]);
      setSelectedFiles([]);
      setPreviewImages1([]);
      setSelectedFiles1([]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-[#74767d]">Chỉnh sửa sản phẩm</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md w-full space-y-[20px]">
              <InputImage
                InputId="images-product"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                onRemovePreviewImage={handleRemovePreviewImage}
                blockIndex={0}
              />

              <div className="flex justify-center items-center">
                <Swiper
                  spaceBetween={15}
                  slidesPerView={"auto"}
                  modules={[FreeMode]}
                  grabCursor={true}
                >
                  {product?.images.map((image, index) => (
                    <SwiperSlide key={index} className="!w-auto relative">
                      <div
                        className="w-[150px] border border-gray-300 cursor-pointer"
                        onClick={() => {
                          const src = previewImages1?.[index]
                            ? previewImages1[index]
                            : image.image;

                          if (src) handleOpenViewer(src);
                        }}
                      >
                        <Image
                          source={
                            previewImages1?.[index]
                              ? previewImages1[index]
                              : `${image.image}`
                          }
                          alt={product.name}
                          className="w-full h-full"
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute top-[6px] right-[6px]">
                        <div className="flex items-center flex-col gap-2">
                          {!previewImages1?.[index] ? (
                            <>
                              <button
                                className="bg-white rounded-full p-1 border border-gray-300"
                                onClick={() => handleDeleteImage(image.id)}
                                type="button"
                              >
                                <VscTrash
                                  size={22}
                                  className="text-[#d9534f]"
                                />
                              </button>
                              <InputImage1
                                InputId={`img-${index}`}
                                sizeIcon={22}
                                imageIndex={index}
                                onFileSelect={onFileSelect}
                              />
                            </>
                          ) : (
                            <button
                              type="button"
                              className="p-2"
                              onClick={() => handleClear(index)}
                            >
                              <HiMiniXMark size={26} />
                            </button>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Thông tin chung</h5>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Tên
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  name="name"
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Danh mục
                  </label>
                  <select
                    name="category"
                    required
                    onChange={handleChange}
                    value={data.category}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Thương hiệu
                  </label>
                  <select
                    name="brand"
                    required
                    onChange={handleChange}
                    value={data.brand}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brands.map((brand) => (
                      <option value={brand.id} key={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="" className="text-[0.9rem] font-medium">
                  Mô tả
                </label>
                <TextBoxEditor
                  content={data.description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Giá cả</h5>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Giá bán
                  </label>
                  <input
                    type="number"
                    name="price"
                    inputMode="numeric"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Số tiền giảm (Giảm giá{" "}
                    {Math.floor((data.discount / data.price) * 100)}%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    inputMode="numeric"
                    value={data.discount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="" className="text-[0.9rem] font-medium">
                    Số lượng hiện có
                  </label>
                  <input
                    type="number"
                    name="stock"
                    inputMode="numeric"
                    value={data.stock}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-[#74767d]">Thông tin chi tiết</h5>

              <SpecificationEditor
                specifications={specifications}
                setSpecifications={setSpecifications}
                addSpecification={addSpecification}
                removeSpecification={removeSpecification}
                updateSpecification={updateSpecification}
              />
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              disabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-teal-500 text-white text-[0.9rem] font-medium text-center hover:bg-teal-600 rounded-sm"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <Link
              to="/admin/products"
              className="p-[6px_10px] bg-red-500 text-white text-[0.9rem] text-center hover:bg-red-600 rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>

      {openViewer && (
        <ImageViewer
          image={viewerImage}
          open={openViewer}
          onClose={() => setOpenViewer(false)}
        />
      )}
    </>
  );
}

export default EditProduct;
