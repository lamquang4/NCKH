import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import Pagination from "../Pagination";
import Image from "../../Image";
import Loading from "../../Loading";
import InputSearch from "../InputSearch";
import { Link } from "react-router-dom";
import FilterDropDownMenu from "../FilterDropDownMenu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { mockBrands } from "../../../mocks/mockBrands";
import ListHeader from "../list/ListHeader";
import ListBody from "../list/ListBody";
function BrandList() {
  const brands = mockBrands;
  const isLoading = false;
  const totalItems = brands.length;

  const array = [
    {
      name: "Tất cả",
      value: null,
    },
    {
      name: "Hiện",
      value: 1,
    },
    {
      name: "Ẩn",
      value: 0,
    },
  ];

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }
  };
  return (
    <>
      <ListHeader title="Danh mục" totalItems={totalItems} />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]">Tên</th>
              <th className="p-[1rem] relative">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={array}
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
                    {brand.status === 1
                      ? "Hiện"
                      : brand.status === 0
                        ? "Ẩn"
                        : ""}
                  </td>

                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <button
                        disabled={isLoading}
                        onClick={() =>
                          handleUpdateStatus(
                            brand.id || "",
                            brand.status === 1 ? 0 : 1,
                          )
                        }
                      >
                        {brand.status === 1 ? (
                          <FaRegEyeSlash size={22} className="text-[#74767d]" />
                        ) : (
                          <MdOutlineRemoveRedEye
                            size={22}
                            className="text-[#74767d]"
                          />
                        )}
                      </button>

                      <Link to={`/admin/edit-brand/${brand.id}`}>
                        <LiaEdit size={22} className="text-[#076ffe]" />
                      </Link>

                      <button
                        disabled={isLoading}
                        onClick={() => handleDelete(brand.id || "")}
                      >
                        <VscTrash size={22} className="text-[#d9534f]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      source={"/assets/notfound1.png"}
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
      </ListBody>

      <Pagination
        totalPages={1}
        currentPage={1}
        limit={12}
        totalItems={totalItems}
      />
    </>
  );
}

export default BrandList;
