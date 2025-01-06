"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useToast } from "../../components/ui/use-toast";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/local-storage";
import { useSignInUserMutation } from "../../redux/api/auth/auth-api";
import { loginSchema } from "../../schemas/login-schemas";
import { KEY } from "../../types";
import ForgotPasswordDrawer from "./forgot-pass-drawer";

interface LoginModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handler: () => void;
  onClose: (e: React.MouseEvent) => void;
}

export default function LoginModal({
  open,
  setOpen,
  handler,
  onClose,
}: LoginModalProps) {
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);
  const [signInUser, { isLoading }] = useSignInUserMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const lastResetTime = getFromLocalStorage("lastPasswordResetTime");
    if (lastResetTime) {
      const timeDiff = Date.now() - parseInt(lastResetTime);
      if (timeDiff < 60000) {
        setIsResetButtonDisabled(true);
        const remainingTime = Math.ceil((60000 - timeDiff) / 1000);
        setResetTimer(remainingTime);
      } else {
        setIsResetButtonDisabled(false);
        setResetTimer(0);
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResetButtonDisabled && resetTimer > 0) {
      interval = setInterval(() => {
        setResetTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setIsResetButtonDisabled(false);
            clearInterval(interval);
            return 0;
          }
          return newTimer;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResetButtonDisabled, resetTimer]);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await signInUser(data).unwrap();

      if (!res?.success) {
        toast({
          title: "Login Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      } else {
        setToLocalStorage(KEY, res.data.refreshToken);
        setOpen(false);
        form.reset();
        toast({
          title: "Login Successful",
          description: "You are now logged in",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "Invalid credentials. Please try again.",
      });
      return;
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleForgotPasswordClick = () => {
    setIsPasswordResetOpen(true);
  };

  const handleResetSent = () => {
    setIsResetButtonDisabled(true);
    setResetTimer(60);
    const currentTime = Date.now();
    setToLocalStorage("lastPasswordResetTime", currentTime.toString());
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px] md:max-w-lg rounded"
          onClick={onClose}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">Log In</DialogTitle>
            <DialogDescription className="text-base">
              Sign in to your account to continue.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                variant="link"
                className="px-0 font-normal text-xs"
                onClick={handleForgotPasswordClick}
                disabled={isResetButtonDisabled}
              >
                {isResetButtonDisabled
                  ? `Forgot Password? (${resetTimer}s)`
                  : "Forgot Password?"}
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
          <div className="relative my-2">
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
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign In With Google
          </Button>

          <div className="text-xs text-muted-foreground">
            By continuing, I agree to Alwan&apos;s{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms-of-use" className="underline hover:text-primary">
              Terms of Use
            </a>
            .
          </div>
        </DialogContent>
      </Dialog>

      <ForgotPasswordDrawer
        open={isPasswordResetOpen}
        setOpen={setIsPasswordResetOpen}
        onResetSent={handleResetSent}
      />
    </>
  );
}
