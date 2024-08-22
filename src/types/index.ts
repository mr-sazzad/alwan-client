export const KEY = "alwan-user-access-token";

export interface IMeta {
  total: number;
  page: number;
  size: number;
}

export interface IResponseData {
  status: number;
  success: boolean;
  data: any;
}

export interface IResponse {
  data: IResponseData;
  meta?: IMeta;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface ICreateCategory {
  name: string;
  file: File;
  clientUrl: string;
  parentId: string;
  firstTitle: string;
  secondTitle: string;
  isOnHomePage: boolean;
}

export interface IReadCategory {
  id: string;
  name: string;
  imageUrl: string;
  clientUrl: string;
  parentId: string;
  firstTitle: string;
  secondTitle: string;
  isOnHomePage: boolean;
}

export interface IReadProductType {
  id: string;
  name: string;
}

export interface imageProps {
  id: number;
  src: string;
  alt: string;
}

export interface ICoupon {
  id: string;
  code: string;
  discountPercentage: number;
  discountValue: number;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReadColor {
  id: string;
  name: string;
  hexCode: string;
}

export interface IConvertedColor {
  id: string;
  value: string;
  label: string;
}

export interface IReadSize {
  id: string;
  name: string;
}

export interface SizeVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  colorId: string;
  sizeId: string;
  createdAt: string;
  updatedAt: string;
}
export interface IReadSizeVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  color: IReadColor;
  size: IReadSize;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  name: string;
  brand: string;
  description: string[];
  features: string[];
  imageUrls: string[];
  categoryId: string;
  productTypeId: string;
  isCouponApplicable: boolean;
  isFreeDeliveryAvailable: boolean;
  status: "in_stock" | "stock_out";
  sizeVariants: IReadSizeVariant[];
  createdAt: string;
}

export interface IReview {
  id: string;
  rating: number;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
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
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
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
  product: IProduct;
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

export interface IProductCategory {
  id: string;
  title: string;
  imageUrl: string;
  subsCategories: ProductSubCategory[];
}

export interface ProductSubCategory {
  id: string;
  title: string;
  imageUrl: string;
  parentId: string;
}

export interface Category {
  id: string;
  title: string;
  imageUrl: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  parent?: Category | null;
  clientUrl: string;
  description: string | null;
  subCategories?: Category[];
}

// Addresses
export interface IDivision {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface IDistrict {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

export interface IUpazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface IUnion {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url: string;
}
