import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { courierInfoSchema } from "@/schemas/admins/courier-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CourierInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof courierInfoSchema>) => Promise<void>;
  itemId: string;
  isLoading: boolean;
}

const CourierInfoDialog: React.FC<CourierInfoDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  itemId,
  isLoading,
}) => {
  const courierForm = useForm<z.infer<typeof courierInfoSchema>>({
    resolver: zodResolver(courierInfoSchema),
    defaultValues: {
      courierName: "",
      trackingNumber: "",
      trackingUrl: "",
      shippedAt: new Date().toISOString().slice(0, 16),
    },
  });

  const handleSubmit = async (data: z.infer<typeof courierInfoSchema>) => {
    await onSubmit(data);
    courierForm.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          Update Courier Info <Send className="w-4 h-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Courier Information</DialogTitle>
          <DialogDescription>
            Enter the courier details for item {itemId}.
          </DialogDescription>
        </DialogHeader>
        <Form {...courierForm}>
          <form
            onSubmit={courierForm.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={courierForm.control}
              name="courierName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Courier Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter courier name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={courierForm.control}
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tracking number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={courierForm.control}
              name="trackingUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tracking URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={courierForm.control}
              name="shippedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipped At</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Courier Info"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourierInfoDialog;
