import { couponSchema } from "@/schemas/coupon-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface CouponCodeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCouponApply: (
    couponId: string,
    type: "PERCENTAGE" | "FIXED",
    value: number,
    isDeliveryCoupon: boolean,
    isGlobalCoupon: boolean
  ) => void;
}

const CouponCodeModal: React.FC<CouponCodeModalProps> = ({
  open,
  setOpen,
  onCouponApply,
}) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URI;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      coupon: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof couponSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${serverUrl}/coupons/get-coupon/${data.coupon}`
      );
      if (!response.ok) {
        setError("Invalid coupon code");
      }
      const result: any = await response.json();
      const coupon = result?.data;

      onCouponApply(
        coupon.id,
        coupon.discountType,
        coupon.discountValue,
        coupon.isDeliveryCoupon,
        coupon.isGlobalCoupon
      );

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl">Coupon</DrawerTitle>
            <DrawerDescription>
              If you have a coupon then you can get extra discount
            </DrawerDescription>
          </DrawerHeader>
          {error && (
            <div className="bg-red-100 flex justify-center items-center gap-2 border rounded-md w-full py-2">
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="coupon"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Coupon</FormLabel>
                    <FormControl>
                      <Input placeholder="coupon_code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DrawerFooter className="w-full">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <RiLoaderLine className="animate-spin h-5 w-5" />
                  ) : (
                    "Apply Coupon"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CouponCodeModal;
