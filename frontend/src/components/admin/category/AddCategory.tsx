import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useInputImage } from "../../../hooks/admin/useInputImage";
import InputImage from "../ui/InputImage";
import useAddCategory from "../../../hooks/admin/category/useAddCategory";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Label from "../../ui/Label";

function AddCategory() {
  const [data, setData] = useState({
    name: "",
    status: "",
  });

  const { addCategory, isLoading } = useAddCategory();

  const {
    previewImages,
    getOrderedFiles,
    handlePreviewImage,
    handleRemovePreviewImage,
    handleReorder,
    clearImages,
  } = useInputImage(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderedFiles = getOrderedFiles();

    if (!orderedFiles[0]) {
      toast.error("Vui lòng thêm hình danh mục");
      return;
    }

    if (!data.name.trim()) {
      toast.error("Tên danh mục không được để trống");
      return;
    }

    if (data.status === "") {
      toast.error("Vui lòng chọn tình trạng");
      return;
    }

    await addCategory(
      {
        name: data.name.trim(),
        status: Number(data.status),
      },
      orderedFiles[0],
    );

    setData({
      name: "",
      status: "",
    });
    clearImages();
  };

  return (
    <>
      <div className="py-[30px] sm:px-[25px] px-[15px] h-auto">
        <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
          <h2 className="text-neutral">Thêm danh mục</h2>

          <div className="flex gap-[25px] w-full flex-col">
            <div className="md:p-[25px] p-[15px] bg-white rounded-md w-full">
              <InputImage
                InputId="img-category"
                previewImages={previewImages}
                onPreviewImage={handlePreviewImage}
                onRemovePreviewImage={handleRemovePreviewImage}
                onReorderImages={handleReorder}
                blockIndex={0}
              />
            </div>

            <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[15px] w-full">
              <h5 className="font-bold text-neutral">Thông tin chung</h5>

              <div className="flex flex-col gap-1">
                <Label htmlFor="" className="text-[0.9rem] font-medium">
                  Tên
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-gray-400  "
                />
              </div>

              <div className="flex flex-col gap-1">
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
          </div>

          <div className="flex justify-center gap-6">
            <Button
              disabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-success text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              {isLoading ? "Đang thêm..." : "Thêm"}
            </Button>
            <Link
              to="/admin/categories"
              className="p-[6px_10px] bg-danger text-white text-[0.9rem] text-center rounded-sm"
            >
              Trở về
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCategory;
