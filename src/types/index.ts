export const KEY = "access-token";

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
  totalStocks: number;
  orderQty: number;
  orderSize: string;
  sizes: string[];
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
  size?: string;
  quantity: number;
}

export interface OrderData {
  userId?: string;
  shippingCity: string;
  shippingAddress: string;
  phone: string;
  altPhone?: string;
  totalCost: number;
  orderNote?: string;
  items: OrderItem[];
}
