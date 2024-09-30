"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, ShoppingBag, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import ProfileSkeleton from "@/components/skeletons/profile-skeleton";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserOrdersQuery } from "@/redux/api/orders/ordersApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/user-api";
import { IUserData } from "@/types";

const profileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 3 * 1024 * 1024, {
    message: "File size must be less than 3MB",
  }),
});

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserData | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      file: new File([], ""),
    },
  });

  useEffect(() => {
    const currentUserData = getUserFromLocalStorage() as IUserData | null;
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

      if (result.success) {
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
      console.error("Error uploading profile image:", error);
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
    <div className="container mx-auto py-10 px-4">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-xl p-8 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white">
              {user?.data?.imageUrl ? (
                <Image
                  src={user.data.imageUrl}
                  alt={user.data.name || "Profile"}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              ) : (
                <AvatarFallback>{user?.data?.name?.charAt(0)}</AvatarFallback>
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
          <div className="text-center md:text-left text-white">
            <h1 className="text-3xl font-bold mb-2">{user?.data?.name}</h1>
            <p className="text-lg mb-4">{user?.data?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <MapPin className="w-3 h-3 mr-1" />
                {user?.data?.addresses && user.data.addresses.length > 0
                  ? `${user.data.addresses.length} ${
                      user.data.addresses.length === 1 ? "address" : "addresses"
                    }`
                  : "No address"}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Phone className="w-3 h-3 mr-1" />
                {user?.data?.addresses && user.data.addresses.length > 0
                  ? user.data.addresses.find((addr: any) => addr.isDefault)
                      ?.phone || user.data.addresses[0].phone
                  : "No phone"}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Mail className="w-3 h-3 mr-1" />
                {user?.data?.email}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Wishlist
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
