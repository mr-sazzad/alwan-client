"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CheckOutPageBliilinInfo from "@/components/cards/checkout-page-billing-info";
import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
import DeliveryOptions from "@/components/delivery-options/delivery-options";
import MaxWidth from "@/components/max-width";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/local-storage";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { checkOutSchema } from "@/schemas/checkout-schema";
import { cities } from "@/static/cities";
import { ITShirt, IUserData, OrderData } from "@/types";
import Loading from "../loading";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const size = searchParams.get("size");

  const [cartProducts, setCartProducts] = useState<ITShirt[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [createAOrder] = useCreateAOrderMutation();
  const [cartItems, setCartItems] = useState<ITShirt[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: product, isLoading } = useGetSingleProductQuery(productId);

  const form = useForm<z.infer<typeof checkOutSchema>>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      altPhone: "",
      city: "",
      shippingAddress: "",
    },
  });

  useEffect(() => {
    const user = getUserFromLocalStorage() as IUserData | null;
    setCurrentUser(user);

    const cartProductsString = getFromLocalStorage(
      "alwan_user_cart_items"
    ) as string;
    const cartProductsData = JSON.parse(cartProductsString) as ITShirt[];
    setCartProducts(cartProductsData);
  }, [form]);

  const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );

  useEffect(() => {
    const items = JSON.parse(
      getFromLocalStorage("alwan_user_cart_items") as string
    );
    setCartItems(items);
  }, []);

  useEffect(() => {
    if (user) {
      form.setValue("username", user.username);
      form.setValue("email", user.email);
      form.setValue("phone", user.phone);
      form.setValue("altPhone", user.altPhone);
      form.setValue("city", user.shippingDistrict);
      form.setValue("shippingAddress", user.shippingAddress);
    }
  }, [user, form]);

  if (isLoading || isUserLoading) {
    return <Loading />;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    if (
      !form.getValues("username") ||
      !form.getValues("email") ||
      !form.getValues("phone") ||
      !form.getValues("city") ||
      !form.getValues("shippingAddress")
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out your delivery information",
      });
      setLoading(false);
      return;
    }

    const orderData: OrderData = {
      shippingCity: form.getValues("city"),
      shippingAddress: form.getValues("shippingAddress"),
      phone: form.getValues("phone"),
      altPhone: form.getValues("altPhone"),
      totalCost: totalPrice,
      orderNote: form.getValues("orderNote"),
      items: [],
    };

    if (currentUser) {
      orderData.userId = currentUser.userId;
    } else {
      orderData.username = form.getValues("username");
      orderData.email = form.getValues("email");
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

    console.log("order => ", createdOrder);

    if (!createdOrder.data.id) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      setLoading(false);
      toast({
        title: "Success",
        description: "Order placed successfully.",
      });

      setTimeout(() => {
        router.back();
      }, 2000);
    }
  };

  const handleProductDelete = (id: string, size: string) => {
    const remainingItems = cartItems.filter(
      (item) => item.id !== id || item.orderSize !== size
    );

    if (!remainingItems.length) {
      setTimeout(() => {
        router.back();
      }, 1000);
    }

    setToLocalStorage("alwan_user_cart_items", JSON.stringify(remainingItems));
    setCartItems(remainingItems);
  };

  return (
    <MaxWidth>
      <div className="flex md:flex-row flex-col gap-5 w-full px-5 items-center md:items-stretch mt-[100px]">
        <div className="w-full md:hidden">
          <h3 className="font-medium text-lg mb-3">ORDER OVERVIEW</h3>
          <Separator className="mb-3" />
          <div className="max-h-[300px] pr-3 overflow-y-auto">
            {productId && quantity && size && (
              <div>
                <CheckoutPageSingleProductCard
                  product={product}
                  quantity={quantity}
                  size={size}
                  onProductDelete={handleProductDelete}
                />
              </div>
            )}
          </div>
          {!productId && !quantity && cartProducts.length > 0 && (
            <div>
              {cartProducts.map((product) => (
                <div key={product.id} className="md:min-h-full mt-auto w-full">
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
          <h3 className="font-medium text-lg">DELIVERY & BILLING INFO</h3>
          <Separator className="my-4" />
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Abdullah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="017******21" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="altPhone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Alt Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="018******37" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full">
                <Select onValueChange={(value) => form.setValue("city", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Your City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem value={city.value} key={city.id}>
                        {city.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Detailed Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please write your address in detail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="orderNote"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Order Note (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Anything you want to add.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div>
            <DeliveryOptions />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="w-full md:block hidden">
            <h3 className="font-medium text-lg mb-3">ORDER OVERVIEW</h3>
            <Separator className="my-3" />
            <div className="md:h-[352px] overflow-y-auto md:pr-3">
              {productId && quantity && size && (
                <div className="">
                  <CheckoutPageSingleProductCard
                    product={product}
                    quantity={quantity}
                    size={size}
                    onProductDelete={handleProductDelete}
                  />
                </div>
              )}
            </div>
            {!productId && !quantity && cartProducts.length > 0 && (
              <div className="max-h-[53vh] overflow-y-auto">
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="md:min-h-full mt-auto w-full mb-2 hover:ring-1 hover:ring-gray-300 p-1 rounded"
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
              <CheckOutPageBliilinInfo
                products={[product]}
                city={form.getValues("city")}
                qty={Number(quantity)}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                buttonLoading={loading}
              />
            )}
            {!productId && !quantity && cartProducts.length > 0 && (
              <CheckOutPageBliilinInfo
                products={cartProducts}
                city={form.getValues("city")}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
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
