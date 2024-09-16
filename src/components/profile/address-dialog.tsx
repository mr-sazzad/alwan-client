"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinner } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { addressSchema } from "@/schemas/address-schema";
import { FormValues, IDistrict, IDivision, IUnion, IUpazila } from "@/types";

import districtData from "../../../public/address/district.json";
import divisionData from "../../../public/address/division.json";
import unionData from "../../../public/address/union.json";
import upazilaData from "../../../public/address/upazila.json";
import { getNameById } from "../utils/get-name-by-id";

interface IAddressDialogProps {
  addressModalOpen: boolean;
  setAddressModalOpen: (open: boolean) => void;
  currentUser: any;
  title: string;
  submitHandler: (values: FormValues) => void;
  selectedAddress: any;
  isLoading: boolean;
  resetForm: boolean;
}

const AddressDialog: React.FC<IAddressDialogProps> = ({
  addressModalOpen,
  setAddressModalOpen,
  currentUser,
  title,
  submitHandler,
  selectedAddress,
  isLoading,
  resetForm,
}) => {
  const [filteredDistricts, setFilteredDistricts] = useState<IDistrict[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<IUpazila[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<IUnion[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      recipientName: "",
      email: "",
      phone: "",
      altPhone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      streetAddress: "",
    },
  });

  useEffect(() => {
    if (selectedAddress) {
      form.reset({
        recipientName: selectedAddress.recipientName,
        email: currentUser?.email || "",
        phone: selectedAddress.phone,
        altPhone: selectedAddress.altPhone || "",
        division: selectedAddress.divisionId,
        district: selectedAddress.districtId,
        upazila: selectedAddress.upazilaId,
        union: selectedAddress.unionId,
        streetAddress: selectedAddress.streetAddress,
      });

      const districts = districtData.filter(
        (district) => district.division_id === selectedAddress.divisionId
      );
      setFilteredDistricts(districts);

      const upazilas = upazilaData.filter(
        (upazila) => upazila.district_id === selectedAddress.districtId
      );
      setFilteredUpazilas(upazilas);

      const unions = unionData.filter(
        (union) => union.upazilla_id === selectedAddress.upazilaId
      );
      setFilteredUnions(unions);
    }
  }, [selectedAddress, currentUser, form]);

  const onSubmit = (values: FormValues) => {
    const finalValues: FormValues = {
      ...values,
      division: getNameById(values.division, divisionData) || "",
      divisionId: values.division,
      district: getNameById(values.district, districtData) || "",
      districtId: values.district,
      upazila: getNameById(values.upazila, upazilaData) || "",
      upazilaId: values.upazila,
      union: getNameById(values.union, unionData) || "",
      unionId: values.union,
    };

    submitHandler(finalValues);

    if (resetForm) {
      form.reset();
      console.log("Form reset");
    }
  };

  return (
    <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
      <DialogContent className="rounded h-[90vh] overflow-y-auto hide-scrollbar max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Form validation errors:", errors);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
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
                    <Input placeholder="01234567890" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="altPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01234567890" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const districts = districtData.filter(
                        (district) => district.division_id === value
                      );
                      setFilteredDistricts(districts);
                      form.setValue("district", "");
                      form.setValue("upazila", "");
                      form.setValue("union", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Divisions</SelectLabel>
                        {divisionData.map((division: IDivision) => (
                          <SelectItem key={division.id} value={division.id}>
                            {division.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const upazilas = upazilaData.filter(
                        (upazila) => upazila.district_id === value
                      );
                      setFilteredUpazilas(upazilas);
                      form.setValue("upazila", "");
                      form.setValue("union", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Districts</SelectLabel>
                        {filteredDistricts.map((district: IDistrict) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="upazila"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upazila</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const unions = unionData.filter(
                        (union) => union.upazilla_id === value
                      );
                      setFilteredUnions(unions);
                      form.setValue("union", "");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select upazila" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Upazilas</SelectLabel>
                        {filteredUpazilas.map((upazila: IUpazila) => (
                          <SelectItem key={upazila.id} value={upazila.id}>
                            {upazila.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="union"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Union</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select union" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unions</SelectLabel>
                        {filteredUnions.map((union: IUnion) => (
                          <SelectItem key={union.id} value={union.id}>
                            {union.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Main St, Apartment 4B"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              onClick={() =>
                console.log("Form state before submission:", form.getValues())
              }
            >
              {isLoading ? (
                <>
                  <PiSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Address"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
