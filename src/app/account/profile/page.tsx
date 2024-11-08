"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  MapPin,
  Phone,
  Settings,
  ShoppingCart,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import AlwanBadge from "@/components/badge/badge";
import ProfileSkeleton from "@/components/skeletons/profile-skeleton";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/user-api";
import { IUser, IUserAddress } from "@/types";

const profileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 3 * 1024 * 1024, {
    message: "File size must be less than 3MB",
  }),
});

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [open, setOpen] = useState(false);

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

  const { data: user, isLoading: isUserLoading } = useGetSingleUserQuery(
    userData?.userId ?? "",
    {
      skip: !userData?.userId,
    }
  );

  const [updateSingleUser, { isLoading: isUpdating }] =
    useUpdateSingleUserMutation();

  const { data: orders, isLoading: isOrderLoading } =
    useGetSingleUserOrdersQuery(userData?.userId ?? "", {
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
    }
  };

  if (isUserLoading || isOrderLoading || !userData) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <Card className="mb-8">
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary">
                  {user?.data?.imageUrl ? (
                    <Image
                      src={user.data.imageUrl}
                      alt={user.data.name || "Profile"}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback>
                      {user?.data?.name?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => (
                        <FormItem>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="profile-image-upload"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-0 right-0 rounded-full shadow-lg"
                            disabled={isUpdating}
                            type="button"
                            aria-label="Upload profile picture"
                            onClick={() => {
                              document
                                .getElementById("profile-image-upload")
                                ?.click();
                            }}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-lg font-medium">
                  {user?.data.addresses.length
                    ? user?.data.addresses.map((address: IUserAddress) =>
                        address.isDefault ? address.recipientName : null
                      )
                    : "Create Address"}
                </h2>
                <p className="text-muted-foreground mb-1">
                  {user?.data?.email}
                </p>
                <div className="text-muted-foreground mb-4 text-sm">
                  <span>Role: </span>
                  {user?.data?.role?.charAt(0).toUpperCase() +
                    user?.data?.role?.slice(1).toLowerCase()}
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <AlwanBadge variant="blue">
                    <MapPin className="w-3 h-3 mr-1" />
                    {user?.data?.addresses && user.data.addresses.length > 0
                      ? `${user.data.addresses.length} ${
                          user.data.addresses.length === 1
                            ? "address"
                            : "addresses"
                        }`
                      : "No address"}
                  </AlwanBadge>
                  <AlwanBadge variant="blue">
                    <Phone className="w-3 h-3 mr-1" />
                    {user?.data?.addresses && user.data.addresses.length > 0
                      ? user.data.addresses.find((addr: any) => addr.isDefault)
                          ?.phone || user.data.addresses[0].phone
                      : "No phone"}
                  </AlwanBadge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-medium mb-4">Your Account Information</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-6 w-6 text-emerald-500 p-1 rounded-full bg-emerald-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">
                  {orders?.data?.length || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Age
                </CardTitle>
                <Clock className="h-6 w-6 text-orange-500 p-1 rounded-full bg-orange-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">
                  {user?.data?.createdAt
                    ? `${Math.floor(
                        (new Date().getTime() -
                          new Date(user.data.createdAt).getTime()) /
                          (1000 * 3600 * 24)
                      )} days`
                    : "N/A"}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Addresses
                </CardTitle>
                <MapPin className="h-6 w-6 text-blue-500 p-1 rounded-full bg-blue-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">
                  {user?.data?.addresses?.length || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Status
                </CardTitle>
                <Settings className="h-6 w-6 text-yellow-500 p-1 rounded-full bg-yellow-100" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">Active</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
