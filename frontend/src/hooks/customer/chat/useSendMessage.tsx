import axios from "axios";
import { useState } from "react";
import type { MessageRequest } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = async (data: MessageRequest) => {
    if (!data) {
      return;
    }
    setIsLoading(true);
    try {
      const token = getCookie("token-customer");

      const url = `${import.meta.env.VITE_BACKEND_URL}/assistant/chat`;
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("Lỗi:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
