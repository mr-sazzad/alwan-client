"use client";

import MaxWidth from "@/components/max-width";
import StepperForm from "@/components/stepper/stepper-form";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { RootState } from "@/redux/store";
import { checkOutSchema } from "@/schemas/checkout-schema";
import { FormValues, IUserData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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

  const form = useForm<FormValues>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      altPhone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      streetAddress: "",
      orderNote: "",
    },
  });

  useEffect(() => {
    const user = getUserFromLocalStorage() as IUserData | null;
    setCurrentUser(user);
  }, []);

  const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
        phone: user.phone,
        altPhone: user.altPhone,
        division: user.division,
        district: user.district,
        upazila: user.upazila,
        union: user.union,
        streetAddress: user.streetAddress,
      });
    }
  }, [user, form]);

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  const handlePlaceOrder = async () => {
    // ... (rest of the handlePlaceOrder function remains unchanged)
  };

  return (
    <MaxWidth className="flex justify-center">
      <div className="max-w-[900px] w-full px-5 mt-[100px]">
        <StepperForm
          form={form}
          products={
            productId && quantity && size ? [product.data] : cartProducts
          }
          district={form.getValues("district")}
          handlePlaceOrder={handlePlaceOrder}
          setTotalPrice={setTotalPrice}
          setShippingCost={setShippingCost}
          totalPrice={totalPrice}
          buttonLoading={loading}
          setSelectedDivisionName={setSelectedDivisionName}
          setSelectedDistrictName={setSelectedDistrictName}
          setSelectedUpazilaName={setSelectedUpazilaName}
          setSelectedUnionName={setSelectedUnionName}
        />
      </div>
    </MaxWidth>
  );
};

export default CheckoutPage;
