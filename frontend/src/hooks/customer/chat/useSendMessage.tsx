import axios from "axios";
import { useState } from "react";
import type { MessageRequest, MessageResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";
import toast from "react-hot-toast";
import useGetChatMessages from "./useGetChatMessages";
import useGetCart from "../cart/useGetCart";

export default function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetChatMessages();
  const { mutate: mutateCart } = useGetCart();

  const sendMessage = async (data: MessageRequest) => {
    const token = getCookie("token-customer");
    if (!data || !token) return;

    const optimisticAssistantMessage: MessageResponse = {
      chatId: "ABC",
      id: `assistant-temp-${Date.now()}`,
      content: "Trợ lý ảo đang phản hồi...",
      role: "ASSISTANT",
      createdAt: new Date().toISOString(),
      products: [],
    };

    const optimisticMessage: MessageResponse = {
      chatId: "ABC",
      id: `temp-${Date.now()}`,
      content: data.content,
      role: "USER",
      createdAt: new Date().toISOString(),
      products: [],
    };

    setIsLoading(true);
    const url = `${import.meta.env.VITE_BACKEND_URL}/assistant/chat`;

    try {
      await mutate(
        axios
          .post(url, data, { headers: { Authorization: `Bearer ${token}` } })
          .then(() => undefined),
        {
          optimisticData: (currentPages) => {
            if (!currentPages) {
              throw new Error("Chưa tải được dữ liệu chat.");
            }
            const updatedPages = [...currentPages];
            updatedPages[0] = {
              ...updatedPages[0],
              data: [
                optimisticAssistantMessage,
                optimisticMessage,
                ...updatedPages[0].data,
              ],
            };
            return updatedPages;
          },
          rollbackOnError: true,
          populateCache: false,
          revalidate: true,
        },
      );

      const content = data.content.toLowerCase();
      if (content.includes("thêm") && content.includes("giỏ hàng")) {
        await mutateCart();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
