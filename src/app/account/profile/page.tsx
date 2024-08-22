"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import AlwanBreadCrumb from "@/components/breadcrumbs/breadcrumb";
import InfoModal from "@/components/profile/info-modal";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { IUserData } from "@/types";
import { BiMessageSquareEdit } from "react-icons/bi";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData>();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

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
  const { data: orders, isLoading: isOrderLoading } =
    useGetSingleUserOrdersQuery(userData?.userId);

  // if (isLoading || isOrderLoading) {
  //   return <Loading />;
  // }

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

      <div className="flex lg:flex-row flex-col gap-5 w-full md:justify-around">
        <div>
          <h1 className="text-xl md:font-bold font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            your personal profile.
          </p>

          <div>
            <div className="mt-5 border rounded p-2">
              <div className="flex flex-row justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Information</h3>
                <Button onClick={() => setInfoModalOpen(true)} size="sm">
                  <BiMessageSquareEdit size={22} className="cursor-pointer" />
                </Button>
              </div>
              <div className="flex flex-col gap-1">
                <div>
                  {user?.username ? (
                    <p className="text-sm">{user.username}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">user name</p>
                  )}
                </div>
                <div className="">
                  {user?.phone ? (
                    <p className="text-sm">{user.phone}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Number not added
                    </p>
                  )}
                </div>

                <div className="">
                  {user?.altPhone ? (
                    <p className="text-sm">{user.altPhone}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Alt number not added
                    </p>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-muted-foreground text-sm">
                    {user?.email ? user.email : "example@example.com"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    ( Read only field )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal
        infoModalOpen={infoModalOpen}
        setInfoModalOpen={setInfoModalOpen}
      />
    </>
  );
};

export default ProfilePage;
