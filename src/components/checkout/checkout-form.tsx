"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

// addresses
import { IDistrict, IDivision, IUnion, IUpazila } from "@/types";
import { useState } from "react";
import districtData from "../../../public/address/district.json";
import divisionData from "../../../public/address/division.json";
import unionData from "../../../public/address/union.json";
import upazilaData from "../../../public/address/upazila.json";
import { Textarea } from "../ui/textarea";

interface CheckoutFormProps {
  setSelectedDivisionName: (value: string) => void;
  setSelectedDistrictName: (value: string) => void;
  setSelectedUpazilaName: (value: string) => void;
  setSelectedUnionName: (value: string) => void;
  form: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  setSelectedDivisionName,
  setSelectedDistrictName,
  setSelectedUpazilaName,
  setSelectedUnionName,
  form,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedUnion, setSelectedUnion] = useState<string>("");

  const [filteredDistricts, setFilteredDistricts] = useState<IDistrict[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<IUpazila[]>([]);
  const [filteredUnions, setFilteredUnions] = useState<IUnion[]>([]);

  return (
    <>
      <h3 className="font-medium text-lg">DELIVERY & BILLING INFO</h3>
      <Separator className="max-w-[235px] mb-2" />
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Abdullah" {...field} />
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
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="017******21" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altPhone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Alt Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="018******37" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full">
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const division = divisionData.find(
                        (div) => div.id === value
                      );
                      if (division) {
                        setSelectedDivision(value);
                        setSelectedDivisionName(division.name);

                        const districts = districtData.filter(
                          (district: IDistrict) =>
                            district.division_id === value
                        );

                        setFilteredDistricts(districts);
                        setSelectedDistrict("");
                        field.onChange(value);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Division" />
                      </SelectTrigger>
                    </FormControl>
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
          </div>

          {/* DIstrict */}
          <div className="flex w-full">
            {selectedDivision && (
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>District</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const district = districtData.find(
                          (district) => district.id === value
                        );

                        if (district) {
                          setSelectedDistrict(value);
                          setSelectedDistrictName(district.name);

                          const upazilas = upazilaData.filter(
                            (upazila: IUpazila) => upazila.district_id === value
                          );

                          setFilteredUpazilas(upazilas);
                          setSelectedUpazila("");
                          field.onChange(value);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your District" />
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
            )}
          </div>

          {/* Upazila */}
          <div className="flex w-full">
            {selectedDistrict && (
              <FormField
                control={form.control}
                name="upazila"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Upazilla</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const upazila = upazilaData.find(
                          (upazila) => upazila.id === value
                        );

                        if (upazila) {
                          setSelectedUpazila(value);
                          setSelectedUpazilaName(upazila.name);

                          const unions = unionData.filter(
                            (union: IUnion) => union.upazilla_id === value
                          );

                          setFilteredUnions(unions);
                          setSelectedUnion("");
                          field.onChange(value);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Upazila" />
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
            )}
          </div>

          {/* Union */}
          <div className="flex w-full">
            {selectedUpazila && (
              <FormField
                control={form.control}
                name="union"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Unions</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const union = unionData.find(
                          (union) => union.id === value
                        );

                        if (union) {
                          setSelectedUnionName(union.name);
                        }
                        setSelectedUnion(value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Union" />
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
            )}
          </div>

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Detailed Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please write your address in detail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderNote"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Order Note (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Anything you want to add.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default CheckoutForm;
