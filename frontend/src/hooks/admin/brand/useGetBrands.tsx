import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import type { ApiResponse, BrandResponse } from "../../../types/type";
import { getCookie } from "../../../utils/cookieUtil";

export default function useGetBrands() {
  const [searchParams] = useSearchParams();
  const token = getCookie("token-admin");

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);
  const q = searchParams.get("q");
  const status = searchParams.get("status");

  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  if (q) query.set("q", q || "");
  if (status) query.set("status", status.toString());

  const url = `${import.meta.env.VITE_BACKEND_URL}/brand?${query.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<
    ApiResponse<BrandResponse[]>
  >(
    token ? [url, token] : null,
    ([url, token]) =>
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data),
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  return {
    brands: data?.data ?? [],
    totalPages: data?.totalPages || 1,
    totalItems: data?.total || 0,
    currentPage: page,
    limit,
    isLoading,
    error,
    mutate,
  };
}
