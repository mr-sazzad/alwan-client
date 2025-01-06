"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  PiEnvelope,
  PiHouse,
  PiMapPin,
  PiPhone,
  PiSpinner,
  PiUser,
} from "react-icons/pi";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { addressSchema } from "../../schemas/address-schema";
import {
  FormValues,
  IDistrict,
  IDivision,
  IUnion,
  IUpazila,
} from "../../types";
import { getNameById } from "../utils/get-name-by-id";

import districtData from "../../../public/address/district.json";
import divisionData from "../../../public/address/division.json";
import unionData from "../../../public/address/union.json";
import upazilaData from "../../../public/address/upazila.json";

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

export default function AddressDialog({
  addressModalOpen,
  setAddressModalOpen,
  currentUser,
  title,
  submitHandler,
  selectedAddress,
  isLoading,
  resetForm,
}: IAddressDialogProps) {
  const [filteredDistricts, setFilteredDistricts] = useState<IDistrict[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<IUpazila[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<IUnion[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      recipientName: "",
      email: currentUser?.email || "",
      phone: "",
      altPhone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      streetAddress: "",
      label: "HOME",
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
        label: selectedAddress.label,
        streetAddress: selectedAddress.streetAddress,
      });

      setFilteredDistricts(
        districtData.filter(
          (district) => district.division_id === selectedAddress.divisionId
        )
      );
      setFilteredUpazilas(
        upazilaData.filter(
          (upazila) => upazila.district_id === selectedAddress.districtId
        )
      );
      setFilteredUnions(
        unionData.filter(
          (union) => union.upazilla_id === selectedAddress.upazilaId
        )
      );
    }
  }, [selectedAddress, currentUser, form]);

  const onSubmit = (values: FormValues) => {
    const finalValues: FormValues = {
      ...values,
      email: currentUser?.email || values.email,
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
    }
  };

  return (
    <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
      <DialogContent className="sm:max-w-[600px] hide-scrollbar sm:max-h-[90vh] h-[100vh] overflow-y-auto rounded">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="pl-10"
                      />
                      <PiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
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
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        disabled={!!currentUser}
                        className="pl-10"
                        value={currentUser?.email || field.value}
                      />
                      <PiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
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
                    <div className="relative">
                      <Input
                        placeholder="01234567890"
                        {...field}
                        className="pl-10"
                      />
                      <PiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
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
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="01234567890"
                        {...field}
                        className="pl-10"
                      />
                      <PiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("division") && (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch("district") && (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch("upazila") && (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HOME">Home</SelectItem>
                      <SelectItem value="OFFICE">Office</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <div className="relative">
                      <Textarea
                        placeholder="123 Main St, Apartment 4B"
                        {...field}
                        className="pl-10 pt-2"
                      />
                      <PiMapPin className="absolute left-3 top-3 text-gray-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <PiSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  <PiHouse className="mr-2 h-4 w-4" />
                  Save Address
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
