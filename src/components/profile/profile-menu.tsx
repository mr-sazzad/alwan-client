"use client";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import Link from "next/link";
import { useState } from "react";
import AlertDialogComp from "../alert-dialog/alert-dialog";
import LoginModal from "../modals/login-modal";
import SignUpModal from "../modals/signUp-modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { removeFromLocalStorage } from "@/helpers/local-storage";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";

// icons
import { handleSignInWithGoogle } from "@/helpers/sign-in-with-google";
import { User } from "lucide-react";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { VscSignOut } from "react-icons/vsc";

const Profile = () => {
  const currentUser = getUserFromLocalStorage();
  const [open, setOpen] = useState(false);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);

  const handleUserSignout = () => {
    removeFromLocalStorage("alwan-user-access-token");

    toast({
      title: "Log out",
      description: "Sign out successfull",
    });
  };

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="rounded-full p-0 flex justify-center items-center overflow-hidden border-0 outline-none w-[30px] h-[30px]"
            >
              <Avatar className="w-[25px] h-[25px]">
                <AvatarImage
                  src="https://i.ibb.co/Qkf0sqm/images.jpg"
                  alt="profile-image"
                />
                <AvatarFallback>AW</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px]">
            {currentUser ? (
              <>
                <DropdownMenuLabel className="text-lg font-medium">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="/account/profile"
                    className="flex gap-2 items-center"
                  >
                    <User size={16} />
                    <p>Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setSignOutDialogOpen(true)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <VscSignOut size={16} />
                  <p>Log out</p>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  className="w-full list-none"
                  onSelect={() => setOpen(true)}
                >
                  <div>
                    <h2 className="text-lg font-medium mb-2">Login First</h2>
                    <p className="text-sm text-muted-foreground">
                      Experience seamless access to your account with our secure
                      login.
                    </p>
                  </div>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem
                  className="w-full list-none cursor-pointer"
                  onSelect={() => setOpen(true)}
                >
                  <div className="py-1 flex items-center gap-2">
                    <FiUserCheck size={18} />{" "}
                    <p className="text-lg font-medium">Sign In</p>
                  </div>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem
                  className="w-full list-none cursor-pointer"
                  onSelect={() => setSignUpOpen(true)}
                >
                  <div className="py-1 flex items-center gap-2">
                    <FiUserPlus size={18} />{" "}
                    <p className="text-lg font-medium">Sign Up</p>
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <LoginModal
          open={open}
          setOpen={setOpen}
          handler={handleSignInWithGoogle}
        />
        <SignUpModal
          signUpOpen={SignUpOpen}
          setSignUpOpen={setSignUpOpen}
          handler={handleSignInWithGoogle}
        />
      </div>
      <AlertDialogComp
        open={signOutDialogOpen}
        setOpen={setSignOutDialogOpen}
        title="Confirm Sign Out"
        description="Are you sure you want to sign out? You'll need to sign in again to access your account."
        handler={handleUserSignout}
        buttonText="Sign Out"
      />
    </>
  );
};

export default Profile;
