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

export interface IReadCarousel {
  id: string;
  fileUrls: string[];
  createdAt: string;
  updatedAt: string;
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

export interface IReview {
  id: string;
  rating: number;
  content: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
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
  colorId: string;
  color: IReadColor;
  sizeId: string;
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
  reviews: IReview[];
  createdAt: string;
}

export interface IUserCartProduct {
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
  orderColor: string;
  reviews: any[]; //! i will fix this later
  orderSize: string;
  orderQty: number;
  orderHexCode: string;
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
  userName?: string;
  email?: string;
  division?: string;
  district?: string;
  upazila?: string;
  union?: string;
  streetAddress?: string;
  phone: string;
  altPhone?: string;
  totalCost: number;
  shippingCost: number;
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

export interface IOrderItem {
  id: string;
  sizeId: string;
  quantity: number;
  returnQuantity: number;
  itemStatus:
    | "PROCESSING"
    | "ONTHEWAY"
    | "DELIVERED"
    | "REQUESTTORETURN"
    | "RETURNED";
  returnNote: string;
  returnReasene: string;
  orderId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface IOrderResponseData {
  id: string;
  userName: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
  totalCost: number;
  phone: string;
  altPhone: string | null;
  couponId: string | null;
  orderNotes: string | null;
  userId: string;
  orderStatus: "ACTIVE" | "CANCELLED";
  shippingMethod: "CASH_ON_DELIVERY" | "ONLINE_PAYMENT";
  shippingCost: number;
  createdAt: Date;
  updatedAt: Date;
  items: IOrderItem[];
}

export interface IOrderResponse {
  status: number;
  success: boolean;
  message: string;
  data: IOrderResponseData[];
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
  name: string;
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

export interface FormValues {
  username: string;
  email: string;
  phone: string;
  altPhone: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
  orderNote?: string;
}
