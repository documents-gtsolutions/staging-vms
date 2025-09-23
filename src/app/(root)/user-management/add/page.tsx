"use client";
import React from "react";
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
  school: string;
  branch: string;
  role: string;
  password: string;
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
      school: "",
      branch: "",
      password: "",
      role: "",
      status: "",
    },
  });
  const onSubmit = (data: AddUserData) => {
    console.log(data);
  };
  return (
    <form
      className="flex flex-col gap-8 bg-white rounded-lg shadow p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <FileUpload
            id="photo"
            label="Upload Photo"
            register={register}
            errors={errors}
          />
        </div>
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
        <SelectInput
          id="school"
          label="School"
          options={[
            { label: "Select School", value: "" },
            { label: "School 1", value: "school1" },
            { label: "School 2", value: "school2" },
          ]}
          register={register}
          errors={errors}
          required
        />
        <SelectInput
          id="branch"
          label="Branch"
          options={[
            { label: "Select Branch", value: "" },
            { label: "Branch 1", value: "branch1" },
            { label: "Branch 2", value: "branch2" },
          ]}
          register={register}
          errors={errors}
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
      <div className="flex items-center justify-end gap-4">
        <Button type="submit" className="h-[54px] w-[225px] rounded-md">
          Add New User
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="h-[54px] w-[185px] rounded-md"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddUser;
