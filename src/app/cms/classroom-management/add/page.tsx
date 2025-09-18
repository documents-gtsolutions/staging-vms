"use client";
import React from "react";
import Heading from "@/components/common/Heading";
import { Path, useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import SelectInput from "@/components/Inputs/SelectInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import TimeInput from "@/components/Inputs/TimeInput";
import CheckBoxInput from "@/components/Inputs/CheckBoxInput";
import {
  ArtStudioIcon,
  BedIcon,
  BoardIcon,
  BookIcon,
  CalendarIcon2,
  CameraIcon,
  ColdIcon,
  EatIcon,
  GearIcon,
  InfoIcon,
  MusicIcon,
  PlantIcon,
  PlaygroundIcon,
  PuzzleIcon,
  StickyNoteIcon,
  UsersIcon,
  WashroomIcon,
  XIcon,
} from "@/icon";
import { Save, X } from "lucide-react";
import SwitchInput from "@/components/Inputs/SwitchInput";
import Alert from "@/components/common/Alert";

type AddClassroomData = {
  classroom_id: string;
  classroom_name: string;
  classroom_code: string;
  branch: string;
  classroom_type: string;
  capacity: string;
  age_from: string;
  age_to: string;
  start_time: string;
  end_time: string;
  assigned_teacher: string;
  support_staff: string;
  facilities: {
    toys: boolean;
    sleep_area: boolean;
    smart_board: boolean;
    cctv: boolean;
    ac: boolean;
    washroom: boolean;
    playground: boolean;
    library: boolean;
    kitchen: boolean;
    garden: boolean;
    music_room: boolean;
    art_studio: boolean;
  };
  remarks: string;
  status: boolean;
};

const facilities = [
  {
    id: "toys",
    label: "Toys",
    icon: <PuzzleIcon size={32} />,
  },
  {
    id: "sleep_area",
    label: "Sleep Area",
    icon: <BedIcon size={32} />,
  },
  {
    id: "smart_board",
    label: "Smart Board",
    icon: <BoardIcon size={32} />,
  },
  {
    id: "cctv",
    label: "CCTV",
    icon: <CameraIcon size={32} />,
  },
  {
    id: "ac",
    label: "AC",
    icon: <ColdIcon size={32} />,
  },
  {
    id: "washroom",
    label: "Washroom",
    icon: <WashroomIcon size={32} />,
  },
  {
    id: "playground",
    label: "Playground",
    icon: <PlaygroundIcon size={32} />,
  },
  {
    id: "library",
    label: "Library",
    icon: <BookIcon size={32} />,
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: <EatIcon size={32} />,
  },
  {
    id: "garden",
    label: "Garden",
    icon: <PlantIcon size={32} />,
  },
  {
    id: "music_room",
    label: "Music Room",
    icon: <MusicIcon size={32} />,
  },
  {
    id: "art_studio",
    label: "Art Studio",
    icon: <ArtStudioIcon size={32} />,
  },
];
const AddClassroomManagement = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddClassroomData>({
    defaultValues: {
      classroom_id: "CR-00001",
      classroom_name: "",
      classroom_code: "",
      branch: "",
      classroom_type: "",
      capacity: "",
      age_from: "",
      age_to: "",
      start_time: "",
      end_time: "",
      assigned_teacher: "",
      support_staff: "",
      facilities: {
        toys: false,
        sleep_area: false,
        smart_board: false,
        cctv: false,
        ac: false,
        washroom: false,
        playground: false,
        library: false,
        kitchen: false,
        garden: false,
        music_room: false,
        art_studio: false,
      },
      remarks: "",
      status: false,
    },
  });

  const onSubmit = (data: AddClassroomData) => {
    console.log("Submitted Data:", data);
    // You can add API call here
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <Heading
          title="Add Classroom"
          backTo="/cms/classroom-management"
          backToText="Back to Classroom Management"
        />
      </div>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <InfoIcon size={18} />
            <h2 className="text-base font-bold">Basic Information</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <TextInput
              id="classroom_id"
              label="Classroom ID"
              placeholder="CR-00001"
              register={register}
              errors={errors}
              variant="square"
              disabled
            />
            <TextInput
              id="classroom_name"
              label="Classroom Name"
              placeholder="Enter classroom name"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="classroom_code"
              label="Classroom Code"
              placeholder="Enter code"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <SelectInput
              id="branch"
              label="Branch/School"
              options={[
                { label: "Select Branch", value: "" },
                { label: "La Marque", value: "La Marque" },
                { label: "Houston", value: "Houston" },
              ]}
              register={register}
              errors={errors}
              required
            />
            <SelectInput
              id="classroom_type"
              label="Classroom Type"
              options={[
                { label: "Select Type", value: "" },
                { label: "Nursery", value: "Nursery" },
                { label: "Kindergarten", value: "Kindergarten" },
                { label: "Preschool", value: "Preschool" },
              ]}
              register={register}
              errors={errors}
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
          </div>
        </div>

        {/* Age Group & Schedule */}
        <div className="bg-[#EFF6FF] rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon2 size={18} color="#2563EB" />
            <h2 className="text-base font-bold">Age Group & Schedule</h2>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <TextInput
              id="age_from"
              label="Age From (Years)"
              placeholder="Enter age"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="age_to"
              label="Age To (Years)"
              placeholder="Enter age"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TimeInput
              id="start_time"
              label="Start Time"
              placeholder="Enter time"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TimeInput
              id="end_time"
              label="End Time"
              placeholder="Enter time"
              register={register}
              errors={errors}
              variant="square"
              required
            />
          </div>
        </div>

        {/* Staff Assignment */}
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <UsersIcon size={23} color="#16A34A" />
            <h2 className="text-base font-bold">Staff Assignment</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <TextInput
              id="assigned_teacher"
              label="Assigned Teacher(s)"
              placeholder="Enter country"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="support_staff"
              label="Support Staff (Optional)"
              placeholder="Enter contact number"
              register={register}
              errors={errors}
              variant="square"
            />
          </div>
        </div>

        {/* Facilities & Amenities */}
        <div className="bg-purple-50 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <GearIcon size={23} />
            <h2 className="text-base font-bold">Facilities & Amenities</h2>
          </div>

          <div className="grid grid-cols-6 gap-6">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="border border-[#E5E7EB] p-4 rounded-md flex items-center gap-2"
              >
                <CheckBoxInput
                  id={`facilities.${facility.id}` as Path<AddClassroomData>}
                  label={facility.label}
                  icon={facility.icon}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <StickyNoteIcon size={23} />
            <h2 className="text-base font-bold  ">Additional Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextAreaInput
                id="remarks"
                label="Remarks/Notes"
                placeholder="Additional notes, special requirements, or remarks..."
                register={register}
                errors={errors}
                rows={5}
              />
            </div>
            <div>
              <SwitchInput
                id="status"
                label="Status"
                subLabel="Active"
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <Alert
                title="Quick Tip"
                description="Activities can only be performed by active classroom."
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-between">
          <Button
            variant={"outline"}
            type="button"
            className="px-8 py-5 h-[54px] w-[180px]"
          >
            <XIcon size={16} />
            Reset Form
          </Button>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="h-[54px] w-[185px] rounded-md"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="h-[54px] w-[225px] rounded-md"
            >
              <Save size={16} />
              Save Classroom
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClassroomManagement;
