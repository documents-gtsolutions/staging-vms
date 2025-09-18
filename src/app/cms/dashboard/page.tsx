import React from "react";
import { StatsCard } from "../../../components/stats-card";
import { RevenueChartChartJS } from "../../../components/charts/revenue-chart-chartjs";
import { AttendanceChartChartJS } from "../../../components/charts/attendance-chart-chartjs";
import { ChildProgressChart } from "../../../components/charts/child-progress-chart";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import NotificationItem from "@/components/layout/Notification/NotificationItem";
import { NotificationType } from "@/types";

const statsCards = [
  {
    title: "Total Enrolled Children",
    value: "125",
    subtitle: "Target: 150",
    progress: 81,
  },
  {
    title: "Total Staff Members",
    value: "175",
    subtitle: "Last Month: 156",
    progress: 89,
  },
  {
    title: "Monthly Tuition Collected",
    value: "$2,500",
    subtitle: "Target: $40,000",
    progress: 87.5,
  },
  {
    title: "Total Parents Engaged",
    value: "95%",
    subtitle: "Via app, messages, check-ins",
    progress: 95,
  },
];

const notifications = [
  {
    type: NotificationType.UPDATE,
    title: "Attendance Updated",
    subtitle: "Sarah K. marked present for Room 2B",
    time: "10:45 AM",
  },
  {
    type: NotificationType.ENROLLMENT,
    title: "New Enrollment",
    subtitle: "John Doe enrolled in the program",
    time: "10:45 AM",
  },
  {
    type: NotificationType.PAYMENT,
    title: "Payment Received",
    subtitle: "John Doe paid for the program",
    time: "10:45 AM",
  },
  {
    type: NotificationType.MESSAGE,
    title: "New Message",
    subtitle: "John Doe sent a message",
    time: "10:45 AM",
  },
];

export default function Dashboard() {
  return (
    <div className="bg-[#f9fafb] min-h-screen p-4 md:p-6">
      <div className="space-y-4">
        {/* Top stats row */}
        <div className="grid grid-cols-1 2xl:grid-cols-4 md:grid-cols-2 gap-4">
          {statsCards.map((card) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              progress={card.progress}
            />
          ))}
        </div>

        {/* Charts row - Revenue and Attendance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RevenueChartChartJS />
          <AttendanceChartChartJS />
        </div>

        {/* Child Progress Chart row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChildProgressChart />
          <div className="w-full min-h-[414px] h-fit bg-white rounded-2xl py-4 px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <div>
                <Button className="bg-white text-black gap-2 hover:bg-gray-100">
                  <Ellipsis size={16} />
                </Button>
              </div>
            </div>
            <div className="">
              <h5 className="text-sm font-medium text-[#7752FF]">Today</h5>
              <div className="flex flex-col gap-3.5 mt-3.5">
                {notifications.map((notification, i) => (
                  <NotificationItem key={i} data={notification} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
