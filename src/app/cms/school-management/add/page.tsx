"use client";
import React, { useState } from "react";
import Heading from "@/components/common/Heading";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import Image from "next/image";
import SwitchInput from "@/components/Inputs/SwitchInput";
import Alert from "@/components/common/Alert";
import DropZone from "@/components/Inputs/Dropzone";

type AddBranchData = {
  company_name: string;
  owner_name: string;
  phone_number: string;
  email: string;
  vta_number: string;
  registration_number: string;
  city: string;
  status: boolean;
  state: string;
  country: string;
  school_address: string;
  number_of_users: string;
  number_of_locations: string;
  remarks: string;
};

const SchoolManagementAdd = () => {
  const router = useRouter();
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddBranchData>({
    defaultValues: {
      company_name: "",
      owner_name: "",
      phone_number: "",
      email: "",
      vta_number: "",
      registration_number: "",
      city: "",
      state: "",
      country: "",
      school_address: "",
      number_of_users: "",
      number_of_locations: "",
      remarks: "",
      status: false,
    },
  });
  const handleFileUpload = (file: File[]) => {
    console.log("File uploaded:", file);
    setCompanyLogo(file[0]);
  };
  const onSubmit = (data: AddBranchData) => {
    console.log("Submitted Data:", data);
    const formData = new FormData();
    formData.append("company_logo", companyLogo as File);
    formData.append("company_name", data.company_name);
    formData.append("owner_name", data.owner_name);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("vta_number", data.vta_number);
    formData.append("registration_number", data.registration_number);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("school_address", data.school_address);
    formData.append("number_of_users", data.number_of_users);
    formData.append("number_of_locations", data.number_of_locations);
    formData.append("remarks", data.remarks);
    formData.append("status", data.status.toString());
    console.log("Form Data:", formData);
    // You can add API call here
    reset(); // optional reset
    // router.push("/cms/school-management");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <Heading
          title="Add Branch"
          backTo="/cms/branch-management"
          backToText="Back to Branch Management"
        />
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
        <div className="col-span-2 w-full flex justify-between gap-8">
            <div className="">
                <h3 className="text-sm font-medium text-gray-900">Company Logo</h3>
                <p className="text-sm text-gray-700">Upload a logo for your company</p>
            </div>
            <Image
                src="/images/buildingblock.png"
                alt="Company Logo"
                width={183}
                height={73}
                className="object-contain"
            />
            <DropZone onFileUpload={handleFileUpload} maxFiles={1} />
        </div>
          <TextInput
            id="company_name"
            label="Company Name"
            placeholder="Enter company name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="owner_name"
            label="Owner Name"
            placeholder="Enter owner name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="phone_number"
            label="Phone Number"
            placeholder="Enter phone number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter email"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="vta_number"
            label="VTA Number"
            placeholder="Enter vta number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="registration_number"
            label="Registration Number"
            placeholder="Enter registration number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="city"
            label="City"
            placeholder="Enter city"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="state"
            label="State"
            placeholder="Enter state"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <div className="col-span-2 flex flex-col gap-6">
            <TextInput
              id="country"
              label="Country"
              placeholder="Enter country"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextAreaInput
              id="school_address"
              label="School Address"
              placeholder="Enter your address"
              register={register}
              errors={errors}
              required
              rows={4}
              cols={50}
            />
          </div>
          <TextInput
            id="number_of_users"
            label="Number of Users"
            placeholder="Enter number of users"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="number_of_locations"
            label="Number of Locations"
            placeholder="Enter number of locations"
            register={register}
            errors={errors}
            variant="square"
            required
          />
            <TextAreaInput
              id="remarks"
              label="Remarks"
              placeholder="Enter your remarks"
              register={register}
              errors={errors}
              required
              rows={5}
            />

          <div className="">
            <SwitchInput
              id="status"
              label="Status"
              subLabel="Active"
              defaultChecked={false}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
            <Alert title="Quick Tip" description="Activities can only be performed by active School."/> 
          </div>
        </div>

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            onClick={() => router.back()}
            className="h-[54px] w-[185px] rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            className="h-[54px] w-[225px] rounded-md"
          >
            Save Branch
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchoolManagementAdd;
