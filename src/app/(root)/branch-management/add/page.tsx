"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import SwitchInput from "@/components/Inputs/SwitchInput";
import Alert from "@/components/common/Alert";
import SelectInput from "@/components/Inputs/SelectInput";
import DateInput from "@/components/Inputs/DateInput";

type AddSchoolData = {
  daycare_id: string;
  daycare_name: string;
  branch_name: string;
  branch_code: string;
  branch_type: string;
  address: string;
  state: string;
  country: string;
  contact_number: string;
  email: string;
  branch_incharge_name: string;
  opening_date: string;
  status: boolean;
  remarks: string;
};

const SchoolManagementAdd = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddSchoolData>({
    defaultValues: {
      daycare_id: "",
      daycare_name: "",
      branch_name: "",
      branch_code: "",
      branch_type: "",
      address: "",
      state: "",
      country: "",
      contact_number: "",
      email: "",
      branch_incharge_name: "",
      opening_date: "",
      remarks: "",
      status: false,
    },
  });
  const onSubmit = (data: AddSchoolData) => {
    console.log("Submitted Data:", data);
    // You can add API call here
    reset(); // optional reset
    // router.push("/cms/school-management");
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          <TextInput
            id="daycare_id"
            label="Daycare ID"
            placeholder="Enter daycare id"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <SelectInput
            id="daycare_name"
            label="Daycare Name"
            options={[
              {
                label: "Select Daycare",
                value: "",
              },
              {
                label: "Building Blocks Academy",
                value: "Building Blocks Academy",
              },
            ]}
            register={register}
            errors={errors}
            required
          />
          <TextInput
            id="branch_name"
            label="Branch Name"
            placeholder="Enter branch name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <TextInput
            id="branch_code"
            label="Branch Code"
            placeholder="Enter branch code"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <SelectInput
            id="branch_type"
            label="Branch Type"
            options={[
              { label: "Select Branch Type", value: "" },
              { label: "Main Branch", value: "Main Branch" },
              { label: "Sub Branch", value: "Sub Branch" },
            ]}
            register={register}
            errors={errors}
            required
          />
        </div>
        <TextAreaInput
          id="address"
          label="Address"
          placeholder="Enter your address"
          register={register}
          errors={errors}
          required
          rows={4}
        />
        <div className="grid grid-cols-3 gap-6">
          <TextInput
            id="state"
            label="State"
            placeholder="Enter state"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="country"
            label="Country"
            placeholder="Enter country"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="contact_number"
            label="Contact Number"
            placeholder="Enter contact number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
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
            id="branch_incharge_name"
            label="Branch Incharge Name"
            placeholder="Enter branch incharge name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <DateInput
            id="opening_date"
            label="Opening Date"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
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
            <Alert
              title="Quick Tip"
              description="Activities can only be performed by active School."
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="h-[54px] w-[185px] rounded-md"
        >
          Cancel
        </Button>
        <Button type="submit" className="h-[54px] w-[225px] rounded-md">
          Save School
        </Button>
      </div>
    </form>
  );
};

export default SchoolManagementAdd;
