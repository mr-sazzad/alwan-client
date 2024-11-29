"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  ReturnOrderFormValues,
  returnOrderSchema,
} from "@/schemas/order-return-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ReturnOrderDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (values: ReturnOrderFormValues) => Promise<void>;
  orderQuantity: number;
  orderId: string;
}

export function ReturnOrderDialog({
  open,
  setOpen,
  onSubmit,
  orderQuantity,
  orderId,
}: ReturnOrderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ReturnOrderFormValues>({
    resolver: zodResolver(returnOrderSchema),
    defaultValues: {
      returnReason: "",
      returnNote: "",
      returnQuantity: orderQuantity > 1 ? 1 : undefined,
      confirmText: "",
    },
  });

  const handleSubmit = async (values: ReturnOrderFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      form.reset();
      setOpen(false);
      toast({
        title: "Return Initiated",
        description: "Your return request has been successfully submitted.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting return request:", error);
      toast({
        title: "Error",
        description: "Failed to submit return request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Request to Return Order #{orderId}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please provide the following information to process your return
            request.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="returnReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter return reason" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returnNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {orderQuantity > 1 && (
              <FormField
                control={form.control}
                name="returnQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={orderQuantity}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="confirmText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation</FormLabel>
                  <FormControl>
                    <Input placeholder="Type 'return' to confirm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Return Request"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
