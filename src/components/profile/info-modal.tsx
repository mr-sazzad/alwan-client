import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateSingleUserMutation } from "@/redux/api/users/user-api";
import { profileInfoSchema } from "@/schemas/profile-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { GoShieldCheck } from "react-icons/go";
import { PiSpinner } from "react-icons/pi";
import { toast } from "../ui/use-toast";

interface IInfoModalProps {
  infoModalOpen: boolean;
  setInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: any;
}

const InfoModal: React.FC<IInfoModalProps> = ({
  infoModalOpen,
  setInfoModalOpen,
  currentUser: user,
}) => {
  const [updateSingleUser, { isLoading: isUserUpdating }] =
    useUpdateSingleUserMutation();

  const form = useForm<z.infer<typeof profileInfoSchema>>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      username: "",
      phone: "",
      altPhone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user?.data.username || "",
        phone: user?.data.phone || "",
        altPhone: user?.data.altPhone || "",
        email: user?.data.email || "",
      });
    }
  }, [user, form]);

  console.log("USER FROM PROFILE =>", user);

  const onSubmit = async (values: z.infer<typeof profileInfoSchema>) => {
    console.log("VALUES FROM PROFILE =>", values);

    const requestedData = {
      username: values.username || user?.data.username,
      email: user.email || values.email,
      phone: values.phone || user?.data.phone,
      altPhone: values.altPhone || user?.data.altPhone,
    };

    const result: any = await updateSingleUser({
      id: user?.data.id,
      ...requestedData,
    });

    if (!result?.data.data.id) {
      toast({
        title: "Error",
        description: "Something went wrong please try again",
        variant: "destructive",
      });
    } else {
      setInfoModalOpen(false);
      toast({
        title: "Successfull",
        description: "Your information was updated",
      });
    }
  };

  return (
    <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
      <DialogContent className="sm:max-w-[500px] rounded">
        <DialogHeader>
          <DialogTitle>Edit your information</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdullah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01836****64" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01836****6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <span className="text-muted-foreground"> (read only)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="text-destructive" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isUserUpdating}
              >
                {isUserUpdating ? (
                  <PiSpinner className="animate-spin" />
                ) : (
                  <div className="w-full flex items-center gap-2 justify-center">
                    <GoShieldCheck className="font-bold" />
                    <p>Save</p>
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
