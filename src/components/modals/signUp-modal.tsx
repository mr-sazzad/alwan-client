"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { setToLocalStorage } from "@/helpers/local-storage";
import {
  useSignInUserMutation,
  useSignUpUserMutation,
} from "@/redux/api/auth/auth-api";
import { signUpSchema } from "@/schemas/signup-schema";
import { KEY } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema> & { retypePassword: string };

interface SignUpModalProps {
  signUpOpen: boolean;
  setSignUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: () => void;
}

export default function SignUpModal({
  signUpOpen,
  setSignUpOpen,
  handler,
}: SignUpModalProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const [signUpUser] = useSignUpUserMutation();
  const [signInUser] = useSignInUserMutation();
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);
    if (data.password !== data.retypePassword) {
      form.setError("retypePassword", {
        type: "manual",
        message: "Passwords don't match",
      });
      return;
    }

    try {
      const signUpData = { email: data.email, password: data.password };
      const response: any = await signUpUser({
        data: JSON.stringify(signUpData),
      }).unwrap();

      if (response.status !== 201) {
        toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: "Something went wrong. Please try again later.",
        });
        return;
      }

      const loginRes: any = await signInUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      setToLocalStorage(KEY, loginRes.data.accessToken);

      form.reset();
      setSignUpOpen(false);
      router.push("/");

      toast({
        title: "Sign Up Successful",
        description: "Your account has been created and you're now logged in.",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  const togglePasswordVisibility = () => setShowPasswords(!showPasswords);

  return (
    <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg rounded">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Sign Up</DialogTitle>
          <DialogDescription className="text-base">
            Create an account to get started with Alwan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
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
                    <div className="relative">
                      <Input
                        type={showPasswords ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPasswords ? "Hide password" : "Show password"
                        }
                      >
                        {showPasswords ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="retypePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-xs text-muted-foreground">
              By continuing, I agree to Alwan&apos;s{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-primary"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-of-use" className="underline hover:text-primary">
                Terms of Use
              </a>
              .
            </div>
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handler}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign Up With Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
