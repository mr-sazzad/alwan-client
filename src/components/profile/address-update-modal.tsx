import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDistrict, IDivision, IUnion, IUpazila } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import districtData from "../../../public/address/district.json";
import divisionData from "../../../public/address/division.json";
import unionData from "../../../public/address/union.json";
import upazilaData from "../../../public/address/upazila.json";

import { profileAddressSchema } from "@/schemas/profile-address-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { toast } from "../ui/use-toast";

import { PiSpinner } from "react-icons/pi";
import { getNameById } from "../utils/get-name-by-id";

interface IAddressModalProps {
  addressModalOpen: boolean;
  setAddressModalOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: any;
  title: string;
  description: string;
  submitHandler: (values: z.infer<typeof profileAddressSchema>) => void;
  selectedAddress: any;
  isLoading: boolean;
  resetForm: boolean;
}

const AddressModal: React.FC<IAddressModalProps> = ({
  addressModalOpen,
  setAddressModalOpen,
  currentUser: user,
  title,
  description,
  submitHandler,
  selectedAddress,
  isLoading,
  resetForm,
}) => {
  const [filteredDistricts, setFilteredDistricts] = useState<IDistrict[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<IUpazila[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<IUnion[]>([]);

  const form = useForm<z.infer<typeof profileAddressSchema>>({
    resolver: zodResolver(profileAddressSchema),
    defaultValues: {
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
        division: selectedAddress.divisionId,
        district: selectedAddress.districtId,
        upazila: selectedAddress.upazilaId,
        union: selectedAddress.union,
        streetAddress: selectedAddress.streetAddress,
      });

      // Filter districts based on selected division
      const districts = districtData.filter(
        (district) => district.division_id === selectedAddress.divisionId
      );
      setFilteredDistricts(districts);

      // Filter upazilas based on selected district
      const upazilas = upazilaData.filter(
        (upazila) => upazila.district_id === selectedAddress.districtId
      );
      setFilteredUpazilas(upazilas);

      // Filter unions based on selected upazila
      const unions = unionData.filter(
        (union) => union.upazilla_id === selectedAddress.upazilaId
      );
      setFilteredUnions(unions);
    }
  }, [selectedAddress, form]);

  const onSubmit = (values: z.infer<typeof profileAddressSchema>) => {
    const divisionName = getNameById(values.division, divisionData) || "";
    const districtName = getNameById(values.district, districtData) || "";
    const upazilaName = getNameById(values.upazila, upazilaData) || "";
    const unionName = getNameById(values.union, unionData) || "";

    const finalValues = {
      division: divisionName,
      divisionId: values.division,
      district: districtName,
      districtId: values.district,
      upazila: upazilaName,
      upazilaId: values.upazila,
      union: unionName,
      streetAddress: values.streetAddress || "",
    };

    if (
      selectedAddress &&
      finalValues.division === selectedAddress.division &&
      finalValues.district === selectedAddress.district &&
      finalValues.upazila === selectedAddress.upazila &&
      finalValues.union === selectedAddress.union &&
      finalValues.streetAddress === selectedAddress.streetAddress
    ) {
      toast({
        title: "Error",
        description: "No changes detected",
        variant: "destructive",
      });
      return;
    }

    submitHandler(finalValues);
    if (resetForm) {
      form.reset();
    }
  };

  return (
    <Dialog open={addressModalOpen} onOpenChange={setAddressModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          <SelectItem value={division.id} key={division.id}>
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
                        <SelectLabel>District</SelectLabel>
                        {filteredDistricts.map((district: IDistrict) => (
                          <SelectItem value={district.id} key={district.id}>
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
                        <SelectLabel>Upazila</SelectLabel>
                        {filteredUpazilas.map((upazila: IUpazila) => (
                          <SelectItem value={upazila.id} key={upazila.id}>
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
                        <SelectLabel>Union</SelectLabel>
                        {filteredUnions.map((union: IUnion) => (
                          <SelectItem value={union.id} key={union.id}>
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
                  <FormLabel>Exact Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., House # 123, Road # 456, ABC Area"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-8 flex items-center justify-end gap-2">
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading && <PiSpinner className="animate-spin" />}
                {selectedAddress ? "Update" : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddressModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
