"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { removeFromLocalStorage } from "@/helpers/local-storage";
import { handleSignInWithGoogle } from "@/helpers/sign-in-with-google";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { KEY } from "@/types";
import { Loader2, LogOut, User, UserCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "../modals/login-modal";
import SignUpModal from "../modals/signUp-modal";
import { extractNameFromEmail } from "../utils/utils";

export interface ICurrentUser {
  email: string;
  role: "ADMIN" | "USER";
  userId: string;
  int: number;
  exp: number;
}

export default function Profile() {
  const currentUser = getUserFromLocalStorage() as ICurrentUser | null;
  const { data: userRes, isLoading } = useGetSingleUserQuery(
    currentUser?.userId
  );
  const [open, setOpen] = useState(false);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleUserSignout = () => {
    removeFromLocalStorage(KEY);
    toast({
      title: "Log out",
      description: "Sign out successful",
    });
  };

  const renderAvatar = () => {
    if (isLoading) {
      return (
        <div className="h-8 w-8 rounded-full flex justify-center items-center bg-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      );
    }

    return (
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={userRes?.data?.imageUrl || "https://i.ibb.co/Qkf0sqm/images.jpg"}
          alt="Profile"
        />
        <AvatarFallback>
          {currentUser
            ? extractNameFromEmail(currentUser.email).charAt(0)
            : "U"}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-8 w-8 rounded-full flex justify-center items-center p-0">
            {renderAvatar()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 mr-1 mt-6" align="center">
          {currentUser ? (
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-0">
                <CardTitle className="font-medium text-lg">
                  {extractNameFromEmail(currentUser.email)}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {currentUser.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.role}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Link href="/account/profile" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-500 hover:text-red-600"
                    onClick={() => setSignOutDialogOpen(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Login First</CardTitle>
                <CardDescription>
                  Experience seamless access to your account with our secure
                  login.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setOpen(true)}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSignUpOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </CardContent>
            </Card>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginModal
        open={open}
        setOpen={setOpen}
        handler={handleSignInWithGoogle}
      />
      <SignUpModal
        signUpOpen={signUpOpen}
        setSignUpOpen={setSignUpOpen}
        handler={handleSignInWithGoogle}
      />

      <AlertDialog open={signOutDialogOpen} onOpenChange={setSignOutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You&apos;ll need to sign in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUserSignout}>
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
