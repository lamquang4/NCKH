import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from "../../ui/Image";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";
import useDeleteProduct from "../../../hooks/admin/product/useDeleteProduct";
import useUpdateStatusProduct from "../../../hooks/admin/product/useUpdateStatusProduct";
import Button from "../../ui/Button";
import { PRODUCT_STATUS_OPTIONS } from "../../../constants/filterOptions";
import type { ProductListItemResponse } from "../../../types/type";

interface Props {
  products: ProductListItemResponse[];
  isLoading: boolean;
}

function ProductTable({ products, isLoading }: Props) {
  const { deleteProduct, isLoading: isLoadingDelete } = useDeleteProduct();
  const { updateStatusProduct, isLoading: isLoadingUpdate } =
    useUpdateStatusProduct();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    await deleteProduct(id);
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }

    await updateStatusProduct(id, status);
  };
  return (
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]">Sản phẩm</th>
          <th className="p-[1rem]">Giá bán</th>
          <th className="p-[1rem]">Số lượng</th>
          <th className="p-[1rem]">Danh mục</th>
          <th className="p-[1rem]">Thương hiệu</th>
          <th className="p-[1rem] relative">
            <FilterDropDownMenu
              title="Tình trạng"
              array={PRODUCT_STATUS_OPTIONS}
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
        ) : products.length > 0 ? (
          products.map((product) => {
            return (
              <tr key={product.id} className="hover:bg-[#f2f3f8]">
                <td className="p-[1rem] font-semibold">
                  <div className="flex gap-[10px] items-center">
                    <div className="relative group w-[80px] h-[80px] overflow-hidden">
                      {product.images?.[0]?.image && (
                        <Image
                          src={`${product.images[0].image}`}
                          alt={product.name}
                          className={
                            "w-full h-full object-contain z-1 relative"
                          }
                          loading="lazy"
                        />
                      )}
                    </div>

                    <p>{product.name}</p>
                  </div>
                </td>

                <td className="p-[1rem]  ">
                  {product.discount > 0 ? (
                    <div className="flex gap-[12px]  ">
                      <del className="text-[#707072] text-[1rem]">
                        {product.price.toLocaleString("vi-VN")}₫
                      </del>

                      <p className="font-medium text-danger">
                        {(product.price - product.discount).toLocaleString(
                          "vi-VN",
                        )}
                        ₫
                      </p>
                    </div>
                  ) : (
                    <p className="font-medium text-danger">
                      {product.price.toLocaleString("vi-VN")}₫
                    </p>
                  )}
                </td>

                <td className="p-[1rem]  ">
                  <div className="flex flex-col gap-1.5">
                    <p>Hiện có: {product.stock}</p>

                    <p>Đã bán: {product.totalSold}</p>
                  </div>
                </td>

                <td className="p-[1rem]  ">{product.categoryName}</td>
                <td className="p-[1rem]  ">{product.brandName}</td>

                <td className="p-[1rem]  ">
                  {product.status === 1
                    ? "Hiện"
                    : product.status === 0
                      ? "Ẩn"
                      : ""}
                </td>

                <td className="p-[1rem]  ">
                  <div className="flex items-center gap-[15px]">
                    <Button
                      disabled={isLoadingUpdate}
                      onClick={() =>
                        handleUpdateStatus(
                          product.id || "",
                          product.status === 1 ? 0 : 1,
                        )
                      }
                    >
                      {product.status === 1 ? (
                        <FaRegEyeSlash size={22} className="text-neutral" />
                      ) : (
                        <MdOutlineRemoveRedEye
                          size={22}
                          className="text-neutral"
                        />
                      )}
                    </Button>
                    <Link to={`/admin/edit-product/${product.id}`}>
                      <LiaEdit size={22} className="text-info" />
                    </Link>
                    <Button
                      disabled={isLoadingDelete}
                      onClick={() => handleDelete(product.id || "")}
                    >
                      <VscTrash size={22} className="text-danger" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })
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

export default ProductTable;
