export const KEY = "alwan-user-access-token";

export interface IResponseData {
  status: number;
  success: boolean;
  data: any;
}

export interface IResponse {
  data: IResponseData;
}

export type IErrorMessage = {
  path: string | number;
  message: string;
};

export type IErrorResponse = {
  data: {
    statusCode: number;
    message: string;
    errorMessages: IErrorMessage[];
    success: boolean;
  };
};

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
  parentId: string;
  firstTitle: string;
  secondTitle: string;
  isOnHomePage: boolean;
  isNavigational: boolean;
  isLeaf: boolean;
}

export interface IReadCategory {
  id: string;
  name: string;
  imageUrl: string;
  isLeaf: boolean;
  isNavigational: boolean;
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
  manufacturingCost: number;
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
  manufacturingCost: number;
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
  category: IReadCategory;
  productTypeId: string;
  couponEligible: boolean;
  freeShippingAvailable: boolean;
  isNewArrival: boolean;
  sku: string;
  stockStatus: "AVAILABLE" | "OUT_OF_STOCK";
  availabilityTag: string;
  sizeVariants: IReadSizeVariant[];
  reviews: IReview[];
  createdAt: string;
}

export interface ProductWithDetails {
  id: string;
  product: {
    id: string;
    name: string;
    brand: string;
    description: string[];
    features: string[];
    imageUrls: string[];
    categoryId: string;
    productTypeId: string;
    isCouponApplicable: boolean;
  };
  size?: { name: string };
  color?: { name: string; hexCode: string };
  quantity: number;
  discountedPrice: number;
  itemStatus:
    | "PROCESSING"
    | "ONTHEWAY"
    | "DELIVERED"
    | "REQUESTTORETURN"
    | "RETURNED";
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
  couponEligible: boolean;
  freeShippingAvailable: boolean;
  isNewArrival: boolean;
  sku: string;
  stockStatus: "AVAILABLE" | "OUT_OF_STOCK";
  availabilityTag: string;
  sizeVariants: IReadSizeVariant[];
  orderColor: string;
  orderColorId: string;
  reviews: any[];
  orderSize: string;
  orderSizeId: string;
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
  quantity: number;
  sizeId: string;
  colorId: string;
}

export interface OrderData {
  userId?: string;
  userName?: string;
  email?: string;
  address: {
    division?: string;
    district?: string;
    upazila?: string;
    union?: string;
    streetAddress?: string;
  };
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
  id: string;
  isDefault: boolean;
  label: "HOME" | "OFFICE";
  recipientName: string;
  phone: string;
  altPhone?: string;
  division: string;
  divisionId: string;
  district: string;
  districtId: string;
  upazila: string;
  upazilaId: string;
  union: string;
  unionId: string;
  streetAddress: string;
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

export interface HomePageText {
  id: string;
  title: string;
  text: string[];
  buttonText: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  parentId: string | null;
  isNavigational: boolean;
  isLeaf: boolean;
  firstTitle: string;
  secondTitle: string;
  isOnHomePage: boolean;
  parent?: Category | null;
  subCategories?: Category[];
  homePageTexts: HomePageText[];
  createdAt: string;
  updatedAt: string;
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
  recipientName: string;
  email: string;
  phone: string;
  altPhone: string;
  division: string;
  divisionId: string;
  district: string;
  districtId: string;
  upazila: string;
  upazilaId: string;
  union: string;
  unionId: string;
  streetAddress: string;
  label: "HOME" | "OFFICE";
}

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
}
