import { IUserCartProduct, OrderData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReturn } from "react-hook-form";

type UsePlaceOrderParams = {
  form: UseFormReturn<any>;
  totalPrice: number;
  shippingCost: number;
  currentUser: { userId: string } | null;
  productId?: string;
  quantity?: number;
  size?: string;
  cartProducts: IUserCartProduct[];
  createAOrder: (orderData: OrderData) => Promise<any>;
  toast: (options: {
    title: string;
    description: string;
    variant: "destructive" | "default";
  }) => void;
  router: AppRouterInstance;
  setLoading: (loading: boolean) => void;
};

export const usePlaceOrder = ({
  form,
  totalPrice,
  shippingCost,
  currentUser,
  productId,
  quantity,
  size,
  cartProducts,
  createAOrder,
  toast,
  router,
  setLoading,
}: UsePlaceOrderParams) => {
  const handlePlaceOrder = async () => {
    setLoading(true);

    const {
      username,
      email,
      phone,
      division,
      district,
      upazila,
      union,
      streetAddress,
      altPhone,
      orderNote,
    } = form.getValues();

    // Validate required fields
    if (
      !username ||
      !email ||
      !phone ||
      !division ||
      !district ||
      !upazila ||
      !union ||
      !streetAddress
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out your delivery information first",
      });
      setLoading(false);
      return;
    }

    // Prepare order data
    const orderData: OrderData = {
      division,
      district,
      upazila,
      union,
      streetAddress,
      phone,
      altPhone,
      totalCost: totalPrice,
      orderNote,
      shippingCost,
      items: [],
      userId: currentUser?.userId,
      userName: currentUser ? undefined : username,
      email: currentUser ? undefined : email,
    };

    console.log("ORDER DATA", orderData);

    // Determine order items based on single product or cart
    if (productId && quantity) {
      orderData.items.push({
        productId,
        quantity: Number(quantity),
        size: size as string,
      });
    } else {
      orderData.items = cartProducts.map((product) => ({
        productId: product.id,
        size: product.orderSize,
        quantity: product.orderQty,
      }));
    }

    // Create order
    try {
      const createdOrder = await createAOrder(orderData);

      if (!createdOrder.data?.id) {
        throw new Error("Order creation failed");
      }

      toast({
        variant: "default",
        title: "Success",
        description: "Order placed successfully.",
      });

      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return handlePlaceOrder;
};
