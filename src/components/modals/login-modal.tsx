"use client";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { setToLocalStorage } from "@/helpers/local-storage";
import {
  useLoginWithGoogleMutation,
  useSignInUserMutation,
} from "@/redux/api/auth/auth-api";
import { loginSchema } from "@/schemas/login-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { RiLoaderLine } from "react-icons/ri";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { toast } from "../ui/use-toast";

interface LoginModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, setOpen }) => {
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const [loginWithGoogle, { isLoading: isGoogleloading }] =
    useLoginWithGoogleMutation();
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

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res: any = await signInUser(data);

    if (res.data.accessToken) {
      setToLocalStorage("access-token", res.data.accessToken);
      setOpen(false);
      toast({
        title: "Login Success",
        description: "Congratulations you are now logged in",
      });
    } else {
      setOpen(true);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "Something went wrong Please try again",
      });
    }
  };

  const handleSignInWithGoogle = async () => {
    console.log("hello");
    const result = loginWithGoogle(null);

    console.log("login with google => ", result);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="md:max-w-[500px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Log In</DialogTitle>
            <DialogDescription>Sign in to your account.</DialogDescription>
          </DialogHeader>
          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="mt-4 w-full">
                  {isLoading ? (
                    <RiLoaderLine className="animate-spin h-5 w-5" />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <div className="flex flex-col gap-5 w-full">
            {/* GOOGLE LOGIN PART */}
            <div className="flex gap-2 items-center w-full">
              <Separator orientation="horizontal" className="flex-1" />
              <span className="text-sm">OR</span>
              <Separator orientation="horizontal" className="flex-1" />
            </div>
            <div className="w-full">
              <Button
                className="w-full flex gap-2"
                variant="outline"
                type="submit"
                onClick={handleSignInWithGoogle}
              >
                <FcGoogle />
                <span className="text-slate-500">Sign In With Google</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
