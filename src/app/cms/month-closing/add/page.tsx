"use client";
import React from "react";
import Heading from "@/components/common/Heading";
import { useForm } from "react-hook-form";
import TextInput from "@/components/Inputs/TextInput";
import { Button } from "@/components/ui/button";
import SelectInput from "@/components/Inputs/SelectInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "@/components/Inputs/TextAreaInput";
import {
  CircleDollarSign,
  FileText,
  Info,
  Save,
  SaveIcon,
  Users,
  X,
} from "lucide-react";
import { StickyNoteIcon, UsersIcon } from "@/icon";

type AddMonthClosingData = {
  closing_id: string;
  school: string;
  branch: string;
  month: string;
  year: string;
  approval_status: string;
  // Student Information
  total_students: string;
  present_percentage: string;
  absent_percentage: string;
  leaves_percentage: string;
  // Staff Information
  total_staff: string;
  staff_attendance_percentage: string;
  // Fee & Invoicing
  total_expected_fee: string;
  total_collected: string;
  pending_collections: string;
  // Expense Management
  utilities: string;
  supplies: string;
  rent: string;
  maintenance: string;
  total_expenses: string;
  // Payroll Information
  base_salaries: string;
  overtime: string;
  deductions: string;
  total_payroll: string;
  // Notes
  remarks: string;
};

const months = [
  { label: "Select Month", value: "" },
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];

const years = [
  { label: "Select Year", value: "" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
];

const schools = [
  { label: "Select School", value: "" },
  {
    label: "Building Blocks Academy (La Marque)",
    value: "Building Blocks Academy (La Marque)",
  },
  {
    label: "Building Blocks Academy (Bear Creek)",
    value: "Building Blocks Academy (Bear Creek)",
  },
  {
    label: "Building Blocks Academy (Hobby Airport)",
    value: "Building Blocks Academy (Hobby Airport)",
  },
  {
    label: "Building Blocks Academy (Alvin)",
    value: "Building Blocks Academy (Alvin)",
  },
  {
    label: "Building Blocks Academy (Pasadena)",
    value: "Building Blocks Academy (Pasadena)",
  },
];

const branches = [
  { label: "Select Branch", value: "" },
  { label: "La Marque", value: "La Marque" },
  { label: "Houston", value: "Houston" },
];

const approvalStatuses = [
  { label: "Select Approval Status", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Locked", value: "Locked" },
];

const AddMonthClosing = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AddMonthClosingData>({
    defaultValues: {
      closing_id: "CLS-2024-001",
      school: "",
      branch: "",
      month: "",
      year: "",
      approval_status: "",
      total_students: "",
      present_percentage: "",
      absent_percentage: "",
      leaves_percentage: "",
      total_staff: "",
      staff_attendance_percentage: "",
      total_expected_fee: "",
      total_collected: "",
      pending_collections: "",
      utilities: "",
      supplies: "",
      rent: "",
      maintenance: "",
      total_expenses: "",
      base_salaries: "",
      overtime: "",
      deductions: "",
      total_payroll: "",
      remarks: "",
    },
  });

  // Calculate total expenses
  const calculateTotalExpenses = () => {
    const utilities = parseFloat(watch("utilities") || "0");
    const supplies = parseFloat(watch("supplies") || "0");
    const rent = parseFloat(watch("rent") || "0");
    const maintenance = parseFloat(watch("maintenance") || "0");

    const total = utilities + supplies + rent + maintenance;
    setValue("total_expenses", total.toString());
    return total;
  };

  // Calculate total payroll
  const calculateTotalPayroll = () => {
    const baseSalaries = parseFloat(watch("base_salaries") || "0");
    const overtime = parseFloat(watch("overtime") || "0");
    const deductions = parseFloat(watch("deductions") || "0");

    const total = baseSalaries + overtime - deductions;
    setValue("total_payroll", total.toString());
    return total;
  };

  // Calculate net balance
  const calculateNetBalance = () => {
    const totalCollected = parseFloat(watch("total_collected") || "0");
    const totalExpenses = calculateTotalExpenses();
    const totalPayroll = calculateTotalPayroll();

    return totalCollected - totalExpenses - totalPayroll;
  };

  const onSubmit = (data: AddMonthClosingData) => {
    console.log("Submitted Data:", data);
    // You can add API call here
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Heading
          title="Create New Month Closing"
          backTo="/cms/month-closing"
          backToText="Back to Manage Page"
        />
      </div>

      <form
        className="bg-white p-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TextInput
            id="closing_id"
            label="Closing ID"
            placeholder="CLS-2024-001"
            register={register}
            errors={errors}
            variant="square"
            disabled
          />
          <SelectInput
            id="month"
            label="Month"
            options={months}
            register={register}
            errors={errors}
            required
          />
          <SelectInput
            id="year"
            label="Year"
            options={years}
            register={register}
            errors={errors}
            required
          />
          <SelectInput
            id="school"
            label="School"
            options={schools}
            register={register}
            errors={errors}
            required
          />
          <SelectInput
            id="branch"
            label="Branch"
            options={branches}
            register={register}
            errors={errors}
            required
          />
          <SelectInput
            id="approval_status"
            label="Approval Status"
            options={approvalStatuses}
            register={register}
            errors={errors}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Information */}
          <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <UsersIcon size={23} color="#7752FF" />
              <h2 className="text-base font-bold">Student Information</h2>
            </div>
            <TextInput
              id="total_students"
              label="Total Students"
              placeholder="0"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TextInput
                id="present_percentage"
                label="Present %"
                placeholder="0%"
                register={register}
                errors={errors}
                variant="square"
                required
              />
              <TextInput
                id="absent_percentage"
                label="Absent %"
                placeholder="0%"
                register={register}
                errors={errors}
                variant="square"
                required
              />
              <TextInput
                id="leaves_percentage"
                label="Leaves %"
                placeholder="0%"
                register={register}
                errors={errors}
                variant="square"
                required
              />
            </div>
          </div>

          {/* Staff Information */}
          <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <UsersIcon size={23} color="#7752FF" />
              <h2 className="text-base font-bold">Staff Information</h2>
            </div>
            <TextInput
              id="total_staff"
              label="Total Staff"
              placeholder="0"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="staff_attendance_percentage"
              label="Staff Attendance %"
              placeholder="0%"
              register={register}
              errors={errors}
              variant="square"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fee & Invoicing */}
          <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <UsersIcon size={23} color="#7752FF" />
              <h2 className="text-base font-bold">Fee & Invoicing</h2>
            </div>
            <TextInput
              id="total_expected_fee"
              label="Total Expected Fee"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="total_collected"
              label="Total Collected"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
            />
            <TextInput
              id="pending_collections"
              label="Pending/Collections"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
            />
          </div>

          {/* Expense Management */}
          <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <UsersIcon size={23} color="#7752FF" />
              <h2 className="text-base font-bold">Expense Management</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                id="utilities"
                label="Utilities"
                placeholder="$0.00"
                register={register}
                errors={errors}
                variant="square"
                required
                onChange={() => calculateTotalExpenses()}
              />
              <TextInput
                id="supplies"
                label="Supplies"
                placeholder="$0.00"
                register={register}
                errors={errors}
                variant="square"
                required
                onChange={() => calculateTotalExpenses()}
              />
              <TextInput
                id="rent"
                label="Rent"
                placeholder="$0.00"
                register={register}
                errors={errors}
                variant="square"
                required
                onChange={() => calculateTotalExpenses()}
              />
              <TextInput
                id="maintenance"
                label="Maintenance"
                placeholder="$0.00"
                register={register}
                errors={errors}
                variant="square"
                required
                onChange={() => calculateTotalExpenses()}
              />
            </div>
            <TextInput
              id="total_expenses"
              label="Total Expenses"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              disabled
              className="font-medium"
            />
          </div>
        </div>
        {/* Payroll Information */}
        <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <UsersIcon size={23} color="#7752FF" />
            <h2 className="text-base font-bold">Payroll Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TextInput
              id="base_salaries"
              label="Base Salaries"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
              onChange={() => calculateTotalPayroll()}
            />
            <TextInput
              id="overtime"
              label="Overtime"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
              onChange={() => calculateTotalPayroll()}
            />
            <TextInput
              id="deductions"
              label="Deductions"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              required
              onChange={() => calculateTotalPayroll()}
            />
            <TextInput
              id="total_payroll"
              label="Total Payroll"
              placeholder="$0.00"
              register={register}
              errors={errors}
              variant="square"
              disabled
              className="font-medium"
            />
          </div>
        </div>
        {/* Net Balance Calculation */}
        <div className="bg-[#F9FAFB] rounded-lg shadow p-6 flex justify-between gap-6">
          <div className="flex items-center gap-2">
            <StickyNoteIcon size={23} color="#7752FF" />
            <h2 className="text-base font-bold">Net Balance Calculation</h2>
          </div>
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-black">
                Total Fee Collected - Total Expenses - Payroll
              </p>
              <p className="text-3xl font-bold mt-2">
                ${calculateNetBalance().toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        {/* Remarks/Notes */}
        <TextAreaInput
          id="remarks"
          label="Remarks/Notes"
          placeholder="Add any additional notes or remarks for this month closing..."
          register={register}
          errors={errors}
          rows={6}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            onClick={() => router.back()}
            className="h-[54px] w-[185px] rounded-md"
          >
            <X size={16} className="text-white font-black" />
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            className="h-[54px] w-[225px] rounded-md"
          >
            <Save size={16} className="text-white font-black" />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMonthClosing;
