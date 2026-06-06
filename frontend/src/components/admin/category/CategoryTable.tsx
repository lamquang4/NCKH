import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteCategory from "../../../hooks/admin/category/useDeleteCategory";
import useUpdateStatusCategory from "../../../hooks/admin/category/useUpdateStatusCategory";
import Button from "../../ui/Button";
import { CATEGORY_STATUS_OPTIONS } from "../../../constants/filterOptions";
import type { CategoryResponse } from "../../../types/type";

type Props = {
  categories: CategoryResponse[];
  isLoading: boolean;
};

function CategoryTable({ categories, isLoading }: Props) {
  const { deleteCategory, isLoading: isLoadingDelete } = useDeleteCategory();
  const { updateStatusCategory, isLoading: isLoadingUpdate } =
    useUpdateStatusCategory();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteCategory(id);
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }

    await updateStatusCategory(id, status);
  };
  return (
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]">Hình ảnh</th>
          <th className="p-[1rem]">Tên</th>
          <th className="p-[1rem] relative">
            <FilterDropDownMenu
              title="Tình trạng"
              array={CATEGORY_STATUS_OPTIONS}
              paramName="status"
            />
          </th>
          <th className="p-[1rem]">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8} className="w-full">
              <Loading height={60} size={50} color="black" thickness={2} />
            </td>
          </tr>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <tr key={category.id} className="hover:bg-[#f2f3f8]">
              <td className="p-[1rem]">
                <div className="relative group w-[80px] h-[80px] overflow-hidden">
                  <Image
                    src={`${category.image}`}
                    alt={category.name}
                    className={"w-full h-full object-contain z-1 relative"}
                    loading="lazy"
                  />
                </div>
              </td>
              <td className="p-[1rem] font-semibold">{category.name}</td>

              <td className="p-[1rem]  ">
                {category.status === 1
                  ? "Hiện"
                  : category.status === 0
                    ? "Ẩn"
                    : ""}
              </td>

              <td className="p-[1rem]  ">
                <div className="flex items-center gap-[15px]">
                  <Button
                    disabled={isLoadingUpdate}
                    onClick={() =>
                      handleUpdateStatus(
                        category.id || "",
                        category.status === 1 ? 0 : 1,
                      )
                    }
                  >
                    {category.status === 1 ? (
                      <FaRegEyeSlash size={22} className="text-neutral" />
                    ) : (
                      <MdOutlineRemoveRedEye
                        size={22}
                        className="text-neutral"
                      />
                    )}
                  </Button>

                  <Link to={`/admin/edit-category/${category.id}`}>
                    <LiaEdit size={22} className="text-info" />
                  </Link>

                  <Button
                    disabled={isLoadingDelete}
                    onClick={() => handleDelete(category.id || "")}
                  >
                    <VscTrash size={22} className="text-danger" />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8} className="w-full h-[70vh]">
              <div className="flex justify-center items-center">
                <Image
                  src={"/assets/notfound1.webp"}
                  alt={""}
                  className={"w-[135px]"}
                  loading="lazy"
                />
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CategoryTable;
