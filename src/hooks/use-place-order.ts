import { IUserCartProduct, OrderData } from "@/types";
import { Router } from "next/router";
import { UseFormReturn } from "react-hook-form";

type UsePlaceOrderParams = {
    form: UseFormReturn<any>;
    totalPrice: number;
    currentUser: { userId: string } | null;
    productId?: string;
    quantity?: number;
    size?: string;
    cartProducts: IUserCartProduct[];
    createAOrder: (orderData: OrderData) => Promise<any>;
    toast: (options: {title: string, description: string}) => void;
    router: Router;
    setLoading: (loading: boolean) => void;
  };





export const usePlaceOrder:React.FC<UsePlaceOrderParams> = ({
    form,
    totalPrice,
    currentUser,
    productId,
    quantity,
    size,
    cartProducts,
    createAOrder,
    toast,
    router,
    setLoading,
  }) => {
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
        items: [],
        userId: currentUser?.userId,
        username: currentUser ? undefined : username,
        email: currentUser ? undefined : email,
      };
  
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
          title: "Success",
          description: "Order placed successfully.",
        });
  
        setTimeout(() => {
          router.back();
        }, 2000);
      } catch (error) {
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
  