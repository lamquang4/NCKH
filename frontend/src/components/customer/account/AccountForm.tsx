import { useEffect, useState } from "react";
import useGetAccount from "../../../hooks/auth/useGetAccount";
import { validatePhone } from "../../../utils/validatePhone";
import toast from "react-hot-toast";
import useUpdateCustomer from "../../../hooks/customer/useUpdateCustomer";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Label from "../../ui/Label";

function AccountForm() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: null as number | null,
  });

  const { account } = useGetAccount("CUSTOMER");
  const { updateCustomer, isLoading } = useUpdateCustomer();

  useEffect(() => {
    if (account) {
      setData({
        fullname: account.fullname || "",
        email: account.email || "",
        phone: account.phone || "",
        birthDate: account.birthDate || "",
        gender: account.gender ?? null,
      });
    }
  }, [account]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "gender" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(data.phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    await updateCustomer({
      fullname: data.fullname.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      gender: data.gender,
      birthDate: data.birthDate,
    });
    setData((prev) => ({
      ...prev,
      password: "",
    }));
  };

  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
          <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Họ tên:
              </Label>
              <Input
                type="text"
                name="fullname"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={data?.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Email:
              </Label>
              <Input
                type="text"
                name="email"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={data?.email}
                isReadOnly={true}
              />
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-[15px]">
            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Sinh nhật
              </Label>
              <Input
                type="date"
                name="birthDate"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300 focus:outline-0"
                value={data.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Số điện thoại:
              </Label>
              <Input
                type="text"
                name="phone"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300 focus:outline-0"
                value={data?.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-[5px]">
            <Label
              htmlFor=""
              className="block text-left text-[0.9rem] font-medium"
            >
              Giới tính
            </Label>

            <div className="flex items-center gap-[25px]">
              <Label className="flex items-center gap-[6px] cursor-pointer">
                <Input
                  type="radio"
                  name="gender"
                  className="scale-140 accent-primary"
                  value={1}
                  checked={data.gender === 1}
                  onChange={handleChange}
                />
                <span className="text-[0.9rem]">Nam</span>
              </Label>

              <Label className="flex items-center gap-[6px] cursor-pointer">
                <Input
                  type="radio"
                  name="gender"
                  className="scale-140 accent-primary"
                  value={0}
                  checked={data.gender === 0}
                  onChange={handleChange}
                />
                <span className="text-[0.9rem]">Nữ</span>
              </Label>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              isDisabled={isLoading}
              type="submit"
              className="p-[6px_10px] bg-primary text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
