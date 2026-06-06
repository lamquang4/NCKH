import { VscTrash } from "react-icons/vsc";
import { LiaEdit } from "react-icons/lia";
import { TbLock, TbLockOpen } from "react-icons/tb";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";
import useDeleteAdmin from "../../../hooks/admin/user/useDeleteAdmin";
import toast from "react-hot-toast";
import useGetAccount from "../../../hooks/auth/useGetAccount";
import useUpdateStatusUser from "../../../hooks/admin/user/useUpdateStatusUser";
import Button from "../../ui/Button";
import { USER_STATUS_OPTIONS } from "../../../constants/filterOptions";
import type { UserResponse } from "../../../types/type";

type Props = {
  admins: UserResponse[];
  isLoading: boolean;
};

function AdminTable({ admins, isLoading }: Props) {
  const { account } = useGetAccount("ADMIN");

  const { deleteAdmin, isLoading: isLoadingDelete } = useDeleteAdmin();
  const { updateStatusUser, isLoading: isLoadingUpdate } =
    useUpdateStatusUser();

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    if (id === account?.id) {
      toast.error("Bạn không thể xóa chính tài khoản của mình");
      return;
    }

    await deleteAdmin(id);
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    if (!id && !status) {
      return;
    }

    if (Number(status) === 0 && id === account?.id) {
      toast.error("Bạn không thể khóa chính tài khoản của mình");
      return;
    }

    await updateStatusUser(id, status);
  };

  return (
    <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
      <thead>
        <tr className="bg-[#E9EDF2] text-left">
          <th className="p-[1rem]">Họ tên</th>

          <th className="p-[1rem]">Email</th>

          <th className="p-[1rem]">
            <FilterDropDownMenu
              title="Tình trạng"
              array={USER_STATUS_OPTIONS}
              paramName="status"
            />
          </th>
          <th className="p-[1rem]  ">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={8} className="w-full">
              <Loading height={60} size={50} color="black" thickness={2} />
            </td>
          </tr>
        ) : admins.length > 0 ? (
          admins.map((admin) => (
            <tr key={admin.id} className="hover:bg-[#f2f3f8]">
              <td className="p-[1rem] text-[0.9rem] font-semibold">
                {admin.fullname}
              </td>
              <td className="p-[1rem]  ">{admin.email}</td>

              <td className="p-[1rem]  ">
                {admin.status === 1 ? "Bình thường" : "Bị khóa"}
              </td>
              <td className="p-[1rem]  ">
                <div className="flex items-center gap-[15px]">
                  <Button
                    disabled={isLoadingUpdate}
                    onClick={() =>
                      handleUpdateStatus(
                        admin.id || "",
                        admin.status === 1 ? 0 : 1,
                      )
                    }
                  >
                    {admin.status === 1 ? (
                      <TbLock size={22} className="text-neutral" />
                    ) : (
                      <TbLockOpen size={22} className="text-neutral" />
                    )}
                  </Button>

                  <Link to={`/admin/edit-admin/${admin.id}`}>
                    <LiaEdit size={22} className="text-info" />
                  </Link>

                  <Button
                    disabled={isLoadingDelete}
                    onClick={() => handleDelete(admin.id || "")}
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

export default AdminTable;
