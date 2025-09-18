"use client"
import EmailInput from "@/components/Inputs/EmailInput";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type ForgotFormValues = {
  email: string;
  otp: string;
};

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });
  const onSubmit = (data: ForgotFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full max-w-[506px] my-16 mx-auto">
      {/* Login Form */}
      <Card className="bg-white shadow-lg border-0 gap-8 p-8 rounded-4xl ">
        <Button className="w-fit rounded-full gap-2">
          <ArrowLeftIcon size={20} /> Back
        </Button>
        <div className="">
          <h1 className="text-gray-950 text-2xl font-semibold mb-3">
            Lost your password?
            <br />
            Enter your detail to recover
          </h1>
          <p className="text-gray-700 text-sm">
            Please enter your email address account to send the OTP verification
            to reset your password
          </p>
        </div>
        <CardContent className="p-0">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <EmailInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register}
              errors={errors}
            />

            <Button className="py-[18px] h-fit w-full rounded-full">
              Continue
            </Button>
            <div className="text-center text-red-400 text-base font-semibold">
              01:59 Sec
            </div>
            <TextInput
              id="otp"
              label="OTP"
              type="text"
              placeholder="Enter your OTP"
              register={register}
              errors={errors}
            />
            {/* Sign In Button */}
            <Button
              type="submit"
              variant="gradient"
              className="py-[18px] h-fit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forgot;
