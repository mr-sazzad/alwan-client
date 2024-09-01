import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormValues } from "@/types";
import { useEffect, useState } from "react";
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
}) => {
  const { control, setValue, watch } = useFormContext<FormValues>();
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState<LocationData[]>(
    []
  );
  const [filteredUpazilas, setFilteredUpazilas] = useState<LocationData[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<LocationData[]>([]);

  const watchedDivision = watch("division");
  const watchedDistrict = watch("district");
  const watchedUpazila = watch("upazila");
  const watchedUnion = watch("union");
  const watchedStreetAddress = watch("streetAddress");

  useEffect(() => {
    if (watchedDivision) {
      const division = divisionData.find((div) => div.id === watchedDivision);
      if (division) {
        setSelectedDivision(watchedDivision);
        setSelectedDivisionName(division.name);
        setFilteredDistricts(
          districtData.filter(
            (district) => district.division_id === watchedDivision
          )
        );
      }
    }
  }, [watchedDivision, setSelectedDivisionName]);

  useEffect(() => {
    if (watchedDistrict) {
      const district = districtData.find((dist) => dist.id === watchedDistrict);
      if (district) {
        setSelectedDistrict(watchedDistrict);
        setSelectedDistrictName(district.name);
        setFilteredUpazilas(
          upazilaData.filter(
            (upazila) => upazila.district_id === watchedDistrict
          )
        );
      }
    }
  }, [watchedDistrict, setSelectedDistrictName]);

  useEffect(() => {
    if (watchedUpazila) {
      const upazila = upazilaData.find((upz) => upz.id === watchedUpazila);
      if (upazila) {
        setSelectedUpazila(watchedUpazila);
        setSelectedUpazilaName(upazila.name);
        setFilteredUnions(
          unionData.filter((union) => union.upazilla_id === watchedUpazila)
        );
      }
    }
  }, [watchedUpazila, setSelectedUpazilaName]);

  useEffect(() => {
    if (watchedUnion) {
      const union = unionData.find((un) => un.id === watchedUnion);
      if (union) {
        setSelectedUnionName(union.name);
      }
    }
  }, [watchedUnion, setSelectedUnionName]);

  return (
    <div className="space-y-4">
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
      {selectedDivision && (
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
      {selectedDistrict && (
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
      {selectedUpazila && (
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
    </div>
  );
};

export default AddressInfo;
