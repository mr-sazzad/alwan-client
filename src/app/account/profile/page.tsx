"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import InfoModal from "@/components/profile/info-modal";
import ProfileSkeleton from "@/components/skeletons/profile-skeleton";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { IUserData } from "@/types";
import { BiMessageSquareEdit } from "react-icons/bi";
import { PiPlusBold } from "react-icons/pi";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      // router.back();
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const { data: user, isLoading } = useGetSingleUserQuery(userData?.userId);
  const { data: orders, isLoading: isOrderLoading } =
    useGetSingleUserOrdersQuery(userData?.userId);

  if (isLoading || isOrderLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <AlwanBreadCrumb
        links={[
          { label: "Home", href: "/" },
          { label: "Account", href: "/account" },
        ]}
        page="Profile"
        className="my-3"
      />

      <div className="flex lg:flex-row flex-col gap-5 w-full">
        <div className="w-full">
          <h1 className="text-xl md:font-bold font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            your personal profile.
          </p>

          <Button className="w-full h-[150px] mt-3" variant="outline">
            <div className="flex justify-center items-center gap-1">
              <PiPlusBold /> Add New Address
            </div>
          </Button>

          <div className="w-full flex flex-col gap-5">
            <div className="mt-5 border rounded p-2 w-full">
              <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Information</h3>
                <Button
                  onClick={() => setInfoModalOpen(true)}
                  size="icon"
                  variant="outline"
                >
                  <BiMessageSquareEdit size={22} className="cursor-pointer" />
                </Button>
              </div>
              <div className="flex flex-col gap-5">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoModal
        infoModalOpen={infoModalOpen}
        setInfoModalOpen={setInfoModalOpen}
        currentUser={user}
      />
    </>
  );
};

export default ProfilePage;
