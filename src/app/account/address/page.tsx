"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineSparkles, HiPlusSmall } from "react-icons/hi2";
import { TbHomeCheck, TbHomeEdit } from "react-icons/tb";
import { z } from "zod";

import AlertDialogComp from "../../../components/alert-dialog/alert-dialog";
import AddressDialog from "../../../components/profile/address-dialog";
import AddressSkeleton from "../../../components/skeletons/profile-address-skeleton";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { toast } from "../../../components/ui/use-toast";
import { getUserFromLocalStorage } from "../../../helpers/jwt";
import {
  useAddNewAddressMutation,
  useDeleteAddressMutation,
  useSetActiveAddressMutation,
  useUpdateAddressMutation,
} from "../../../redux/api/address/addressApi";
import { useGetSingleUserQuery } from "../../../redux/api/users/user-api";
import { profileAddressSchema } from "../../../schemas/profile-address-schema";
import { IUser } from "../../../types";

import { Earth, MapPin, Search, Trash2 } from "lucide-react";

export default function Address() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [userData, setUserData] = useState<IUser | null>(null);

  const [setActiveAddress] = useSetActiveAddressMutation();
  const [deleteAddress, { isLoading: isAddressDeleting }] =
    useDeleteAddressMutation();
  const [updateAddress, { isLoading: isAddressUpdating }] =
    useUpdateAddressMutation();
  const [addNewAddress, { isLoading: isNewAddressAdding }] =
    useAddNewAddressMutation();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as IUser | null;
    if (!currentUserData) {
      router.back();
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetSingleUserQuery(userData?.userId ?? "", {
    skip: !userData?.userId,
  });

  if (isLoading) {
    return <AddressSkeleton />;
  }

  const sortedAddresses = response?.data.addresses
    ? [...response.data.addresses].sort((a, b) => {
        if (a.isDefault === b.isDefault) {
          return (
            response.data.addresses.indexOf(a) -
            response.data.addresses.indexOf(b)
          );
        }
        return a.isDefault ? -1 : 1;
      })
    : [];

  const handleAddAddressClick = () => {
    setSelectedAddress(null);
    setOpen(true);
  };

  const handleEditAddressClick = (address: any) => {
    setSelectedAddress(address);
    setOpen(true);
  };

  const handleSetActiveAddress = async (address: any) => {
    try {
      const result = await setActiveAddress({
        userId: response?.data.id,
        addressId: address.id,
      }).unwrap();

      if (result.status === 200) {
        toast({
          title: "Success",
          description: "Address set as default successfully",
        });
        refetch();
      } else {
        throw new Error("Failed to update address");
      }
    } catch (error) {
      toast({
        title: "Action Denied",
        description: "Something went wrong! Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAddressDelete = async () => {
    try {
      const result = await deleteAddress({
        userId: response?.data.id,
        addressId: selectedAddress.id,
      }).unwrap();

      if (result.status === 200) {
        toast({
          title: "Success",
          description: "Address deleted successfully",
        });
        setDialogOpen(false);
        refetch();
      } else {
        throw new Error(result.message || "Failed to delete address");
      }
    } catch (error: any) {
      toast({
        title: "Action Denied",
        description: error.message || "Something went wrong! Please try again.",
        variant: "destructive",
      });
    }
  };

  const handler = async (values: z.infer<typeof profileAddressSchema>) => {
    const requestedData = {
      recipientName:
        values.recipientName || selectedAddress?.recipientName || "",
      label: values.label || selectedAddress?.label || "",
      phone: values.phone || selectedAddress?.phone || "",
      division: values.division || selectedAddress?.division || "",
      divisionId: values.divisionId,
      district: values.district || selectedAddress?.district || "",
      districtId: values.districtId,
      upazila: values.upazila || selectedAddress?.upazila || "",
      upazilaId: values.upazilaId,
      union: values.union || selectedAddress?.union || "",
      unionId: values.unionId,
      streetAddress:
        values.streetAddress || selectedAddress?.streetAddress || "",
    };

    if (
      !requestedData.recipientName ||
      !requestedData.phone ||
      !requestedData.division ||
      !requestedData.district ||
      !requestedData.upazila ||
      !requestedData.union ||
      !requestedData.streetAddress
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields before applying changes!",
        variant: "destructive",
      });
      return;
    }

    try {
      let result: any;
      if (selectedAddress) {
        result = await updateAddress({
          addressId: selectedAddress.id,
          ...requestedData,
        });
      } else {
        result = await addNewAddress({
          id: response.data.id,
          ...requestedData,
        });
      }

      if (result?.data.data?.id) {
        setOpen(false);
        toast({
          title: "Success",
          description: selectedAddress
            ? "Address updated successfully"
            : "New address added successfully",
        });
        refetch();
        setResetForm(true);
      } else {
        throw new Error("Failed to update address");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-medium text-primary">
            Manage Addresses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="flex items-center justify-center gap-2 w-full h-12 mb-6 font-medium rounded"
            onClick={handleAddAddressClick}
            disabled={sortedAddresses?.length === 2}
          >
            <HiPlusSmall className="h-5 w-5" />
            Add New Address
          </Button>

          {sortedAddresses?.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {sortedAddresses.map((address: any) => (
                <Card key={address.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-10 w-10 flex justify-center items-center rounded bg-primary/10">
                        <Earth className="h-8 w-8 p-1 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium text-primary capitalize">
                          {address.recipientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.phone}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mb-1 text-muted-foreground">
                      {address.streetAddress}
                    </p>
                    <p className="text-sm mb-2 text-muted-foreground">
                      {address.union}, {address.upazila}, {address.district},{" "}
                      {address.division}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                        {address.label}
                      </span>
                      {address.isDefault && (
                        <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 dark:text-emerald-400 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="mt-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                        >
                          <HiOutlineSparkles className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            disabled={address.isDefault}
                            onClick={() => handleSetActiveAddress(address)}
                          >
                            <TbHomeCheck className="mr-2 h-4 w-4" />
                            <span>Set as Default</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditAddressClick(address)}
                          >
                            <TbHomeEdit className="mr-2 h-4 w-4" />
                            <span>Edit Address</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedAddress(address);
                              setDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">Delete Address</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="text-center">
                <Search className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No addresses</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get started by creating a new address.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AddressDialog
        addressModalOpen={open}
        setAddressModalOpen={setOpen}
        currentUser={response?.data}
        title={selectedAddress ? "Edit your address" : "Add a new address"}
        submitHandler={handler}
        selectedAddress={selectedAddress}
        resetForm={resetForm}
        isLoading={isAddressUpdating || isNewAddressAdding}
      />

      <AlertDialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your address and remove data from our servers."
        buttonText="Delete Address"
        handler={handleAddressDelete}
        loading={isAddressDeleting}
        className="bg-red-500 hover:bg-red-600 text-white"
      />
    </div>
  );
}
