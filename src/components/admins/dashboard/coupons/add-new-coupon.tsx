"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useCreateACouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/api/coupon/couponApi";
import { couponSchema } from "@/schemas/admins/coupon-schema";
import { loginSchema } from "@/schemas/login-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { z } from "zod";

interface AddNewCouponProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddNewCoupon: React.FC<AddNewCouponProps> = ({ open, setOpen }) => {
  const [createACoupon, { isLoading }] = useCreateACouponMutation();
  const { data: coupons, isLoading: isCouponReading } =
    useGetAllCouponsQuery(undefined);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = getUserFromLocalStorage();
      setIsAuthenticated(!!user);
    };

    checkAuthentication();
  }, []);

  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: "",
      discountType: "PERCENTAGE",
      discountValue: "",
      expiryDate: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof couponSchema>) => {
    const res: any = await createACoupon(data);

    if (res.data.accessToken) {
      setOpen(false);
      form.reset();
      toast({
        title: "Congratulations",
        description: "Coupon has been created successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong Please try again",
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[500px] sm:max-w-[425px] rounded">
          <DialogHeader>
            <DialogTitle className="text-xl">Coupon</DialogTitle>
            <DialogDescription>Create New Coupon</DialogDescription>
          </DialogHeader>
          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="SUMMER-2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="discountType" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FIXED">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount value</FormLabel>
                    <FormControl>
                      <Input placeholder="Float Number Like: 3.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="mt-4 w-full">
                  {isLoading ? (
                    <RiLoaderLine className="animate-spin h-5 w-5" />
                  ) : (
                    "Relese"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewCoupon;
