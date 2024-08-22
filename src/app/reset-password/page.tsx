"use client";

import MaxWidth from "@/components/max-width";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z.object({
  newPassword: z.string().nonempty({ message: "New password is required" }),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm password is required" }),
});

const ResetPassword = () => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <MaxWidth>
      <div className="my-[100px]">
        <div className="text-2xl font-bold text-center mb-4">
          Reset Password
        </div>
        <div className="flex justify-center">
          <div className="max-w-[350px] w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="outline" className="w-full">
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default ResetPassword;
