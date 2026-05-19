import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import useGetAdmins from "../../../hooks/admin/user/useGetAdmins";
import AdminTable from "./AdminTable";

function AdminList() {
  const { admins, isLoading, totalItems, totalPages, limit, currentPage } =
    useGetAdmins();

  return (
    <>
      <ListHeader
        title="Quản trị viên"
        totalItems={totalItems}
        addLink="/admin/add-admin"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <AdminTable admins={admins} isLoading={isLoading} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default AdminList;
