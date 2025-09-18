"use client";
import React from "react";
import Heading from "@/components/common/Heading";
import FileUpload from "@/components/Inputs/FIleUpload";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import EmailInput from "@/components/Inputs/EmailInput";
import SelectInput from "@/components/Inputs/SelectInput";
import PasswordInput from "@/components/Inputs/PasswordInput";
import { useRouter } from "next/navigation";
type AddUserData = {
  photo: string;
  user_id: string;
  full_name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  confirm_password: string;
  status: string;
};
const AddUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>({
    defaultValues: {
      photo: "",
      user_id: "",
      full_name: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirm_password: "",
      status: "",
    },
  });
  const onSubmit = (data: AddUserData) => {
    console.log(data);
  };
  return (
    <div className="p-6">
      <div className="mb-8">
        <Heading
          title="Add New User"
          backTo="/cms/user-management"
          backToText="Back to Manage Page"
        />
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow p-6">
          <FileUpload
            id="photo"
            label="Upload Photo"
            register={register}
            errors={errors}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-3 gap-4">
          <TextInput
            id="user_id"
            label="User ID"
            placeholder="BBA-EMP00001"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="full_name"
            label="Full Name"
            placeholder="Enter your full name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="username"
            label="Username"
            placeholder="Enter your username"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <EmailInput
            id="email"
            label="Email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <SelectInput
            id="role"
            label="Role"
            options={[
              { label: "Select Role", value: "" },
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
            register={register}
            errors={errors}
            required
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <PasswordInput
            id="confirm_password"
            placeholder="Enter confirm password"
            label="Confirm Password"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <SelectInput
            id="status"
            label="Status"
            options={[
              { label: "Select Status", value: "" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            register={register}
            errors={errors}
            required
          />
        </div>
        <div className="flex  gap-4">
          <Button
            type="submit"
            variant="gradient"
            className="h-[54px] w-[350px] rounded-md"
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="h-[54px] w-[185px] rounded-md"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
