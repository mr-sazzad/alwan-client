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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

import { RiLoaderLine } from "react-icons/ri";
import { Separator } from "../ui/separator";

interface SignUpModalProps {
  signUpOpen: boolean;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  signUpOpen,
  setSignUpOpen,
  handler,
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
      const stringData = JSON.stringify(data);
      const response: any = await signUpUser({ data: stringData });
      setSignUpOpen(true);
      console.log(response);

      if (!response || response.data.status !== 201) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description:
            "Something went wrong. Please try again, or log in if you already have an account.",
        });
      } else {
        const loginData = {
          email: data.email,
          password: data.password,
        };

        console.log("DATA =>", loginData);

        const loginRes: any = await signInUser(loginData);
        setToLocalStorage("alwan-user-access-token", loginRes.data.accessToken);

        console.log("LOGIN RESPONSE =>", loginRes);

        form.reset();

        setSignUpOpen(false);

        toast({
          title: "Sign Up Success",
          description: "your new account created successfully",
        });

        setToLocalStorage(
          "alwan-user-access-token",
          loginRes.data.data.accessToken
        );
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
        <DialogContent className="md:max-w-[500px] sm:max-w-[425px] rounded">
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
          <div className="flex gap-2 items-center w-full">
            <Separator orientation="horizontal" className="flex-1" />
            <span className="text-sm text-muted-foreground">OR</span>
            <Separator orientation="horizontal" className="flex-1" />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <Button
              className="w-full flex gap-2"
              variant="outline"
              onClick={handler}
            >
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
