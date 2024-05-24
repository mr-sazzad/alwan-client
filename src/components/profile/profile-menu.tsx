"use client";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { removeFromLocalStorage } from "@/helpers/local-storage";
import { loginSchema } from "@/schemas/login-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const Profile = () => {
  const currentUser = getUserFromLocalStorage();
  const [open, setOpen] = useState(false);
  const [SignUpOpen, setSignUpOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const user = getUserFromLocalStorage();
      setIsAuthenticated(!!user);
    };

    checkAuthentication();
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("DATA", data);
  };

  const handleSignOut = () => {
    console.log("signed out");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full p-0 flex justify-center items-center overflow-hidden border-0"
          >
            <Avatar>
              <AvatarImage
                src="https://i.ibb.co/Qkf0sqm/images.jpg"
                alt="profile-image"
              />
              <AvatarFallback>AW</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {currentUser ? (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => removeFromLocalStorage("access-token")}
                className="cursor-pointer"
              >
                Log out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                className="w-full list-none m-1 cursor-pointer"
                onSelect={() => setOpen(true)}
              >
                <p className="py-1">Sign In</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="w-full list-none m-1 cursor-pointer"
                onSelect={() => setSignUpOpen(true)}
              >
                <p className="py-1">Sign Up</p>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <LoginModal open={open} setOpen={setOpen} />
      <SignUpModal signUpOpen={SignUpOpen} setSignUpOpen={setSignUpOpen} />
    </div>
  );
};

export default Profile;
