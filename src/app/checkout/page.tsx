"use client";

import CheckOutPageBliilinInfo from "@/components/cards/checkout-page-billing-info";
import CheckoutPageSingleProductCard from "@/components/cards/checkout-page-single-product-card";
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
import { getFromLocalStorage } from "@/helpers/local-storage";
import CashOnDelivery from "@/images/cash-on-delivery";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { checkOutSchema } from "@/schemas/checkout-schema";
import { cities } from "@/static/cities";
import { ITShirt, OrderData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../loading";

const CheckoutPage = () => {
  const searchParms = useSearchParams();
  const productId = searchParms.get("productId");
  const quantity = searchParms.get("quantity");
  const size = searchParms.get("size");

  // state variables
  let [cartProducts, setCartProducts] = useState<ITShirt[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [altPhone, setAltPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage());
  const [createAOrder] = useCreateAOrderMutation();

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
    const cartProductsString = getFromLocalStorage("cartItems") as string;
    const cartProductsData = JSON.parse(cartProductsString) as ITShirt[];
    setCartProducts(cartProductsData);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleProductDelete = (productId: string) => {
    const remainingProducts = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(remainingProducts);
  };

  const handleAddressChange = (value: string) => {
    setCity(value);
  };

  const handlePlaceOrder = async () => {
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      city === "" ||
      phone === ""
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out your information",
      });
      return;
    }
    let orderData: OrderData = {
      shippingCity: city,
      shippingAddress: address,
      phone: phone,
      altPhone: altPhone,
      totalCost: totalPrice,
      orderNote: note,
      items: [],
    };

    if (!productId && !quantity) {
      // here we taking data from cart
      orderData.items = cartProducts.map((product) => ({
        productId: product.id,
        size: product.orderSize,
        quantity: product.orderQty,
      }));
    } else {
      // here we ar taking data from url params
      orderData.items = [
        {
          productId: product.id,
          quantity: Number(quantity as string),
          size: size as string,
        },
      ];
    }

    const createdOrder = await createAOrder(orderData);

    console.log(createdOrder);

    if (createdOrder) {
      toast({
        title: "Success",
        description: "Order Submitted Successfully",
      });
    }
  };

  return (
    <MaxWidth>
      <div className="flex md:flex-row flex-col gap-5 w-full px-5 items-center md:items-stretch mt-[100px]">
        <div className="w-full md:hidden">
          <h3 className="font-medium text-gary-700 text-lg mb-3">
            ORDER OVERVIEW
          </h3>
          {productId && quantity && (
            <CheckoutPageSingleProductCard
              product={product}
              quantity={quantity}
              size={size as string}
            />
          )}

          {/* if any products in the cart */}
          {!productId && !quantity && cartProducts.length && (
            <div>
              {cartProducts.map((product) => (
                <div key={product.id} className="md:min-h-full mt-auto w-full">
                  <CheckoutPageSingleProductCard
                    product={product}
                    quantity={String(product.orderQty)}
                    size={product.orderSize}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-xl w-full">
          <h3 className="font-medium text-gary-700 text-lg">
            DELIVERY & BILLING INFO
          </h3>
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
                      <Input
                        placeholder="Abdullah"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setName(e.target.value);
                          form.setValue("username", e.target.value);
                        }}
                      />
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
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setEmail(e.target.value);
                          form.setValue("email", e.target.value);
                        }}
                      />
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
                        <Input
                          placeholder="017******21"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setPhone(e.target.value);
                            form.setValue("phone", e.target.value);
                          }}
                        />
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
                        <Input
                          placeholder="018******37"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setAltPhone(e.target.value);
                            form.setValue("altPhone", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full">
                <Select onValueChange={(value) => handleAddressChange(value)}>
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
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setAddress(e.target.value);
                          form.setValue("shippingAddress", e.target.value);
                        }}
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
                        placeholder="Anithing you want to add.."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const noteValue = e.target.value ?? "";
                          setNote(noteValue);
                          form.setValue("orderNote", noteValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div>
            <CashOnDelivery />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full flex flex-col justify-between">
          <div className="w-full md:block hidden">
            <h3 className="font-medium text-gary-700 text-lg mb-3">
              ORDER OVERVIEW
            </h3>
            <Separator className="my-4" />
            {productId && quantity && (
              <CheckoutPageSingleProductCard
                product={product}
                quantity={quantity}
                size={size as string}
              />
            )}

            {/* if any products in the cart */}
            {!productId && !quantity && cartProducts.length && (
              <div>
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="md:min-h-full mt-auto w-full mb-2 hover:ring-1 hover:ring-gray-300 p-1 rounded"
                  >
                    <CheckoutPageSingleProductCard
                      product={product}
                      quantity={String(product.orderQty)}
                      size={product.orderSize}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* billing info */}
          <div className="w-full">
            {productId && quantity && size && (
              <CheckOutPageBliilinInfo
                products={[{ ...product }]}
                city={city}
                qty={Number(quantity)}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            )}
            {!productId && !quantity && !size && cartProducts && (
              <CheckOutPageBliilinInfo
                products={cartProducts}
                city={city}
                handlePlaceOrder={handlePlaceOrder}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            )}
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default CheckoutPage;
