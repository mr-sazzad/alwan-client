"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import CheckOutPageBillingInfo from "@/components/cards/checkout-page-billing-info";
import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
import MaxWidth from "@/components/max-width";
import AddressDialog from "@/components/profile/address-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleSizeQuery } from "@/redux/api/size/size-api";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { RootState } from "@/redux/store";
import { addressSchema } from "@/schemas/address-schema";
import { FormValues, IUserAddress, IUserCartProduct, IUserData } from "@/types";

import homeIcon from "@/images/house_4730076.png";
import { useGetSingleColorByIdQuery } from "@/redux/api/color/color-api";
import Loading from "../loading";

const GUEST_ADDRESS_KEY = "alwan_guest_user_address";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const quantity = searchParams.get("quantity");
  const colorId = searchParams.get("colorId") || undefined;

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [createAOrder] = useCreateAOrderMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [addressModalOpen, setAddressModalOpen] = useState<boolean>(false);
  const [guestAddress, setGuestAddress] = useState<FormValues | null>(null);

  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const form = useForm<FormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      recipientName: "",
      email: "",
      phone: "",
      altPhone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      streetAddress: "",
    },
  });

  const { data: userRes, isLoading: isUserLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  const { data: sizeRes, isLoading: isSizeLoading } =
    useGetSingleSizeQuery(sizeId);
  const { data: productRes, isLoading: isProductLoading } =
    useGetSingleProductQuery(productId);
  const { data: colorRes, isLoading: isColorLoading } =
    useGetSingleColorByIdQuery(colorId);

  useEffect(() => {
    const user = getUserFromLocalStorage() as IUserData | null;
    setCurrentUser(user);

    const storedGuestAddress = localStorage.getItem(GUEST_ADDRESS_KEY);
    if (storedGuestAddress && !user) {
      const parsedAddress = JSON.parse(storedGuestAddress) as FormValues;
      setGuestAddress(parsedAddress);
      form.reset(parsedAddress);
    }
  }, [form]);

  useEffect(() => {
    if (userRes?.data) {
      form.reset({
        recipientName: userRes.data.username,
        email: userRes.data.email,
        phone: userRes.data.phone,
        altPhone: userRes.data.altPhone,
        division: userRes.data.divisionId,
        district: userRes.data.districtId,
        upazila: userRes.data.upazilaId,
        union: userRes.data.unionId,
        streetAddress: userRes.data.streetAddress,
      });
    }
  }, [userRes, form]);

  useEffect(() => {
    if (!productId && cartProducts.length === 0) {
      router.back();
    }
  }, [productId, cartProducts, router]);

  const handlePlaceOrder = usePlaceOrder({
    form,
    totalPrice,
    shippingCost,
    currentUser,
    productId,
    quantity: quantity ? Number(quantity) : undefined,
    size: sizeRes?.data?.name,
    cartProducts,
    createAOrder,
    router,
    setLoading,
  });

  const handleAddressSubmit = (values: FormValues) => {
    if (currentUser) {
      form.reset(values);
    } else {
      setGuestAddress(values);
      localStorage.setItem(GUEST_ADDRESS_KEY, JSON.stringify(values));
    }
    setAddressModalOpen(false);
  };

  const handleAddressButtonClick = () => {
    if (currentUser) {
      router.push("/account/address");
    } else {
      setAddressModalOpen(true);
    }
  };

  if (isUserLoading || isSizeLoading || isProductLoading || isColorLoading) {
    return <Loading />;
  }

  const addresses = userRes?.data?.addresses || [];
  const defaultAddress = addresses.find(
    (address: IUserAddress) => address.isDefault
  );
  const addressToShow = currentUser
    ? defaultAddress || addresses[0]
    : guestAddress;

  const productsToShow: IUserCartProduct[] =
    productId && productRes?.data
      ? [
          {
            ...productRes.data,
            orderQty: Number(quantity),
            orderSize: sizeRes?.data?.name,
            orderColor: colorRes.data.name,
            colorHexCode: colorRes.data.hexCode,
          },
        ]
      : cartProducts;

  return (
    <MaxWidth className="flex justify-center">
      <div className="max-w-[900px] w-full px-5 mt-[100px]">
        <div>
          {!addressToShow ? (
            <Button
              variant="outline"
              className="md:py-8 py-7 w-full"
              onClick={handleAddressButtonClick}
            >
              <p className="font-medium tracking-wider">Add Delivery Address</p>
            </Button>
          ) : (
            <div className="flex gap-4 items-center">
              <div>
                <Image alt="home-icon" src={homeIcon} height={40} width={40} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <p className="font-medium">{addressToShow.recipientName}</p>
                  <p className="text-muted-foreground text-sm">
                    {addressToShow.phone}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  {addressToShow.streetAddress}
                </p>
                <p className="text-muted-foreground text-sm">
                  {addressToShow.union}, {addressToShow.upazila},{" "}
                  {addressToShow.district}, {addressToShow.division}
                </p>
              </div>
              <div className="ml-auto">
                <Button
                  variant="ghost"
                  className="w-full rounded-full px-2.5 ml-auto"
                  size="icon"
                  onClick={handleAddressButtonClick}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
        <Separator className="my-3" />
        <div className="flex flex-col gap-2 w-full">
          {productsToShow.map((product) => (
            <CheckoutPageSingleProductCard
              key={product.id}
              product={product}
              quantity={String(product.orderQty)}
              size={product.orderSize}
            />
          ))}
        </div>
        <Separator className="my-3" />
        <div>
          <CheckOutPageBillingInfo
            products={productsToShow}
            district={addressToShow?.district || userRes?.data?.district}
            handlePlaceOrder={handlePlaceOrder}
            setTotalPrice={setTotalPrice}
            setShippingCost={setShippingCost}
            totalPrice={totalPrice}
            buttonLoading={loading}
          />
        </div>
        <AddressDialog
          addressModalOpen={addressModalOpen}
          setAddressModalOpen={setAddressModalOpen}
          currentUser={currentUser}
          title={currentUser ? "Update Address" : "Add Address"}
          submitHandler={handleAddressSubmit}
          selectedAddress={addressToShow}
          isLoading={false}
          resetForm={!currentUser}
        />
      </div>
    </MaxWidth>
  );
}
