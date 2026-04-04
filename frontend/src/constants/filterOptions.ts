export const COMMON_ALL_OPTION = {
  name: "Tất cả",
  value: null,
};

export const USER_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  { name: "Bình thường", value: 1 },
  { name: "Bị khóa", value: 0 },
];

export const BRAND_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  {
    name: "Hiện",
    value: 1,
  },
  {
    name: "Ẩn",
    value: 0,
  },
];

export const CATEGORY_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  {
    name: "Hiện",
    value: 1,
  },
  {
    name: "Ẩn",
    value: 0,
  },
];

export const ORDER_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  { name: "Chờ thanh toán", value: -1 },
  { name: "Chờ xác nhận", value: 0 },
  { name: "Xác nhận", value: 1 },
  { name: "Đang giao", value: 2 },
  { name: "Giao thành công", value: 3 },
  { name: "Đã hủy", value: 4 },
  { name: "Trả hàng", value: 5 },
];

export const PAYMENT_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  { name: "Thành công", value: 1 },
  { name: "Hoàn tiền", value: 0 },
];

export const PRODUCT_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  {
    name: "Hiện",
    value: 1,
  },
  {
    name: "Ẩn",
    value: 0,
  },
];
