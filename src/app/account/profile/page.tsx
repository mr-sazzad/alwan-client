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
import Link from "next/link";
import { BiMessageSquareEdit } from "react-icons/bi";
import { HiOutlineArrowTopRightOnSquare, HiOutlineHome } from "react-icons/hi2";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as any;
    if (!currentUserData) {
      router.back();
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
        className="mb-3"
      />

      <div className="flex lg:flex-row flex-col gap-5 w-full">
        <div className="w-full">
          <h1 className="text-xl md:font-bold font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            your personal profile.
          </p>

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
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Name</p>

                  <div className="bg-gray-100 py-1 px-2 rounded">
                    {user?.data.username ? (
                      <p className="font-medium capitalize">
                        {user?.data.username}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">user name</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Phone</p>
                  <div className="bg-gray-100 py-1 px-2 rounded">
                    {user?.data.phone ? (
                      <p className="font-medium">{user?.data.phone}</p>
                    ) : (
                      <p className="text-muted-foreground">Number not added</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Alt phone</p>
                  <div className="bg-gray-100 py-1 px-2 rounded">
                    {user?.data.altPhone ? (
                      <p className="font-medium">{user?.data.altPhone}</p>
                    ) : (
                      <p className="text-muted-foreground">
                        Alt number not added
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-destructive">( Read only )</p>
                  </div>
                  <div className="bg-gray-100 py-1 px-2 rounded">
                    <p className="text-muted-foreground">
                      {user?.data.email
                        ? user?.data.email
                        : "example@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button asChild className="w-full" variant="outline">
                <Link
                  href="/account/address"
                  className="font-medium flex items-center gap-5 w-full relative"
                >
                  <HiOutlineHome
                    size={17}
                    className="absolute top-2.5 left-2.5"
                  />
                  Go To Your Address Page
                  <HiOutlineArrowTopRightOnSquare
                    size={17}
                    className="absolute top-2.5 right-2.5"
                  />
                </Link>
              </Button>
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
