import { toast } from "@/components/ui/use-toast";
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
  sizeId?: string;
  colorId?: string;
  cartProducts: IUserCartProduct[];
  createAOrder: (orderData: OrderData) => Promise<any>;
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
  sizeId,
  colorId,
  cartProducts,
  createAOrder,
  router,
  setLoading,
}: UsePlaceOrderParams) => {
  const handlePlaceOrder = async () => {
    setLoading(true);

    const {
      recipientName,
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
      !recipientName ||
      !email ||
      !phone ||
      !division ||
      !district ||
      !upazila ||
      !union ||
      !streetAddress
    ) {
      toast({
        title: "Error",
        description: "Please fill out your delivery information first",
      });
      setLoading(false);
      return;
    }

    // Prepare order data
    const orderData: OrderData = {
      userName: recipientName,
      email,
      phone,
      address: {
        division,
        district,
        upazila,
        union,
        streetAddress,
      },
      altPhone,
      orderNote,
      totalCost: totalPrice,
      shippingCost,
      items: [],
      userId: currentUser?.userId,
    };

    console.log(" 🛒 🛒 🛒 Cart Products =>", cartProducts);

    // Determine order items based on single product or cart
    if (productId && quantity) {
      orderData.items.push({
        productId,
        quantity: Number(quantity),
        sizeId: sizeId as string,
        colorId: colorId as string,
      });
    } else {
      orderData.items = cartProducts.map((product) => ({
        productId: product.id,
        sizeId: product.orderSizeId,
        quantity: product.orderQty,
        colorId: product.orderColorId,
      }));
    }

    console.log(orderData, "ORDER DATA FROM USE PLACE ORDER");

    // Create order
    try {
      const createdOrder = await createAOrder(orderData);

      console.log("🚀🚀🚀 CREATED ORDER =>", createdOrder);

      if (!createdOrder.data?.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
        return;
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Order placed successfully.",
        });

        setTimeout(() => {
          router.push("/account/orders");
        }, 2000);
      }
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
