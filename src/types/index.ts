export const KEY = "alwan-user-access-token";

export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponse {
  data: any;
  meta?: IMeta;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

interface imageProps {
  id: number;
  src: string;
  alt: string;
}

export interface ITShirt {
  id: string;
  name: string;
  prices: number[];
  desc: string[];
  features: string[];
  images: string[];
  orderQty: number;
  mSizeStock: number;
  lSizeStock: number;
  xlSizeStock: number;
  xxlSizeStock: number;
  orderSize: string;
  sizes: ("M" | "L" | "XL" | "XXL")[];
  color:
    | "black"
    | "white"
    | "skyblue"
    | "gray"
    | "purple"
    | "lightgreen"
    | "multicolor";
  isFreeDeliveryAvailable: boolean;
  status: "in_stock" | "stock_out";
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface OrderData {
  userId?: string;
  username?: string;
  email?: string;
  shippingCity: string;
  shippingAddress: string;
  phone: string;
  altPhone?: string;
  totalCost: number;
  orderNote?: string;
  items: OrderItem[];
}

export interface IUserData {
  userId: string;
  userName: string;
  email: string;
  role: "User" | "Admin";
}

export interface IUserAddress {
  shippingDistrict: string;
  shippingAddress: string;
}

export interface IOrderItemResponse {
  createdAt: string;
  id: string;
  itemStatus:
    | "processing"
    | "onTheWay"
    | "delivered"
    | "requestToReturn"
    | "returned";
  orderId: string;
  product: ITShirt;
  productId: string;
  quantity: number;
  returnNote: string | null;
  returnQuantity: number;
  returnReason: string | null;
  size: "M" | "L" | "XL" | "XXL";
  updatedAt: string;
}

export interface IOrderResponse {
  altPhone: string | null;
  couponId: string;
  createdAt: string;
  email: string;
  id: string;
  items: IOrderItemResponse[];
  orderNote: string | null;
  orderStatus: "normal" | "cancelled";
  phone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingMethod: "cashOnDelivery" | "onlinePayment";
  totalCost: number;
  updatedAt: string;
  userId: string;
}
