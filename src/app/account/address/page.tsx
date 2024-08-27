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
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useAddNewAddressMutation,
  useDeleteAddressMutation,
  useSetActiveAddressMutation,
} from "@/redux/api/address/addressApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/user-api";
import { profileAddressSchema } from "@/schemas/profile-address-schema";
import { IUserData } from "@/types";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiHome } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import {
  HiOutlineSparkles,
  HiOutlineTrash,
  HiPlusSmall,
} from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { z } from "zod";

const Address = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [userData, setUserData] = useState<IUserData>();

  const [updateSingleUser, { isLoading: isUserUpdating }] =
    useUpdateSingleUserMutation();
  const [setActiveAddress, { isLoading: isAddressUpdating }] =
    useSetActiveAddressMutation();
  const [deleteAddress, { isLoading: isAddressDeleting }] =
    useDeleteAddressMutation();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      console.log("User not found");
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetSingleUserQuery(userData?.userId);
  const [addNewAddress, { isLoading: isAddressAdding }] =
    useAddNewAddressMutation();

  if (isLoading) {
    return <AddressSkeleton />;
  }

  console.log("USER FROM ADDRESS PAGE =>", user);

  const handleAddAddressClick = () => {
    setSelectedAddress(null);
    setOpen(true);
  };

  const handleEditAddressClick = (address: any) => {
    setSelectedAddress(address);
    setOpen(true);
  };

  const handleSetActiveAddress = async (address: any) => {
    const result: any = await setActiveAddress({
      userId: user?.data.id,
      addressId: address.id,
    });

    if (result.data.status !== 200) {
      toast({
        title: "Action Denied",
        description: "Something went wrong! Please try again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Address updated successfully",
      });

      refetch();
    }
  };

  const handleAddressDelete = async () => {
    const result: any = await deleteAddress({
      userId: user?.data.id,
      addressId: selectedAddress.id,
    });

    if (result.data.message === "Cannot delete the active address.") {
      toast({
        title: "Action Denied",
        description:
          "The active address cannot be deleted. Please set another address as active before attempting to delete this one.",
        variant: "destructive",
      });
    } else if (result.data.status !== 200) {
      toast({
        title: "Action Denied",
        description: "Something went wrong! Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
      setDialogOpen(false);
    }
  };

  const handler = async (values: z.infer<typeof profileAddressSchema>) => {
    const requestedData = {
      division: values.division || selectedAddress?.division || "",
      // divisionId: values.division,
      district: values.district || selectedAddress?.district || "",
      // districtId: values.district,
      upazila: values.upazila || selectedAddress?.upazila || "",
      // upazilaId: values.upazila,
      union: values.union || selectedAddress?.union || "",
      streetAddress:
        values.streetAddress || selectedAddress?.streetAddress || "",
    };

    console.log("REQUESTED DATA =>", requestedData);

    if (!requestedData.division || !requestedData.district) {
      toast({
        title: "Error",
        description: "Please fill the inputs first then apply changes!",
        variant: "destructive",
      });
      return;
    }

    let result: any;
    if (selectedAddress) {
      // Update existing address
      result = await updateSingleUser({
        id: user.id,
        addressId: selectedAddress.id,
        ...requestedData,
      });
    } else {
      // Add new address
      result = await addNewAddress({
        id: user?.data.id,
        ...requestedData,
      });
    }

    if (!result.data.data.id) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } else {
      setOpen(false);
      toast({
        title: "Success",
        description: "Your information was updated",
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
        className="mb-3"
      />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl md:font-bold font-semibold">Address</h1>
          <p className="text-sm text-muted-foreground">
            See Your Address Information.
          </p>
        </div>

        <Button
          variant="outline"
          disabled={user?.data.addresses.length > 1}
          className="flex items-center gap-1"
          onClick={handleAddAddressClick}
        >
          <HiPlusSmall />
          Add address
        </Button>
      </div>

      {user?.data.addresses.length ? (
        user?.data.addresses.map((adrs: any) => (
          <div key={adrs.address.id} className="relative">
            {user.data.activeAddressId === adrs.address.id && (
              <div className="absolute top-4 right-16 p-1 px-2 text-green-600 bg-green-50 flex gap-1 items-center rounded-md">
                <BiHome size={18} />
                <p className="font-medium">Delivery Address</p>
              </div>
            )}
            <div className="border rounded mt-5 p-2">
              <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Address Book</h3>
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
                          disabled={
                            user.data.activeAddressId === adrs.address.id ||
                            isAddressUpdating
                          }
                          onClick={() => handleSetActiveAddress(adrs.address)}
                        >
                          <FaRegCircleCheck className="mr-2 h-3.5 w-3.5" />
                          <span>Set Active</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditAddressClick(adrs.address)}
                        >
                          <TbEdit className="mr-2 h-4 w-4" />
                          <span>Update</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => (
                            setSelectedAddress(adrs.address),
                            setDialogOpen(true)
                          )}
                        >
                          <HiOutlineTrash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-medium">Division</p>
                  <div>
                    <p className="bg-gray-100 py-1 px-2 rounded">
                      {adrs.address.division}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">District</p>
                  <div>
                    <p className="bg-gray-100 py-1 px-2 rounded">
                      {adrs.address.district}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Upazila</p>
                  <div>
                    <p className="bg-gray-100 py-1 px-2 rounded">
                      {adrs.address.upazila}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Union</p>
                  <div>
                    <p className="bg-gray-100 py-1 px-2 rounded">
                      {adrs.address.union}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">street Address</p>
                  <p className="bg-gray-100 py-1 px-2 rounded">
                    {adrs.address.streetAddress}
                  </p>
                </div>
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
        currentUser={user}
        title={selectedAddress ? "Edit your address" : "Add a new address"}
        description={
          selectedAddress
            ? "Please double check your address before updating."
            : "Please provide your address information to add a new address."
        }
        submitHandler={handler}
        selectedAddress={selectedAddress}
        isLoading={isUserUpdating || isAddressAdding}
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
