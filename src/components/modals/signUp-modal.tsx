"use client";

import { setToLocalStorage } from "@/helpers/local-storage";
import {
  useSignInUserMutation,
  useSignUpUserMutation,
} from "@/redux/api/auth/auth-api";
import { signUpSchema } from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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
import { toast } from "../ui/use-toast";

import { RiLoaderLine } from "react-icons/ri";

interface SignUpModalProps {
  signUpOpen: boolean;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  signUpOpen,
  setSignUpOpen,
}) => {
  const [signUpUser, { isLoading: signUpLoading }] = useSignUpUserMutation();
  const [signInUser, { isLoading }] = useSignInUserMutation();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const res: any = await signUpUser(data);

      if (!res.data.id) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: "Something went wrong please try again later",
        });
      } else {
        const loginData = {
          email: data.email,
          password: data.password,
        };

        const loginRes: any = await signInUser(loginData);
        setToLocalStorage("access-token", loginRes.data.accessToken);
        toast({
          title: "Sign Up Success",
          description: "your new account created successfully",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Something went wrong please try again later",
      });
    }
  };

  return (
    <div>
      <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
        <DialogContent className="md:max-w-[500px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Sign Up</DialogTitle>
            <DialogDescription>Create an account.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  {isLoading || signUpLoading ? (
                    <RiLoaderLine className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <div className="flex flex-col gap-5 w-full">
            <Button className="w-full flex gap-2" variant="outline">
              <FcGoogle />
              <span className="text-slate-500">Sign In With Google</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpModal;
