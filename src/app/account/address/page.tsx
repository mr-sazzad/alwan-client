"use client";

import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import AddressModal from "@/components/profile/address-update-modal";
import { Button } from "@/components/ui/button";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { IUserData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";

const Address = () => {
  const router = useRouter();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      // router.push("/");
      console.log("hello");
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const { data: user, isLoading } = useGetSingleUserQuery(userData?.userId);

  return (
    <>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
        ]}
        page="Profile"
        className="mb-3"
      />
      <h1 className="text-xl md:font-bold font-semibold">Address</h1>
      <p className="text-sm text-muted-foreground">your Address Information.</p>
      <div className="border rounded mt-5 p-2">
        <div className="flex flex-row justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Address Book</h3>
          <Button onClick={() => setAddressModalOpen(true)} size="sm">
            <BiMessageSquareEdit size={22} className="cursor-pointer" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-medium">Division</p>
            <div>
              {user?.shippingDistrict ? (
                <p className="text-sm">{user?.shippingDistrict}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Shipping City not added
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="font-medium">District</p>
            <div>
              {user?.shippingDistrict ? (
                <p className="text-sm">{user?.shippingDistrict}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Shipping City not added
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="font-medium">City</p>
            <div>
              {user?.shippingDistrict ? (
                <p className="text-sm">{user?.shippingDistrict}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Shipping City not added
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="font-medium">Union</p>
            <div>
              {user?.shippingDistrict ? (
                <p className="text-sm">{user?.shippingDistrict}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Shipping City not added
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="font-medium">Exact Address</p>
            {user?.shippingAddress ? (
              <p className="text-sm">{user?.shippingAddress}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Full address not added
              </p>
            )}
          </div>
        </div>
      </div>
      ;
      <AddressModal
        addressModalOpen={addressModalOpen}
        setAddressModalOpen={setAddressModalOpen}
      />
    </>
  );
};

export default Address;
