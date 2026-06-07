import { memo, useState } from "react";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import useRegister from "../../../hooks/auth/useRegister";
import { useSendRegisterOTP } from "../../../hooks/auth/useSendRegisterOtp";
import toast from "react-hot-toast";
import { validateEmail } from "../../../utils/validateEmail";
import { validatePhone } from "../../../utils/validatePhone";
import Loading from "../../ui/Loading";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { validateOtp } from "../../../utils/validateOtp";
import OtpBox from "./OtpBox";
import { OTP_LENGTH } from "../../../constants/otp";
import Overplay from "../../ui/Overplay";
import Label from "../../ui/Label";
import { LuX } from "react-icons/lu";

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
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { handleRegister, isLoading } = useRegister();
  const { sendRegisterOTP, isLoading: isLoadingSendResetOTP } =
    useSendRegisterOTP();

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

    if (step === 1) {
      if (!validateEmail(data.email)) {
        toast.error("Email không hợp lệ");
        return;
      }

      try {
        await sendRegisterOTP(data.email.trim());
        setStep(2);
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      if (!validateOtp(otp, OTP_LENGTH)) {
        toast.error("Mã OTP không hợp lệ");
        return;
      }

      if (!validatePhone(data.phone)) {
        toast.error("Số điện thoại không hợp lệ");
        return;
      }

      if (data.password.length < 6) {
        toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }

      await handleRegister(
        {
          fullname: data.fullname.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone.trim(),
          password: data.password.trim(),
        },
        otp.trim(),
      );

      onClose();
      onSwitchLogin();

      setData({
        fullname: "",
        email: "",
        password: "",
        phone: "",
      });

      setOtp("");
    }
  };

  const handleSendOTP = async () => {
    if (!validateEmail(data.email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    await sendRegisterOTP(data.email.trim());
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-99 flex items-center justify-center overflow-y-auto">
        <div className="relative w-full max-w-md mx-auto pointer-events-auto">
          <div className="relative p-[25px_15px] bg-white space-y-[15px] rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="uppercase">Đăng ký</h4>

              <Button
                onClick={onClose}
                type="button"
                className="bg-transparent ms-auto"
              >
                <LuX size={24} />
              </Button>
            </div>

            <hr className="border-gray-300" />

            <form className="space-y-[15px]" onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-[5px]">
                  <Label htmlFor="" className="block text-[0.9rem] font-medium">
                    Email
                  </Label>
                  <Input
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
                  <OtpBox
                    value={otp}
                    onChange={setOtp}
                    onResend={handleSendOTP}
                  />

                  <div className="space-y-[5px]">
                    <Label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Họ và tên
                    </Label>
                    <Input
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
                    <Label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Số điện thoại
                    </Label>
                    <Input
                      type="number"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      className="text-[0.9rem] block w-full px-3 py-2 border border-gray-200"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>

                  <div className="space-y-[5px]">
                    <Label
                      htmlFor=""
                      className="block text-[0.9rem] font-medium"
                    >
                      Mật khẩu
                    </Label>

                    <div className="relative">
                      <Input
                        type={!showPassword ? "password" : "text"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        className="text-[0.9rem] block w-full  px-3 pr-12 py-2 border border-gray-200"
                        required
                      />

                      <Button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral"
                        onClick={toggleShowPassword}
                      >
                        {!showPassword ? (
                          <HiOutlineEye size={22} />
                        ) : (
                          <HiOutlineEyeOff size={22} />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setData({
                          fullname: "",
                          email: "",
                          password: "",
                          phone: "",
                        });
                        setOtp("");
                      }}
                      className="text-[0.9rem] text-primary font-medium"
                    >
                      Trở về
                    </Button>
                  </div>
                </>
              )}

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary text-white focus:outline-none font-semibold rounded-sm uppercase text-[0.9rem] px-5 py-2.5 text-center"
              >
                Đăng kí
              </Button>

              <p className="flex gap-1.5 justify-center font-medium">
                Bạn đã có tài khoản?
                <Button
                  type="button"
                  onClick={onSwitchLogin}
                  className="text-primary font-medium"
                >
                  Đăng nhập
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {(isLoading || isLoadingSendResetOTP) && (
        <Overplay className="z-99 xl:hidden">
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </>
  );
}

export default memo(RegisterModal);
