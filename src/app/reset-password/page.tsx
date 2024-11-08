"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import MaxWidth from "@/components/max-width";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const passwordSchema = z.object({
  newPassword: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  confirmPassword: z.string(),
});

export default function ResetPassword() {
  const [showPasswords, setShowPasswords] = useState(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { newPassword, confirmPassword } = useWatch({
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof passwordSchema>) => {
    console.log("Password reset submitted:", values);
    toast({
      title: "Password Reset",
      description: "Your password has been successfully reset.",
    });
  };

  const isFormValid =
    (newPassword?.length ?? 0) >= 5 && newPassword === confirmPassword;

  return (
    <MaxWidth className="mt-[120px]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPasswords ? "text" : "password"}
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPasswords ? "text" : "password"}
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? (
                  <EyeOff className="mr-2 h-4 w-4" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                {showPasswords ? "Hide" : "Show"} Passwords
              </Button>
              <Button type="submit" className="w-full" disabled={!isFormValid}>
                <Lock className="mr-2 h-4 w-4" /> Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MaxWidth>
  );
}
