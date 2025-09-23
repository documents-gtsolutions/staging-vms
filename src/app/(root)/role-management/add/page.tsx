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

type AddRoleData = {
  daycare: string;
  branch: string;
  role_name: string;
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
  } = useForm<AddRoleData>({
    defaultValues: {
      daycare: "",
      branch: "",
      role_name: "",
      remarks: "",
      status: false,
    },
  });

  const onSubmit = (data: AddRoleData) => {
    console.log("Submitted Data:", data);
    // You can add API call here
    reset(); // optional reset
    // router.push("/cms/school-management");
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          <SelectInput
            id="daycare"
            label="Daycare"
            options={[
              {
                label: "Select Daycare",
                value: "",
              },
              {
                label: "La Marque",
                value: "La Marque",
              },
            ]}
            register={register}
            errors={errors}
            required
          />
          <SelectInput
            id="branch"
            label="Branch"
            options={[
              {
                label: "Select Branch",
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
            id="role_name"
            label="Role Name"
            placeholder="Enter role name"
            register={register}
            errors={errors}
            variant="square"
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
              description="Activities can only be performed by active role."
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
          Add New Role
        </Button>
      </div>
    </form>
  );
};

export default SchoolManagementAdd;
