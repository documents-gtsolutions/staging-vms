"use client";
import React from "react";
import Heading from "@/components/common/Heading";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import EmailInput from "@/components/Inputs/EmailInput";
import SelectInput from "@/components/Inputs/SelectInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import DateInput from "@/components/Inputs/DateInput";
import CheckBoxInput from "@/components/Inputs/CheckBoxInput";
import SwitchInput from "@/components/Inputs/SwitchInput";
import Alert from "@/components/common/Alert";

type AddBranchData = {
  branch_id: string;
  branch_name: string;
  branch_code: string;
  branch_type: string;
  school_id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact_number: string;
  email: string;
  branch_incharge_name: string;
  incharge_contact_number: string;
  capacity: string;
  number_of_classrooms: string;
  opening_date: string;
  status: boolean;
  facilities: {
    playground: boolean;
    kitchen: boolean;
    cctv: boolean;
    sleeping_area: boolean;
    library: boolean;
    medical_room: boolean;
    parking: boolean;
    garden: boolean;
  };
  remarks: string;
};

const AddBranchManagement = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddBranchData>({
    defaultValues: {
      branch_id: "",
      branch_name: "",
      branch_code: "",
      status: false,
      branch_type: "",
      school_id: "",
      address: "",
      city: "",
      state: "",
      country: "",
      contact_number: "",
      email: "",
      branch_incharge_name: "",
      incharge_contact_number: "",
      capacity: "",
      number_of_classrooms: "",
      opening_date: "",
      facilities: {
        playground: true,
        kitchen: true,
        cctv: true,
        sleeping_area: true,
        library: true,
        medical_room: true,
        parking: false,
        garden: false,
      },
      remarks: "",
    },
  });

  const onSubmit = (data: AddBranchData) => {
    console.log("Submitted Data:", data);
    // You can add API call here
    // router.push("/cms/branch-management")
  };
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
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

      <form 
        className="flex flex-col gap-8" 
        onSubmit={handleSubmit(onSubmit, onError)} 
        autoComplete="off"
        data-form-type="custom"
        data-extension-ignore="true"
      >
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-6">
          <TextInput
            id="branch_id"
            label="Branch ID"
            placeholder="BBA-EMP00001"
            register={register}
            errors={errors}
            variant="square"
            disabled
          />
          <SelectInput
            id="school_id"
            label="School"
            options={[{ label: "Select School", value: "" }, { label: "La Marque", value: "La Marque" }, { label: "Houston", value: "Houston" }]}
            register={register}
            errors={errors}
            required
          />
          <div className="col-span-2">
            <TextInput
              id="branch_name"
              label="Branch Name"
              placeholder="La Marque Daycare Center"
              register={register}
              errors={errors}
              variant="square"
              required
            />
          </div>
          <TextInput
            id="branch_code"
            label="Branch Code"
            placeholder="DYC-001"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <SelectInput
            id="branch_type"
            label="Branch Type"
            options={[
              { label: "Daycare", value: "Daycare" },
              { label: "Preschool", value: "Preschool" },
              { label: "Elementary", value: "Elementary" },
            ]}
            register={register}
            errors={errors}
            required
          />
          <div className="col-span-2">
            <TextAreaInput
              id="address"
              label="Address"
              placeholder="Enter your address"
              register={register}
              errors={errors}
              required
              rows={4}
              cols={50}
            />
          </div>
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
          <EmailInput
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
            placeholder="Enter incharge name"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="incharge_contact_number"
            label="Incharge Contact Number"
            placeholder="Enter contact number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="capacity"
            label="Capacity"
            placeholder="Enter capacity"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <TextInput
            id="number_of_classrooms"
            label="Number of Classrooms"
            placeholder="Enter number"
            register={register}
            errors={errors}
            variant="square"
            required
          />
          <DateInput
            id="opening_date"
            label="Opening Date"
            placeholder="mm/dd/yyyy"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />

          {/* Facilities Checkboxes */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facilities
            </label>
            <div className="grid grid-cols-4 gap-4">
              <CheckBoxInput
                id="facilities.playground"
                label="Playground"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.kitchen"
                label="Kitchen"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.cctv"
                label="CCTV"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.sleeping_area"
                label="Sleeping Area"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.library"
                label="Library"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.medical_room"
                label="Medical Room"
                defaultChecked={true}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.parking"
                label="Parking"
                defaultChecked={false}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <CheckBoxInput
                id="facilities.garden"
                label="Garden"
                defaultChecked={false}
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
            </div>
          </div>

          <TextAreaInput
            id="remarks"
            label="Remarks"
            placeholder="Enter your remarks"
            register={register}
            errors={errors}
            required
            rows={5}
          />
          <div>
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
            <Alert title="Quick Tip" description="Activities can only be performed by active branch."/> 
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

export default AddBranchManagement;
