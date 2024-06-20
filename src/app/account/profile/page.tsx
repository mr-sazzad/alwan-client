"use client";

import UserAccountPageBreadCrumb from "@/components/breadcrumbs/user-account-page-breadcrumb";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import Loading from "@/app/loading";
import MaxWidth from "@/components/max-width";
import AddressModal from "@/components/profile/address-update-modal";
import InfoModal from "@/components/profile/info-modal";
import ProfileOrderTabs from "@/components/profile/order-tabs";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { IUserData } from "@/types";
import { BiMessageSquareEdit } from "react-icons/bi";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      router.push("/");
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const { data: user, isLoading } = useGetSingleUserQuery(userData?.userId);
  const { data: orders, isLoading: isOrderLoading } =
    useGetSingleUserOrdersQuery(userData?.userId);

  if (isLoading || isOrderLoading) {
    return <Loading />;
  }

  return (
    <>
      <MaxWidth className="mt-[110px]">
        <UserAccountPageBreadCrumb name="profile" />
        <div className="flex lg:flex-row flex-col gap-5 w-full md:justify-around">
          <div>
            <h1 className="text-xl  md:font-bold font-semibold">Profile</h1>
            <p className="text-sm text-muted-foreground">
              your personal profile. you can change your address also nessecary
              information from here
            </p>

            <div>
              <div className="mt-5 border rounded p-2">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Information</h3>
                  <Button onClick={() => setInfoModalOpen(true)}>
                    <BiMessageSquareEdit size={16} className="cursor-pointer" />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <p>{user.username}</p>
                  <div className="">
                    {user.phone ? (
                      <p className="text-sm">{user.phone}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Number not added
                      </p>
                    )}
                  </div>

                  <div className="">
                    {user.altPhone ? (
                      <p className="text-sm">{user.altPhone}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Alt number not added
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-muted-foreground text-sm">
                      {user.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      ( Read only field )
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded mt-5 p-2">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Address Book</h3>
                  <Button onClick={() => setAddressModalOpen(true)}>
                    <BiMessageSquareEdit size={16} className="cursor-pointer" />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p>Shipping City</p>
                    <div>
                      {user.shippingDistrict ? (
                        <p className="text-sm">{user.shippingDistrict}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Shipping City not added
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>Exact Address</p>
                    {user.shippingAddress ? (
                      <p className="text-sm">{user.shippingAddress}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Full address not added
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ProfileOrderTabs orders={orders} />
            <div className="flex flex-row items-center gap-2 mt-5 border p-2 rounded-md">
              <p className="text-muted-foreground">
                If you&apos;d like to review your cancellations and returns
              </p>
              <Button variant="destructive" size="sm">
                Rejected Orders
              </Button>
            </div>
          </div>
        </div>
      </MaxWidth>
      <AddressModal
        addressModalOpen={addressModalOpen}
        setAddressModalOpen={setAddressModalOpen}
      />
      <InfoModal
        infoModalOpen={infoModalOpen}
        setInfoModalOpen={setInfoModalOpen}
      />
    </>
  );
};

export default ProfilePage;
