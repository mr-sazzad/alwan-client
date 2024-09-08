import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormValues } from "@/types";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import districtData from "../../../../public/address/district.json";
import divisionData from "../../../../public/address/division.json";
import unionData from "../../../../public/address/union.json";
import upazilaData from "../../../../public/address/upazila.json";

interface AddressInfoProps {
  setSelectedDivisionName: (name: string) => void;
  setSelectedDistrictName: (name: string) => void;
  setSelectedUpazilaName: (name: string) => void;
  setSelectedUnionName: (name: string) => void;
  isLoggedIn: boolean;
  userAddresses: Address[];
  defaultAddress: Address | null;
}

interface Address {
  id: string;
  recipientName: string;
  phone: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionId: string;
  streetAddress: string;
}

interface LocationData {
  id: string;
  name: string;
  division_id?: string;
  district_id?: string;
  upazilla_id?: string;
}

const AddressInfo: React.FC<AddressInfoProps> = ({
  setSelectedDivisionName,
  setSelectedDistrictName,
  setSelectedUpazilaName,
  setSelectedUnionName,
  isLoggedIn,
  userAddresses,
  defaultAddress,
}) => {
  const { control, setValue, watch, trigger } = useFormContext<FormValues>();

  const watchedDivision = watch("division");
  const watchedDistrict = watch("district");
  const watchedUpazila = watch("upazila");
  const watchedUnion = watch("union");
  const watchedStreetAddress = watch("streetAddress");
  const watchedRecipientName = watch("recipientName");
  const watchedPhone = watch("phone");

  useEffect(() => {
    if (isLoggedIn && defaultAddress) {
      setValue("recipientName", defaultAddress.recipientName);
      setValue("phone", defaultAddress.phone);
      setValue("division", defaultAddress.divisionId);
      setValue("district", defaultAddress.districtId);
      setValue("upazila", defaultAddress.upazilaId);
      setValue("union", defaultAddress.unionId);
      setValue("streetAddress", defaultAddress.streetAddress);
    }
  }, [isLoggedIn, defaultAddress, setValue]);

  const filteredDistricts = useMemo(
    () =>
      districtData.filter(
        (district) => district.division_id === watchedDivision
      ),
    [watchedDivision]
  );

  const filteredUpazilas = useMemo(
    () =>
      upazilaData.filter((upazila) => upazila.district_id === watchedDistrict),
    [watchedDistrict]
  );

  const filteredUnions = useMemo(
    () => unionData.filter((union) => union.upazilla_id === watchedUpazila),
    [watchedUpazila]
  );

  useEffect(() => {
    const division = divisionData.find((div) => div.id === watchedDivision);
    if (division) {
      setSelectedDivisionName(division.name);
    }
  }, [watchedDivision, setSelectedDivisionName]);

  useEffect(() => {
    const district = districtData.find((dist) => dist.id === watchedDistrict);
    if (district) {
      setSelectedDistrictName(district.name);
    }
  }, [watchedDistrict, setSelectedDistrictName]);

  useEffect(() => {
    const upazila = upazilaData.find((upz) => upz.id === watchedUpazila);
    if (upazila) {
      setSelectedUpazilaName(upazila.name);
    }
  }, [watchedUpazila, setSelectedUpazilaName]);

  useEffect(() => {
    const union = unionData.find((un) => un.id === watchedUnion);
    if (union) {
      setSelectedUnionName(union.name);
    }
  }, [watchedUnion, setSelectedUnionName]);

  const isFormValid = () => {
    return (
      watchedRecipientName &&
      watchedPhone &&
      watchedDivision &&
      watchedDistrict &&
      watchedUpazila &&
      watchedUnion &&
      watchedStreetAddress
    );
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="recipientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipient Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter recipient name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="division"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Division</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Your Division" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {divisionData.map((division) => (
                  <SelectItem key={division.id} value={division.id}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {watchedDivision && (
        <FormField
          control={control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your District" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredDistricts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {watchedDistrict && (
        <FormField
          control={control}
          name="upazila"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upazila</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your Upazila" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredUpazilas.map((upazila) => (
                    <SelectItem key={upazila.id} value={upazila.id}>
                      {upazila.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {watchedUpazila && (
        <FormField
          control={control}
          name="union"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Union</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your Union" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredUnions.map((union) => (
                    <SelectItem key={union.id} value={union.id}>
                      {union.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control}
        name="streetAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Detailed Address</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please write your address in detail"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        onClick={() => trigger()}
        disabled={!isFormValid()}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};

export default AddressInfo;
