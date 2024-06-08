import { couponSchema } from "@/schemas/coupon-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CouponCodeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCouponApply: (couponId: string, discountPercentage: number) => void;
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
        `${serverUrl}/coupons/get-single-coupon-by-code/${data.coupon}`
      );
      if (!response.ok) {
        setError("Invalid coupon code");
      }
      const result: any = await response.json();
      const coupon = result?.data;
      onCouponApply(coupon.id, coupon.discountPercentage);
      console.log(coupon.id, coupon.discountPercentage);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[500px] sm:max-w-[425px] rounded">
        <DialogHeader>
          <DialogTitle className="text-xl">Coupon</DialogTitle>
          <DialogDescription>
            If you have a coupon then you can get extra discount
          </DialogDescription>
        </DialogHeader>
        {error && (
          <div className="bg-red-500/30 flex justify-center items-center gap-2 border rounded-md w-full py-2">
            <TbError404 size={20} />
            <span className="font-medium">{error}</span>
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
                    <Input placeholder="alwan_coupon_2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <RiLoaderLine className="animate-spin h-5 w-5" />
                ) : (
                  "Apply Coupon"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CouponCodeModal;
