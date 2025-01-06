"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, MailWarning, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { getUserFromLocalStorage } from "../../helpers/jwt";
import { useDeleteUserMutation } from "../../redux/api/auth/auth-api";
import { IUser } from "../../types";
import { toast } from "../ui/use-toast";

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const deleteUserSchema = z.object({
  currentPassword: z.string().min(1, { message: "password is required" }),
});

const DeleteUserDialog = ({ open, setOpen }: DeleteUserDialogProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const user = getUserFromLocalStorage() as IUser;

  const form = useForm<z.infer<typeof deleteUserSchema>>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof deleteUserSchema>) => {
    try {
      const result = await deleteUser({
        ...values,
        userId: user.userId,
      }).unwrap();
      if (result.success) {
        toast({
          title: "Account Deleted",
          description: "Your account has been successfully deleted.",
        });
        setOpen(false);
        form.reset();
      } else {
        toast({
          title: "Account Deletion Failed",
          description: "Account deletion failed due to some error",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Account Deletion Failed",
        description: "Account deletion failed due to some error",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg rounded w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-center mb-2">
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-center">
            Deleting your account will permanently remove all your data.
          </DialogDescription>
        </DialogHeader>

        <div className="flex p-4 border rounded-lg">
          <MailWarning className="w-8 h-8 mr-2 flex-shrink-0 text-destructive p-2 rounded-lg bg-destructive/10" />
          <p className="text-sm">
            Deleting your account is permanent. All your data will be wiped out
            immediately and you won&apos;t be able to get it back.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="write your password"
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

            <Button
              type="submit"
              className="w-full"
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? (
                <div className="flex items-center justify-center gap-2">
                  <PiSpinner className="animate-spin" />
                  <p>Deleting...</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Trash2 className="mr-2 h-4 w-4" /> Permanently Delete Account
                </div>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
