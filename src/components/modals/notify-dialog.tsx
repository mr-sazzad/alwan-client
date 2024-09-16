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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAddToSubscriptionMutation } from "@/redux/api/notification-subscription/notificationSubscriptionApi";
import { notificationSchema } from "@/schemas/notification-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NotificationDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  productName: string;
}

export default function NotificationDialog({
  open,
  setOpen,
  productId,
  productName,
}: NotificationDialogProps) {
  const [addToSubscription, { isLoading }] = useAddToSubscriptionMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof notificationSchema>) => {
    try {
      const result = await addToSubscription({
        productId,
        email: data.email,
      }).unwrap();

      if (result.data.id) {
        toast({
          title: "Subscription Successful",
          description: `You'll be notified when ${productName} is back in stock.`,
          variant: "default",
        });
        setOpen(false);
        form.reset();
      } else {
        toast({
          title: "Subscription Failed",
          description:
            "There was an error subscribing to notifications. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description:
          "There was an error subscribing to notifications. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-start">
            Get Notified
          </DialogTitle>
          <DialogDescription className="text-base text-start">
            Be the first to know when {productName} is back in stock!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Notify Me
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
