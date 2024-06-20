import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { cities } from "@/static/cities";
import { IUserData } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/user-api";
import { profileAddressSchema } from "@/schemas/profile-address-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { toast } from "../ui/use-toast";

import { GoShieldCheck } from "react-icons/go";
import { PiSpinner } from "react-icons/pi";

interface IAddressModalProps {
  addressModalOpen: boolean;
  setAddressModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddressModal: React.FC<IAddressModalProps> = ({
  addressModalOpen,
  setAddressModalOpen,
}) => {
  const [userData, setUserData] = useState<IUserData>();
  const { data: user, isLoading } = useGetSingleUserQuery(userData?.userId);
  const [updateSingleUser, { isLoading: isUserUpdating }] =
    useUpdateSingleUserMutation();

  const form = useForm<z.infer<typeof profileAddressSchema>>({
    resolver: zodResolver(profileAddressSchema),
    defaultValues: {
      shippingDistrict: "",
      shippingAddress: "",
    },
  });

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
    } else {
      setUserData(currentUserData);
    }
  }, []);

  useEffect(() => {
    if (user) {
      form.reset({
        shippingDistrict: user.shippingDistrict || "",
        shippingAddress: user.shippingAddress || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof profileAddressSchema>) => {
    const requestedData = {
      id: user.id,
      shippingDistrict: values.shippingDistrict,
      shippingAddress: values.shippingAddress,
    };

    if (values.shippingDistrict === "" || values.shippingAddress === "") {
      toast({
        title: "Error",
        description: "Please fill the inputs first then apply changes!",
        variant: "destructive",
      });

      return;
    }

    const result: any = await updateSingleUser(requestedData);
    if (!result.data.id) {
      toast({
        title: "Error",
        description: "Something went wrong please try again",
        variant: "destructive",
      });
    } else {
      setAddressModalOpen(false);
      toast({
        title: "Successfull",
        description: "Your information was updated",
      });
    }
  };
  return (
    <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit your address</DialogTitle>
          <DialogDescription>
            Please dubble check your address before update the address.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="shippingDistrict"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-4">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormLabel>Select your city</FormLabel>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Your City" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem value={city.value} key={city.id}>
                              {city.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-4">
                      <FormLabel
                        htmlFor="details address"
                        className="text-start"
                      >
                        Details address
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="details address"
                          placeholder="write your full address"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isUserUpdating}>
              {isUserUpdating ? (
                <PiSpinner className="animate-spin" size={18} />
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <GoShieldCheck /> <span>Save</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
