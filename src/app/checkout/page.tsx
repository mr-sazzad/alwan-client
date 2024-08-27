"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CheckOutPageBillingInfo from "@/components/cards/checkout-page-billing-info";
import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
import CheckoutForm from "@/components/checkout/checkout-form";
import DeliveryOptions from "@/components/delivery-options/delivery-options";
import MaxWidth from "@/components/max-width";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

import { getUserFromLocalStorage } from "@/helpers/jwt";

import { clearCart, deleteProduct } from "@/redux/api/cart/cartSlice";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

import { checkOutSchema } from "@/schemas/checkout-schema";
import { IUserData, OrderData } from "@/types";

import Loading from "../loading";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const size = searchParams.get("size");

  const [selectedDivisionName, setSelectedDivisionName] = useState<string>("");
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>("");
  const [selectedUpazilaName, setSelectedUpazilaName] = useState<string>("");
  const [selectedUnionName, setSelectedUnionName] = useState<string>("");

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [createAOrder] = useCreateAOrderMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: product, isLoading } = useGetSingleProductQuery(productId);

  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof checkOutSchema>>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      username: "",
      email: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      streetAddress: "",
      phone: "",
      altPhone: "",
    },
  });

  useEffect(() => {
    const user = getUserFromLocalStorage() as IUserData | null;
    setCurrentUser(user);
  }, [form]);

  const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  useEffect(() => {
    if (user) {
      form.setValue("username", user.username);
      form.setValue("email", user.email);
      form.setValue("phone", user.phone);
      form.setValue("altPhone", user.altPhone);
      form.setValue("division", user.division);
      form.setValue("district", user.district);
      form.setValue("upazila", user.upazila);
      form.setValue("union", user.union);
      form.setValue("streetAddress", user.streetAddress);
    }
  }, [user, form]);

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    console.log("DIVISION", form.getValues("division"));
    if (
      !form.getValues("username") ||
      !form.getValues("email") ||
      !form.getValues("phone") ||
      !form.getValues("division") ||
      !form.getValues("district") ||
      !form.getValues("upazila") ||
      !form.getValues("union") ||
      !form.getValues("streetAddress")
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out your delivery information first",
      });
      setLoading(false);
      return;
    }

    const orderData: OrderData = {
      phone: form.getValues("phone"),
      altPhone: form.getValues("altPhone"),
      totalCost: totalPrice,
      shippingCost: shippingCost,
      orderNote: form.getValues("orderNote"),
      items: [],
    };

    if (currentUser) {
    }

    if (currentUser) {
      orderData.userId = currentUser.userId;
      orderData.division = user?.data.address.division;
      orderData.district = user?.data.address.district;
      orderData.upazila = user?.data.address.upazila;
      orderData.union = user?.data.address.union;
      orderData.streetAddress = user?.data.address.streetAddress;
    } else {
      orderData.userName = form.getValues("username");
      orderData.email = form.getValues("email");
      orderData.division = selectedDivisionName;
      orderData.district = selectedDistrictName;
      orderData.upazila = selectedUpazilaName;
      orderData.union = selectedUnionName;
      orderData.streetAddress = form.getValues("streetAddress");
    }

    if (!productId && !quantity) {
      orderData.items = cartProducts.map((product) => ({
        productId: product.id,
        size: product.orderSize,
        quantity: product.orderQty,
      }));
    } else {
      orderData.items = [
        {
          productId: product.id,
          quantity: Number(quantity),
          size: size as string,
        },
      ];
    }

    const createdOrder: any = await createAOrder(orderData);

    if (!createdOrder.data.data.id) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      if (!productId && !quantity) {
        dispatch(clearCart());
      }
      setLoading(false);
      form.reset();
      toast({
        title: "Success",
        description: "Your Order has been placed successfylly.",
      });

      setTimeout(() => {
        router.back();
      }, 1000);
    }
  };

  const handleProductDelete = (id: string, size: string) => {
    dispatch(
      deleteProduct({
        id,
        size,
      })
    );

    toast({
      title: "Successful",
      description: "Product deleted successfully",
      variant: "destructive",
    });
  };

  return (
    <MaxWidth className="flex justify-center">
      <div className="flex md:flex-row flex-col gap-5 max-w-[900px]  w-full px-5 items-center md:items-stretch mt-[100px]">
        <div className="max-w-xl w-full md:hidden">
          <h3 className="font-medium text-lg">ORDER OVERVIEW</h3>
          <Separator className="max-w-[170px] mb-2" />
          <div className="max-h-[300px] pr-3 overflow-y-auto">
            {productId && quantity && size && (
              <div>
                <CheckoutPageSingleProductCard
                  product={product.data}
                  quantity={quantity}
                  size={size}
                  onProductDelete={handleProductDelete}
                />
              </div>
            )}
          </div>
          {!productId && !quantity && cartProducts.length > 0 && (
            <div className="flex flex-col gap-1">
              {cartProducts.map((product) => (
                <div key={product.id} className="md:min-h-full w-full">
                  <CheckoutPageSingleProductCard
                    product={product}
                    quantity={String(product.orderQty)}
                    size={product.orderSize}
                    onProductDelete={handleProductDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-xl w-full">
          <CheckoutForm
            setSelectedDivisionName={setSelectedDivisionName}
            setSelectedDistrictName={setSelectedDistrictName}
            setSelectedUpazilaName={setSelectedUpazilaName}
            setSelectedUnionName={setSelectedUnionName}
            form={form}
          />

          <div>
            <DeliveryOptions />
          </div>
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="w-full md:block hidden">
            <h3 className="font-medium text-lg mb-3">ORDER OVERVIEW</h3>
            <Separator className="my-3" />
            <div>
              {productId && quantity && size && (
                <div className="md:h-[352px] overflow-y-auto md:pr-3">
                  <CheckoutPageSingleProductCard
                    product={product.data}
                    quantity={quantity}
                    size={size}
                    onProductDelete={handleProductDelete}
                  />
                </div>
              )}
            </div>

            {!productId && !quantity && cartProducts.length > 0 && (
              <div className="max-h-[53vh] overflow-y-auto hide-scrollbar">
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="md:min-h-full mt-auto w-full mb-2"
                  >
                    <CheckoutPageSingleProductCard
                      product={product}
                      quantity={String(product.orderQty)}
                      size={product.orderSize}
                      onProductDelete={handleProductDelete}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            {productId && quantity && size && (
              <CheckOutPageBillingInfo
                products={[product]}
                district={form.getValues("district")}
                qty={Number(quantity)}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
                setShippingCost={setShippingCost}
                totalPrice={totalPrice}
                buttonLoading={loading}
              />
            )}

            {!productId && !quantity && cartProducts.length > 0 && (
              <CheckOutPageBillingInfo
                products={cartProducts}
                district={form.getValues("district")}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
                setShippingCost={setShippingCost}
                totalPrice={totalPrice}
                buttonLoading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default CheckoutPage;
