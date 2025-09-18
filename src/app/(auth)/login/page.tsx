"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  login as loginAction,
} from "../../store/slices/authSlice";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import PasswordInput from "@/components/Inputs/PasswordInput";
import EmailInput from "@/components/Inputs/EmailInput";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user, userRole, loading, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!loading && user) {
      router.push("/cms/");
    }
  }, [user, userRole, loading, router]);

  useEffect(() => {
    if (error) {
      toast.error(`Login Error: ${error}`);
      setIsLoading(false);
    }
  }, [error]);

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await dispatch(
        loginAction({ email: data.email, password: data.password })
      ).unwrap();
      // Router will handle redirect in the useEffect
    } catch (err: unknown) {
      toast.error(
        `Login Error: ${err instanceof Error ? err.message : String(err)}`
      );
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!loading && user) {
    return null;
  }

  return (
    <div className="w-full max-w-[506px] max-h-[483px] mx-auto">
      {/* Login Form */}
      <Card className="bg-white shadow-lg border-0 gap-8 p-8 rounded-4xl ">
        <div className="text-center">
          <h1 className="text-gray-950 text-2xl font-semibold mb-3">
            Welcome back to our CRM
            <br />
            Sign In to getting started
          </h1>
          <p className="text-gray-700 text-sm">
            Enter your detail to procced furthere
          </p>
        </div>
        <CardContent className="p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email Field */}
            <EmailInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
            />

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              variant="gradient"
              className="py-[18px] h-fit mb-4"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-4 h-4 border border-gray-500 bg-gray-50 rounded-sm"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot"
                className="text-sm text-purple-400 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
