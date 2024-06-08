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

import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { profileAddressSchema } from "@/schemas/profile-address-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoShieldCheck } from "react-icons/go";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";

interface IAddressModalProps {
  addressModalOpen: boolean;
  setAddressModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddressModal: React.FC<IAddressModalProps> = ({
  addressModalOpen,
  setAddressModalOpen,
}) => {
  const [userData, setUserData] = useState<IUserData>();
  const [address, setAddress] = useState("");
  const { data: user, isLoading } = useGetSingleUserQuery(userData?.userId);

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

  const onSubmit = () => {
    console.log("hello");
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
                        onValueChange={(value) => setAddress(value)}
                        defaultValue={field.value}
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
                      <Textarea
                        id="details address"
                        placeholder="write your full address"
                        className="col-span-3"
                      />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              <div className="flex justify-center items-center gap-2">
                <GoShieldCheck /> <span>Save Address</span>
              </div>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
