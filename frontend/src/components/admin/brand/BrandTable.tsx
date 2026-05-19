import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDeleteBrand from "../../../hooks/admin/brand/useDeleteBrand";
import useUpdateStatusBrand from "../../../hooks/admin/brand/useUpdateStatusBrand";
import Button from "../../ui/Button";
import { BRAND_STATUS_OPTIONS } from "../../../constants/filterOptions";
import type { BrandResponse } from "../../../types/type";

type Props = {
  brands: BrandResponse[];
  isLoading: boolean;
};

function BrandTable({ brands, isLoading }: Props) {
  const { deleteBrand, isLoading: isLoadingDelete } = useDeleteBrand();
  const { updateStatusBrand, isLoading: isLoadingUpdate } =
    useUpdateStatusBrand();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteBrand(id);
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }

    await updateStatusBrand(id, status);
  };
  return (
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]">Tên</th>
          <th className="p-[1rem] relative">
            <FilterDropDownMenu
              title="Tình trạng"
              array={BRAND_STATUS_OPTIONS}
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
        ) : brands.length > 0 ? (
          brands.map((brand) => (
            <tr key={brand.id} className="hover:bg-[#f2f3f8]">
              <td className="p-[1rem] font-semibold">{brand.name}</td>

              <td className="p-[1rem]  ">
                {brand.status === 1 ? "Hiện" : brand.status === 0 ? "Ẩn" : ""}
              </td>

              <td className="p-[1rem]  ">
                <div className="flex items-center gap-[15px]">
                  <Button
                    disabled={isLoadingUpdate}
                    onClick={() =>
                      handleUpdateStatus(
                        brand.id || "",
                        brand.status === 1 ? 0 : 1,
                      )
                    }
                  >
                    {brand.status === 1 ? (
                      <FaRegEyeSlash size={22} className="text-neutral" />
                    ) : (
                      <MdOutlineRemoveRedEye
                        size={22}
                        className="text-neutral"
                      />
                    )}
                  </Button>

                  <Link to={`/admin/edit-brand/${brand.id}`}>
                    <LiaEdit size={22} className="text-info" />
                  </Link>

                  <Button
                    disabled={isLoadingDelete}
                    onClick={() => handleDelete(brand.id || "")}
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
                  source={"/assets/notfound1.webp"}
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

export default BrandTable;
