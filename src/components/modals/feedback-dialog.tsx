"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddFeedbackMutation } from "@/redux/api/feedback/feedbackApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegMeh, FaRegSadTear, FaRegSmile } from "react-icons/fa";
import { PiSpinner } from "react-icons/pi";
import * as z from "zod";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
  message: z.string().min(10, {
    message: "message must be at least 10 characters.",
  }),
  rating: z
    .number()
    .min(1, { message: "Please choose a rating" })
    .max(3, { message: "Please choose a rating" }),
});

interface FeedbackDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, setOpen }) => {
  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      rating: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result: any = await addFeedback(values);

      console.log(result);

      if (!result.data.data.id) {
        toast({
          title: "Feedback Submission",
          description: "Failed to submit feedback",
        });
      } else {
        toast({
          title: "Feedback Submission",
          description: "Feedback submitted successfully",
        });
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Feedback Submission",
        description: "Failed to submit feedback",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="mb-2">Leave Feedback</DialogTitle>
          <DialogDescription>
            We&apos;d love to hear what went well or how we can improve the
            product experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide more details about your feedback"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        {[
                          {
                            value: 1,
                            icon: FaRegSadTear,
                            activeColor: "text-red-500",
                          },
                          {
                            value: 2,
                            icon: FaRegMeh,
                            activeColor: "text-yellow-500",
                          },
                          {
                            value: 3,
                            icon: FaRegSmile,
                            activeColor: "text-green-500",
                          },
                        ].map(({ value, icon: Icon, activeColor }) => (
                          <Button
                            key={value}
                            type="button"
                            variant="outline"
                            className={`p-0 w-9 h-9 ${
                              field.value === value ? "ring-1 ring-primary" : ""
                            }`}
                            onClick={() => field.onChange(value)}
                          >
                            <div
                              className={`flex items-center justify-center w-full h-full rounded-sm ${
                                field.value === value
                                  ? activeColor
                                  : "text-muted-foreground"
                              }`}
                            >
                              <Icon size={18} />
                            </div>
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <PiSpinner className="animate-spin w-[51px]" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
