import { useEffect, useState } from "react";
import { mockUsers } from "../../../mocks/mockUsers";

function AccountForm() {
  const user = mockUsers[0];

  const [data, setData] = useState({
    fullname: "",
    phone: "",
    birthDate: "",
    gender: null as number | null,
  });

  useEffect(() => {
    if (user) {
      setData({
        fullname: user.fullname || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        gender: user.gender ?? null,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "gender" ? Number(value) : value,
    }));
  };

  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <form className="flex flex-col gap-[15px]">
          <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
            <div className="space-y-[5px] w-full">
              <label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Họ tên:
              </label>
              <input
                type="text"
                name="fullname"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={user?.fullname || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-[5px] w-full">
              <label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={user?.email || ""}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
            <div className="space-y-[5px] w-full">
              <label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Sinh nhật
              </label>
              <input
                type="date"
                name="birthDate"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300 focus:outline-0"
                value={user?.birthDate || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-[5px] w-full">
              <label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Số điện thoại:
              </label>
              <input
                type="text"
                name="phone"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300 focus:outline-0"
                value={user?.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-[5px]">
            <label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Giới tính
            </label>

            <div className="flex items-center gap-[25px]">
              <label className="flex items-center gap-[6px] cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  className="scale-140 accent-blue-500"
                  value={1}
                  checked={data.gender === 1}
                  onChange={handleChange}
                />
                <span className="text-[0.9rem]">Nam</span>
              </label>

              <label className="flex items-center gap-[6px] cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  className="scale-140 accent-blue-500"
                  value={0}
                  checked={data.gender === 0}
                  onChange={handleChange}
                />
                <span className="text-[0.9rem]">Nữ</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="p-[6px_10px] bg-blue-500 text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
