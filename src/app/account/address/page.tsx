"use client";

import AlertDialogComp from "@/components/alert-dialog/alert-dialog";
import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AddressModal from "@/components/profile/address-update-modal";
import AddressSkeleton from "@/components/skeletons/profile-address-skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useAddNewAddressMutation,
  useDeleteAddressMutation,
  useSetActiveAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/api/address/addressApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/user-api";
import { profileAddressSchema } from "@/schemas/profile-address-schema";
import { IUserData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiOutlineSparkles, HiPlusSmall } from "react-icons/hi2";
import { TbHomeCheck, TbHomeEdit, TbHomeX } from "react-icons/tb";
import { z } from "zod";
import homeIcon from "../../../images/house_4730076.png";

const Address = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);

  const [updateSingleUser, { isLoading: isUserUpdating }] =
    useUpdateSingleUserMutation();
  const [setActiveAddress, { isLoading: isAddressStatusChanging }] =
    useSetActiveAddressMutation();
  const [deleteAddress, { isLoading: isAddressDeleting }] =
    useDeleteAddressMutation();
  const [updateAddress, { isLoading: isAddressUpdating }] =
    useUpdateAddressMutation();
  const [addNewAddress, { isLoading: isAddressAdding }] =
    useAddNewAddressMutation();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as IUserData | null;
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
          description: "Address updated successfully",
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
        description: "Please fill the inputs first then apply changes!",
        variant: "destructive",
      });
      return;
    }

    try {
      let result: any;
      if (selectedAddress) {
        // Update existing address
        result = await updateAddress({
          addressId: selectedAddress.id,
          ...requestedData,
        });
      } else {
        // Add new address
        result = await addNewAddress({
          id: response.data.id,
          ...requestedData,
        });
      }

      if (result?.data.data?.id) {
        setOpen(false);
        toast({
          title: "Success",
          description: "Your information was updated",
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
    <>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
        ]}
        page="Address"
        className="my-3"
      />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl md:font-bold font-semibold">Address</h1>
          <p className="text-sm text-muted-foreground">
            See Your Address Information.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-1 w-full h-[100px] mt-3 bg-gradient-to-r from-green-50 to-green-100"
        onClick={handleAddAddressClick}
      >
        <HiPlusSmall />
        Add address
      </Button>

      {response?.data.addresses?.length ? (
        response.data.addresses.map((address: any) => (
          <div key={address.id}>
            <div className="flex justify-between items-center border rounded mt-5 p-2">
              <div className="flex gap-4 items-center">
                <div>
                  <Image
                    alt="home-icon"
                    src={homeIcon}
                    height={40}
                    width={40}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{address.recipientName}</p>
                    <p className="text-muted-foreground text-sm">
                      {address.phone}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {address.streetAddress}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {address.union}, {address.upazila}, {address.district},{" "}
                    {address.division}
                  </p>
                  <div className="flex flex-start gap-2 mt-1">
                    <p className="text-sm font-medium">{address.label}</p>
                    {address.isDefault && (
                      <p className="font-medium text-sm text-rose-600">
                        Default Shipping & Billing Address
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <BiDotsHorizontalRounded size={20} />
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
                        <span>Set Default</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditAddressClick(address)}
                      >
                        <TbHomeEdit className="mr-2 h-4 w-4" />
                        <span>Update</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedAddress(address);
                          setDialogOpen(true);
                        }}
                      >
                        <TbHomeX className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full h-full items-center sm:mt-0 mt-16">
          <div className="flex flex-col items-center">
            <HiOutlineSparkles size={40} />
            <p className="font-semibold mt-2">Not Found</p>
            <p className="text-muted-foreground">Address not found</p>
          </div>
        </div>
      )}

      <AddressModal
        addressModalOpen={open}
        setAddressModalOpen={setOpen}
        currentUser={response?.data}
        title={selectedAddress ? "Edit your address" : "Add a new address"}
        submitHandler={handler}
        selectedAddress={selectedAddress}
        resetForm={resetForm}
        isLoading={
          isUserUpdating ||
          isAddressAdding ||
          isAddressStatusChanging ||
          isAddressUpdating
        }
      />

      <AlertDialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your address and remove data from our servers."
        buttonText="continue"
        handler={handleAddressDelete}
        loading={isAddressDeleting}
        className="bg-destructive hover:bg-destructive/80"
      />
    </>
  );
};

export default Address;
