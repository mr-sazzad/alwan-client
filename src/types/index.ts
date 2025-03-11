export const KEY = "alwan-user-token";

export interface IResponseData<T = any> {
  status: number;
  success: boolean;
  message?: string;
  data: T;
}

export interface IResponse<T = any> {
  data: IResponseData<T>;
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

export interface ILoginRes {
  statusCode: number;
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface IReadCarousel {
  id: string;
  fileUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  file: File;
  slug: string;
  imageUrl: string | null;
  parentId: string | null;
  isLeaf: boolean;
  isNavigational: boolean;
  firstTitle: string;
  secondTitle: string;
  isOnHomePage: boolean;
  parent?: ICategory | null;
  subCategories?: ICategory[];
  homePageTexts: IHomePageText[];
  createdAt: string;
  updatedAt: string;
}

export interface IHomePageText {
  id: string;
  title: string;
  text: string[];
  buttonText: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductType {
  id: string;
  name: string;
}

export interface ICoupon {
  id: string;
  code: string;
  discountPercentage: number;
  discountValue: number;
  type: "GLOBAL" | "CATEGORY" | "PRODUCT" | "DELIVERY";
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  maxUsagePerUser: number;
  minOrderValue: number;
  categories: ICategory[];
  products: IProduct[];
  Order: IOrder[];
  couponUsages: ICouponUsage[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponUsage {
  id: string;
  userId: string | null;
  email: string | null;
  couponId: string;
  usageCount: number;
  user: IUser | null;
  coupon: ICoupon;
  createdAt: string;
  updatedAt: string;
}

export interface IColor {
  id: string;
  name: string;
  hexCode: string;
  value?: string;
  label?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  id: string;
  name: string;
  sizeVariants: ISizeVariant[];
  OrderItem: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ISizeVariant {
  id: string;
  productId: string;
  price: number;
  discountedPrice: number;
  stock: number;
  colorId: string;
  color: IColor;
  sizeId: string;
  size: ISize;
  manufacturingCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  productTypeId: string;
  isNewArrival: boolean;
  features: string[];
  imageUrls: string[];
  categoryId: string;
  category: ICategory;
  sizeVariants: ISizeVariant[];
  reviews: IReview[];
  couponEligible: boolean;
  freeShippingAvailable: boolean;
  stockStatus: "AVAILABLE" | "OUT_OF_STOCK";
  availabilityTag: string;
  brand: string;
  productType: IProductType;
  orderSize: string;
  orderSizeId: string;
  orderColor: string;
  orderColorId: string;
  orderQty: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  id: string;
  rating: number;
  content: string;
  userId: string;
  user: IUser;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  userId: string;
  email: string;
  googleId: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  imageUrl: string;
  addresses: IUserAddress[];
  createdAt: string;
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
  id?: string;
  sizeId: string;
  size?: ISize;
  colorId: string;
  color?: IColor;
  quantity: number;
  discountedPrice?: number;
  itemStatus?:
    | "PROCESSING"
    | "SHIPPED_TO_COURIER"
    | "DELIVERED"
    | "RETURN_REQUESTED"
    | "RETURNED";
  orderId?: string;
  productId: string;
  createdAt?: string;
  updatedAt?: string;
  product?: IProduct;
}

export interface IOrder {
  id?: string;
  userName: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
  streetAddress: string;
  totalCost: number;
  phone: string;
  email: string;
  altPhone?: string;
  couponId?: string;
  orderNote: string;
  userId?: string;
  orderStatus?: "CONFIRM" | "CANCELLED";
  shippingMethod?: "CASH_ON_DELIVERY" | "ONLINE_PAYMENT";
  shippingCost: number;
  createdAt?: Date;
  updatedAt?: Date;
  items: IOrderItem[];
}

export interface IAddress {
  division: IDivision;
  district: IDistrict;
  upazila: IUpazila;
  union: IUnion;
}

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

export interface IExpense {
  id: string;
  title: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface IFeedback {
  id: string;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormValues {
  recipientName: string;
  email: string;
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
  label: "HOME" | "OFFICE";
}
