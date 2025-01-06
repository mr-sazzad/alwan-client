"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Loader,
  MapPin,
  Phone,
  Settings,
  ShoppingCart,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { toast } from "../../../components/ui/use-toast";

import AlwanBadge from "../../../components/badge/badge";
import ProfileSkeleton from "../../../components/skeletons/profile-skeleton";
import { getUserFromLocalStorage } from "../../../helpers/jwt";
import { useGetSingleUserOrdersQuery } from "../../../redux/api/orders/ordersApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "../../../redux/api/users/user-api";
import { IUser, IUserAddress } from "../../../types";

const profileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 3 * 1024 * 1024, {
    message: "File size must be less than 3MB",
  }),
});

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      file: new File([], ""),
    },
  });

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as IUser | null;
    if (!currentUserData) {
      router.back();
    } else {
      setUserData(currentUserData);
    }
  }, [router]);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetSingleUserQuery(userData?.userId ?? "", {
    skip: !userData?.userId,
  });

  const [updateSingleUser] = useUpdateSingleUserMutation();

  const {
    data: orders,
    isLoading: isOrderLoading,
    error: orderError,
  } = useGetSingleUserOrdersQuery(userData?.userId ?? "", {
    skip: !userData?.userId,
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!userData?.userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingImage(true);
    const formData = new FormData();
    formData.append("file", values.file);

    try {
      const result = await updateSingleUser({
        id: userData.userId,
        data: formData,
      }).unwrap();

      if (result?.success) {
        toast({
          title: "Success",
          description: "Profile image updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Profile image update failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading profile image",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const isCustomer = useMemo(
    () => user?.data?.role === "USER",
    [user?.data?.role]
  );

  if (isUserLoading || isOrderLoading || !userData) {
    return <ProfileSkeleton />;
  }

  if (userError || orderError) {
    return (
      <div className="container mx-auto py-10 px-4">
        <p className="text-red-500">An error occurred while loading data.</p>
      </div>
    );
  }

  const handleFileChange = (file: File) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("file", file);
      form.handleSubmit(onSubmit)();
    }
  };

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    iconBgClass,
    iconClass,
  }: {
    title: string;
    value: string | number;
    icon: any;
    iconBgClass: string;
    iconClass: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-6 w-6 ${iconBgClass} ${iconClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-medium">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar className="w-[100] h-[100] border-4 border-primary">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                ) : user?.data?.imageUrl ? (
                  <Image
                    src={user.data.imageUrl}
                    alt={user.data.name || "Profile"}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback>{user?.data?.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-image-upload"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full shadow-lg"
                disabled={isUpdatingImage}
                onClick={() =>
                  document.getElementById("profile-image-upload")?.click()
                }
              >
                {isUpdatingImage ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-lg font-medium">
                {user?.data?.addresses.length
                  ? user?.data?.addresses.map((address: IUserAddress) =>
                      address.isDefault ? address.recipientName : null
                    )
                  : "Create Address"}
              </h2>
              <p className="text-muted-foreground mb-1">{user?.data?.email}</p>
              <div className="text-muted-foreground mb-4 text-sm">
                <span>Role: </span>
                {isCustomer ? "Customer" : user?.data?.role}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <AlwanBadge variant="blue">
                  <MapPin className="w-3 h-3 mr-1" />
                  {user?.data?.addresses.length || "No address"}
                </AlwanBadge>
                <AlwanBadge variant="blue">
                  <Phone className="w-3 h-3 mr-1" />
                  {user?.data?.addresses[0]?.phone || "No phone"}
                </AlwanBadge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-4">Your Account Information</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isCustomer && (
            <MetricCard
              title="Total Orders"
              value={orders?.data?.length || 0}
              icon={ShoppingCart}
              iconBgClass="bg-emerald-100"
              iconClass="text-emerald-500"
            />
          )}
          <MetricCard
            title="Account Age"
            value={
              user?.data?.createdAt
                ? `${Math.floor(
                    (new Date().getTime() -
                      new Date(user.data.createdAt).getTime()) /
                      (1000 * 3600 * 24)
                  )} days`
                : "N/A"
            }
            icon={Clock}
            iconBgClass="bg-orange-100"
            iconClass="text-orange-500"
          />
          <MetricCard
            title="Saved Addresses"
            value={user?.data?.addresses?.length || 0}
            icon={MapPin}
            iconBgClass="bg-blue-100"
            iconClass="text-blue-500"
          />
          <MetricCard
            title="Account Status"
            value="Active"
            icon={Settings}
            iconBgClass="bg-yellow-100"
            iconClass="text-yellow-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
