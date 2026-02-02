import axios from "axios";
import { useState } from "react";

export function useSendRegisterOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const sendRegisterOTP = async (email: string) => {
    if (!email) {
      return;
    }
    setIsLoading(true);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/auth/otp?email=${email}`;
      await axios.post(url);
    } catch (err: any) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRegisterOTP, isLoading };
}
