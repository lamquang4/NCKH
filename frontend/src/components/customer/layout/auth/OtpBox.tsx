import { useEffect, useRef, useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { OTP_LENGTH, OTP_EXPIRE_SECONDS } from "../../../../constants/otp";
import { validateOtp } from "../../../../utils/validateOtp";

type Props = {
  value: string;
  onChange: (otp: string) => void;
  onResend: () => void;
};

function OtpBox({ value, onChange, onResend }: Props) {
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value
    .split("")
    .concat(Array(OTP_LENGTH).fill(""))
    .slice(0, OTP_LENGTH);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    onChange(newDigits.join(""));

    if (val && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!validateOtp(pasted, OTP_LENGTH)) return;

    onChange(pasted);
    inputRefs.current[OTP_LENGTH - 1]?.focus();
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    await onResend();
    onChange("");
    setTimeLeft(OTP_EXPIRE_SECONDS);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-center">
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            maxLength={1}
            className={`w-[50px] h-[50px] text-center text-[0.95rem] font-semibold border rounded-md outline-none transition-colors
                          ${digit ? "border-primary text-primary" : "border-gray-300"}
                          focus:border-primary`}
          />
        ))}
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Button
          className={` text-[0.9rem] font-medium ${timeLeft <= 0 ? "text-primary" : "text-neutral"}`}
          type="button"
          disabled={timeLeft > 0}
          onClick={handleResend}
        >
          Gửi lại mã
        </Button>

        <span>
          {timeLeft > 0
            ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
            : "Có thể gửi lại OTP"}
        </span>
      </div>
    </div>
  );
}

export default OtpBox;
