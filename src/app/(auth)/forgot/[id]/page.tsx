"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import PasswordInput from "@/components/Inputs/PasswordInput";
import { useForm } from "react-hook-form";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    console.log(data);
  };
  
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-[506px] my-16 mx-auto">
      {/* Login Form */}
      <Card className="bg-white shadow-lg border-0 gap-8 p-8 rounded-4xl ">
        <Button 
          className="w-fit rounded-full gap-2"
          onClick={handleBackClick}
          type="button"
        >
          <ArrowLeftIcon size={20} /> Back
        </Button>
        <div className="">
          <h1 className="text-gray-950 text-2xl font-semibold mb-3">
            Create
            <br />
            New Password
          </h1>
          <p className="text-gray-700 text-sm">
            Please make sure the password is not the same as the previous
            password.
          </p>
        </div>
        <CardContent className="p-0">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Enter your confirm password"
              register={register}
              errors={errors}
            />
            
            {/* Sign In Button */}
            <Button
              type="submit"
              variant="gradient"
              className="py-[18px] h-fit"
              disabled={!!errors.password || !!errors.confirmPassword}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;