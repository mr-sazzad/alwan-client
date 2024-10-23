"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useChangePasswordMutation } from "@/redux/api/auth/auth-api";
import { passwordSchema } from "@/schemas/password-schema";
import { IUser } from "@/types";
import { PiSpinner } from "react-icons/pi";
import { toast } from "../ui/use-toast";

interface ChangePasswordDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChangePasswordDialog = ({ open, setOpen }: ChangePasswordDialogProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [changePassword, { isLoading: isChanging }] =
    useChangePasswordMutation();
  const user = getUserFromLocalStorage() as IUser;

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    try {
      const result = await changePassword({
        ...values,
        email: user.email,
      }).unwrap();
      if (result.success) {
        toast({
          title: "Password Changed",
          description: "Your password has been successfully changed.",
        });
        setOpen(false);
        form.reset();
      } else {
        toast({
          title: "Password Change Failed",
          description: "Password change failed due to some error",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "Password change failed due to some error",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg rounded w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-center mb-2">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your current password and a new password below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="current password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="link"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showCurrentPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPasswords ? "text" : "password"}
                        placeholder="new password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="link"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPasswords(!showNewPasswords)}
                      >
                        {showNewPasswords ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showNewPasswords ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showNewPasswords ? "text" : "password"}
                      placeholder="new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isChanging}>
              {isChanging ? (
                <div className="flex items-center justify-center gap-2">
                  <PiSpinner className="animate-spin" />
                  <p>Updating...</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="mr-2 h-4 w-4" /> Change Password{" "}
                </div>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;