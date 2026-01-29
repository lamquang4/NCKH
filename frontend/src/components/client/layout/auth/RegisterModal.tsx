import { memo, useState } from "react";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

type Props = {
  onClose: () => void;
  onSwitchLogin: () => void;
};

function RegisterModal({ onClose, onSwitchLogin }: Props) {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-99 flex items-center justify-center overflow-y-auto text-black">
      <div className="px-[15px] w-full">
        <div className="relative w-full max-w-md mx-auto pointer-events-auto">
          <div className="relative p-[25px_15px] bg-white space-y-[15px] rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="uppercase">Đăng ký</h4>

              <button
                onClick={onClose}
                type="button"
                className="bg-transparent ms-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x-icon lucide-x w-4"
                  viewBox="5 5 14 14"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <hr className="border-gray-300" />

            <form className="space-y-[15px]" onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-[5px]">
                  <label htmlFor="" className="block text-[0.9rem] font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                    placeholder="Nhập email"
                    required
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-[5px]">
                    <div className="flex justify-between items-center">
                      <label className="block text-[0.9rem] font-medium">
                        Nhập mã OTP
                      </label>

                      <button
                        type="button"
                        className="text-[0.9rem] text-gray-500 p-0"
                      >
                        Gửi lại mã
                      </button>
                    </div>

                    <input
                      type="text"
                      name="otp"
                      maxLength={6}
                      value={data.otp}
                      onChange={handleChange}
                      placeholder="Nhập mã OTP"
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      required
                    />
                  </div>

                  <div className="space-y-[5px]">
                    <label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={data.fullname}
                      onChange={handleChange}
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div className="space-y-[5px]">
                    <label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="number"
                      name="phone"
                      inputMode="numeric"
                      value={data.phone}
                      onChange={handleChange}
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div className="space-y-[5px]">
                    <label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Mật khẩu
                    </label>

                    <div className="relative">
                      <input
                        type={!showPassword ? "password" : "text"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        className="text-[0.9rem] block w-full  px-3 pr-12 py-2 border border-gray-200"
                        required
                      />

                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={toggleShowPassword}
                      >
                        {!showPassword ? (
                          <HiOutlineEye size={22} />
                        ) : (
                          <HiOutlineEyeOff size={22} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setData({
                          fullname: "",
                          email: "",
                          password: "",
                          phone: "",
                          otp: "",
                        });
                      }}
                      className="text-[0.9rem] text-blue-400 font-medium"
                    >
                      Trở về
                    </button>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white focus:outline-none font-semibold rounded-sm uppercase text-[0.9rem] px-5 py-2.5 text-center"
              >
                Đăng kí
              </button>

              <p className="flex gap-1.5 justify-center font-medium">
                Bạn đã có tài khoản?
                <button
                  type="button"
                  onClick={onSwitchLogin}
                  className="text-blue-500 font-medium"
                >
                  Đăng nhập
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RegisterModal);
