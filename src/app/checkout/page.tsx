"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRight,
  CreditCard,
  Home,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import CheckOutPageBillingInfo from "@/components/cards/checkout-page-billing-info";
import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
import MaxWidth from "@/components/max-width";
import AddressDialog from "@/components/profile/address-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { usePlaceOrder } from "@/hooks/use-place-order";
import { useGetSingleColorByIdQuery } from "@/redux/api/color/color-api";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleSizeQuery } from "@/redux/api/size/size-api";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { RootState } from "@/redux/store";
import { addressSchema } from "@/schemas/address-schema";
import { FormValues, IProduct, IUser, IUserAddress } from "@/types";
import { TbHomeCheck } from "react-icons/tb";

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
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [createAOrder] = useCreateAOrderMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [addressModalOpen, setAddressModalOpen] = useState<boolean>(false);
  const [guestAddress, setGuestAddress] = useState<FormValues | null>(null);
  const [addressToShow, setAddressToShow] = useState<FormValues | null>(null);
  const cartProducts = useSelector((state: RootState) => state.cart.products);

  const form = useForm<any>({
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
    const user = getUserFromLocalStorage() as IUser | null;
    setCurrentUser(user);

    const storedGuestAddress = localStorage.getItem(GUEST_ADDRESS_KEY);
    if (storedGuestAddress && !user) {
      const parsedAddress = JSON.parse(storedGuestAddress) as any;
      setGuestAddress(parsedAddress);
      form.reset(parsedAddress);
    }
  }, [form]);

  useEffect(() => {
    if (!productId && cartProducts.length === 0) {
      router.back();
    }
  }, [productId, cartProducts, router]);

  useEffect(() => {
    const addresses = userRes?.data?.addresses || [];
    const defaultAddress = addresses.find(
      (address: IUserAddress) => address.isDefault
    );

    const newAddressToShow = currentUser
      ? defaultAddress || addresses[0]
      : guestAddress;

    setAddressToShow(newAddressToShow);

    if (newAddressToShow) {
      form.reset({
        recipientName: newAddressToShow.recipientName,
        email: newAddressToShow.email || currentUser?.email || "",
        phone: newAddressToShow.phone,
        altPhone: newAddressToShow.altPhone || "",
        division: newAddressToShow.division,
        district: newAddressToShow.district,
        upazila: newAddressToShow.upazila,
        union: newAddressToShow.union,
        streetAddress: newAddressToShow.streetAddress,
      });
    }
  }, [userRes, currentUser, guestAddress, form]);

  const handlePlaceOrder = usePlaceOrder({
    form,
    totalPrice,
    shippingCost,
    currentUser,
    productId,
    quantity: quantity ? Number(quantity) : undefined,
    sizeId: sizeRes?.data?.id,
    colorId: colorRes?.data?.id,
    cartProducts,
    createAOrder,
    router,
    setLoading,
  });

  const handleAddressSubmit = (values: any) => {
    if (currentUser) {
      form.reset(values);
    } else {
      setGuestAddress(values);
      localStorage.setItem(GUEST_ADDRESS_KEY, JSON.stringify(values));
    }
    form.reset(values);
    setAddressModalOpen(false);
  };

  const handleAddressButtonClick = () => {
    if (currentUser) {
      router.push("/account/address");
    } else {
      setAddressModalOpen(true);
    }
  };

  const isLoading =
    isUserLoading || isSizeLoading || isProductLoading || isColorLoading;

  const productsToShow: IProduct[] =
    productId && productRes?.data
      ? [
          {
            ...productRes.data,
            orderQty: Number(quantity),
            orderSize: sizeRes?.data?.name,
            orderColor: colorRes?.data?.name,
            colorHexCode: colorRes?.data?.hexCode,
          },
        ]
      : cartProducts;

  return (
    <MaxWidth className="flex justify-center mt-[100px]">
      <div className="max-w-6xl w-full px-4 py-4">
        <h1 className="text-3xl font-medium mb-4">Checkout</h1>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 space-y-4">
            <Card className="bg-slate-100 dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-medium">
                  <Home className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : !addressToShow ? (
                  <Button
                    className="w-full h-20 flex items-center gap-2 text-lg"
                    onClick={handleAddressButtonClick}
                  >
                    <TbHomeCheck />
                    Add Delivery Address
                  </Button>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <p className="font-medium">
                          {addressToShow.recipientName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {addressToShow.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {addressToShow.streetAddress}, {addressToShow.union},{" "}
                          {addressToShow.upazila},{addressToShow.district},{" "}
                          {addressToShow.division}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleAddressButtonClick}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-100 dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-medium">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {productsToShow.map((product) => (
                      <CheckoutPageSingleProductCard
                        key={product.id}
                        product={product}
                        quantity={String(product.orderQty)}
                        size={product.orderSize}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="bg-slate-100 dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-medium">
                  <CreditCard className="h-5 w-5" /> Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : (
                  <CheckOutPageBillingInfo
                    products={productsToShow}
                    district={
                      addressToShow?.district || userRes?.data?.district
                    }
                    handlePlaceOrder={handlePlaceOrder}
                    setTotalPrice={setTotalPrice}
                    setShippingCost={setShippingCost}
                    buttonLoading={loading}
                  />
                )}
              </CardContent>
            </Card>
          </div>
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
