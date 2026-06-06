import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { lazy, Suspense } from "react";
import InputImage from "../ui/InputImage";
import Image from "../../ui/Image";
import { HiMiniXMark } from "react-icons/hi2";
import { SiTicktick } from "react-icons/si";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import InputImage1 from "../ui/InputImage1";
import { useInputImage } from "../../../hooks/admin/useInputImage";
import { useInputImage1 } from "../../../hooks/admin/useInputImage1";
import { useSpecification } from "../../../hooks/admin/useSpecification";
import SpecificationEditor from "./SpecificationEditor";
import useGetAllCategories from "../../../hooks/admin/category/useGetAllCategories";
import useGetAllBrands from "../../../hooks/admin/brand/useGetAllBrands";
import useGetProduct from "../../../hooks/admin/product/useGetProduct";
import useUpdateProduct from "../../../hooks/admin/product/useUpdateProduct";
import useDeleteImageProduct from "../../../hooks/admin/product/useDeleteImageProduct";
import useUpdateImageProduct from "../../../hooks/admin/product/useUpdateProductImage";
import SearchableSelect from "../ui/SearchableSelect";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Label from "../../ui/Label";

const TextBoxEditor = lazy(() => import("../textboxeditor/TextBoxEditor"));

const ImageViewer = lazy(() => import("../../ui/ImageViewer"));

function EditProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const { product, isLoading } = useGetProduct(id as string);
  const { updateProduct, isLoading: isLoadingUpdate } = useUpdateProduct(
    id as string,
  );
  const { deleteImageProduct, isLoading: isLoadingDeleteImage } =
    useDeleteImageProduct(product?.id || "");
  const { updateImageProduct, isLoading: isLoadingUpdateImage } =
    useUpdateImageProduct(product?.id || "");
  const { categories } = useGetAllCategories();
  const { brands } = useGetAllBrands();

  const categoryOptions = categories
    .filter((c) => c.id)
    .map((c) => ({
      value: c.id!,
      label: c.name,
    }));

  const brandOptions = brands
    .filter((b) => b.id)
    .map((b) => ({
      value: b.id!,
      label: b.name,
    }));

  const {
    specifications,
    setSpecifications,
    addSpecification,
    removeSpecification,
    updateSpecification,
  } = useSpecification();

  const {
    previewImages,
    handlePreviewImage,
    handleRemovePreviewImage,
    handleReorder,
    getOrderedFiles,
    clearImages,
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
      setSpecifications(product?.specifications);
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
      [name]:
        name === "price" || name === "discount" || name === "stock"
          ? Number(value)
          : value,
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

    await deleteImageProduct(imageId);
  };

  const handleUpdateImage = async (imageId: string, file: File) => {
    await updateImageProduct(imageId, file);
    setPreviewImages1([]);
    setSelectedFiles1([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name.trim()) {
      toast.error("Tên sản phẩm không được để trống");
      return;
    }

    if (!data.category) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }

    if (!data.brand) {
      toast.error("Vui lòng chọn thương hiệu");
      return;
    }

    if (data.status === "") {
      toast.error("Vui lòng chọn tình trạng");
      return;
    }

    if (!data.description.trim()) {
      toast.error("Mô tả không được để trống");
      return;
    }

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

    if (data.discount > 0) {
      if (Math.floor((data.discount / data.price) * 100) < 1) {
        toast.error("Phần trăm giảm giá phải lớn hơn hoặc bằng 1%");
        return;
      }
    }

    if (Number(data.stock) < 0) {
      toast.error("Số lượng hiện có phải lớn hơn hoặc bằng 0");
      return;
    }

    if (!data.category) {
      toast.error("Vui lòng chọn danh mục");
      return;
    }

    if (!data.brand) {
      toast.error("Vui lòng chọn thương hiệu");
      return;
    }

    if (!specifications.length) {
      toast.error("Vui lòng thêm thông tin chi tiết");
      return;
    }

    const isValidSpecs = specifications.every(
      (s) => s.specKey.trim() && s.specValue.trim(),
    );

    if (!isValidSpecs) {
      toast.error("Thông tin chi tiết không được để trống");
      return;
    }

    const normalizedSpecifications = specifications.map((s) => ({
      ...s,
      specKey: s.specKey.trim(),
      specValue: s.specValue.trim(),
    }));

    const orderedFiles = getOrderedFiles();

    await updateProduct(
      {
        name: data.name,
        price: data.price,
        discount: data.discount,
        description: data.description,
        status: Number(data.status),
        stock: data.stock,
        categoryId: data.category,
        brandId: data.brand,
        specifications: normalizedSpecifications,
      },
      orderedFiles,
    );

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

    clearImages();
    setPreviewImages1([]);
    setSelectedFiles1([]);
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-neutral">Chỉnh sửa sản phẩm</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md w-full space-y-[20px]">
              <InputImage
                InputId="images-product"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                onRemovePreviewImage={handleRemovePreviewImage}
                onReorderImages={handleReorder}
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
                          src={
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
                              <Button
                                className="bg-white rounded-full p-1 border border-gray-300"
                                onClick={() => handleDeleteImage(image.id)}
                                disabled={isLoadingDeleteImage}
                                type="button"
                              >
                                <VscTrash
                                  size={22}
                                  className="text-[#d9534f]"
                                />
                              </Button>

                              <InputImage1
                                InputId={`img-${index}`}
                                sizeIcon={22}
                                imageIndex={index}
                                onFileSelect={onFileSelect}
                              />
                            </>
                          ) : (
                            <>
                              <Button
                                type="button"
                                className="bg-white rounded-full p-1 border border-gray-300 text-green-500"
                                disabled={isLoadingUpdateImage}
                                onClick={() =>
                                  handleUpdateImage(
                                    image!.id,
                                    selectedFiles1[index],
                                  )
                                }
                              >
                                <SiTicktick size={22} />
                              </Button>

                              <Button
                                type="button"
                                className="bg-white rounded-full p-1 border border-gray-300"
                                onClick={() => handleClear(index)}
                              >
                                <HiMiniXMark size={22} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-neutral">Thông tin chung</h5>

              <div className="flex flex-col gap-1 w-full">
                <Label htmlFor="" className="text-[0.9rem] font-medium">
                  Tên
                </Label>
                <Input
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
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Danh mục
                  </Label>
                  <SearchableSelect
                    options={categoryOptions}
                    value={data.category}
                    onChange={(val) =>
                      setData((prev) => ({
                        ...prev,
                        category: val,
                      }))
                    }
                    placeholder="Chọn danh mục"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Thương hiệu
                  </Label>
                  <SearchableSelect
                    options={brandOptions}
                    value={data.brand}
                    onChange={(val) =>
                      setData((prev) => ({
                        ...prev,
                        brand: val,
                      }))
                    }
                    placeholder="Chọn thương hiệu"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Tình trạng
                  </Label>
                  <Select
                    name="status"
                    required
                    onChange={handleChange}
                    value={data.status}
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  >
                    <option value="">Chọn tình trạng</option>
                    <option value="0">Ẩn</option>
                    <option value="1">Hiện</option>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="" className="text-[0.9rem] font-medium">
                  Mô tả
                </Label>
                <Suspense fallback={null}>
                  <TextBoxEditor
                    content={data.description}
                    onChange={handleDescriptionChange}
                  />
                </Suspense>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-neutral">Giá cả</h5>

              <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Giá bán
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Số tiền giảm (Giảm giá{" "}
                    {data.price > 0
                      ? Math.floor((data.discount / data.price) * 100)
                      : 0}
                    %)
                  </Label>
                  <Input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label htmlFor="" className="text-[0.9rem] font-medium">
                    Số lượng hiện có
                  </Label>
                  <Input
                    type="number"
                    name="stock"
                    value={data.stock}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                  />
                </div>
              </div>
            </div>

            <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
              <h5 className="font-bold text-neutral">Thông tin chi tiết</h5>

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
            <Button
              disabled={isLoadingUpdate}
              type="submit"
              className="p-[6px_10px] bg-success text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              {isLoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            <Link
              to="/admin/products"
              className="p-[6px_10px] bg-danger text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>

      {openViewer && (
        <Suspense fallback={null}>
          <ImageViewer
            image={viewerImage}
            open={openViewer}
            onClose={() => setOpenViewer(false)}
          />
        </Suspense>
      )}
    </>
  );
}

export default EditProductForm;
