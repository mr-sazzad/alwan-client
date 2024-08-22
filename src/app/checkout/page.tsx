"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// addresses
import districtData from "../../../public/address/district.json";
import divisionData from "../../../public/address/division.json";
import unionData from "../../../public/address/union.json";
import upazilaData from "../../../public/address/upazila.json";

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { getFromLocalStorage } from "@/helpers/local-storage";
import { useCreateAOrderMutation } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { checkOutSchema } from "@/schemas/checkout-schema";
import {
  IDistrict,
  IDivision,
  IProduct,
  IUnion,
  IUpazila,
  IUserData,
  OrderData,
} from "@/types";
import Loading from "../loading";

const CheckoutPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const size = searchParams.get("size");

  // addresses
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");

  const [filteredDistricts, setFilteredDistricts] = useState<IDistrict[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<IUpazila[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<IUnion[]>([]);

  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [createAOrder] = useCreateAOrderMutation();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: product, isLoading } = useGetSingleProductQuery(productId);

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

    const cartProductsString = getFromLocalStorage(
      "alwan_user_cart_items"
    ) as string;
    const cartProductsData = JSON.parse(cartProductsString) as IProduct[];
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
      division: form.getValues("division"),
      district: form.getValues("district"),
      upazila: form.getValues("upazila"),
      union: form.getValues("union"),
      streetAddress: form.getValues("streetAddress"),
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

    // if (!productId && !quantity) {
    //   orderData.items = cartProducts.map((product) => ({
    //     productId: product.id,
    //     size: product.sizeVariants,
    //     quantity: product.orderQty,
    //   }));
    // } else {
    //   orderData.items = [
    //     {
    //       productId: product.id,
    //       quantity: Number(quantity),
    //       size: size as string,
    //     },
    //   ];
    // }

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

  // const handleProductDelete = (id: string, size: string) => {
  //   const remainingItems = cartItems.filter(
  //     (item) => item.id !== id || item.orderSize !== size
  //   );

  //   if (!remainingItems.length) {
  //     setTimeout(() => {
  //       router.back();
  //     }, 1000);
  //   }

  //   setToLocalStorage("alwan_user_cart_items", JSON.stringify(remainingItems));
  //   setCartItems(remainingItems);
  // };

  return (
    <MaxWidth>
      <div className="flex md:flex-row flex-col gap-5 w-full px-5 items-center md:items-stretch mt-[100px]">
        {/* <div className="w-full md:hidden">
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
        </div> */}
        <div className="max-w-xl w-full">
          <h3 className="font-medium text-lg">DELIVERY & BILLING INFO</h3>
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
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Division</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setSelectedDivision(value);
                          const districts = districtData.filter(
                            (district: IDistrict) =>
                              district.division_id === value
                          );

                          setFilteredDistricts(districts);
                          setSelectedDistrict("");
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Your Division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {divisionData.map((division: IDivision) => (
                              <SelectItem key={division.id} value={division.id}>
                                {division.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* DIstrict */}
              <div className="flex w-full">
                {selectedDivision && (
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>District</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedDistrict(value);

                            const upazilas = upazilaData.filter(
                              (upazila: IUpazila) =>
                                upazila.district_id === value
                            );

                            setFilteredUpazilas(upazilas);
                            setSelectedUpazila("");
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Your District" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Districts</SelectLabel>
                              {filteredDistricts.map((district: IDistrict) => (
                                <SelectItem
                                  key={district.id}
                                  value={district.id}
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Upazila */}
              <div className="flex w-full">
                {selectedDistrict && (
                  <FormField
                    control={form.control}
                    name="upazila"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Upazilla</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedUpazila(value);

                            const unions = unionData.filter(
                              (union: IUnion) => union.upazilla_id === value
                            );

                            setFilteredUnions(unions);
                            setSelectedUnion("");
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Your Upazila" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Upazilas</SelectLabel>
                              {filteredUpazilas.map((upazila: IUpazila) => (
                                <SelectItem key={upazila.id} value={upazila.id}>
                                  {upazila.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* Union */}
              <div className="flex w-full">
                {selectedUpazila && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Division</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedUnion(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Your Upazila" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Unions</SelectLabel>
                              {filteredUnions.map((union: IUnion) => (
                                <SelectItem key={union.id} value={union.id}>
                                  {union.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="streetAddress"
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
        {/* <div className="w-full flex flex-col justify-between">
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
        </div> */}
      </div>
    </MaxWidth>
  );
};

export default CheckoutPage;
