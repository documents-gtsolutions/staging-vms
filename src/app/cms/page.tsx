"use client";
import React from "react";
import Footer from "@/components/auth/Footer";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Briefcase,
  CreditCard,
  FileText,
  Lock,
  MessageCircle,
  LogOut,
  UserRound,
  Users,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import FeatureCard from "./components/FeatureCard";

const Data = [
  {
    icon: Briefcase,
    title: "Family Data & Accounting",
    description: "Generate text, image, code, chat and even more with",
  },
  {
    icon: Users,
    title: "Employee Data & Payroll",
    description: "Access to valuable user insight, analytics and activity.",
  },
  {
    icon: Lock,
    title: "Payment Gateways",
    description: "Securely process credit card, debit card, or other methods.",
  },
  {
    icon: CreditCard,
    title: "Expenses & Ledger",
    description: "Access to valuable user insight, analytics and activity.",
  },
  {
    icon: MessageCircle,
    title: "Messaging",
    description: "Securely process credit card, debit card, or other methods.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    description:
      "Ability to understand and generate content in different languages",
  },
  {
    icon: FileText,
    title: "Admissions",
    description: "Access to valuable user insight, analytics and activity.",
  },
  {
    icon: FileText,
    title: "Paper Work",
    description: "Securely process credit card, debit card, or other methods.",
  },
  {
    icon: BarChart,
    title: "Reporting",
    description:
      "Ability to understand and generate content in different languages",
  },
];

const WelcomePage = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="bg-white w-full min-h-screen flex flex-col relative">
      <div className="absolute bottom-[76px] left-0 w-[90] h-[305px] -z-0">
        <Image
          src="/images/welcome/layer.svg"
          alt="welcome"
          width={305}
          height={305}
          className="object-contain w-full h-full"
        />
      </div>
      {/* Header Section */}
      <div className="max-w-[2520px] mx-auto w-full px-4 md:px-8 lg:px-12 xl:px-20 pt-10 pb-6 z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column with Image */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-full aspect-square mb-8 h-[300px]">
              <Image
                src="/images/welcome/placeholder.png"
                alt="welcome"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="w-full text-center">
              <Button
                className="bg-gray-200 hover:bg-gray-200 mx-auto text-gray-700 text-sm mb-4 rounded-full"
              >
                Unleash the Power of CMSC AI System
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Handle your daycare smarter and quicker with AI!
              </h1>
              <p className="text-sm text-gray-700 mb-6">
                One simple tool to handle your whole daycare in minutes! Manage
                staff, kids, and tasks all in one easy platform!
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <Button
                  onClick={() => router.push("/cms/dashboard")}
                  variant={"gradient"}
                  className="rounded-md w-[178px] h-[54px]"
                >
                  <UserRound />
                  Admin Panel
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-[#7752FF] border-gray-300 w-[135px] h-[54px]"
                >
                  <LogOut /> Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column with Feature Cards */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-center mb-3">
              The Future of Child Care
            </h1>
            <p className="text-center text-gray-500 mb-8">
              One simple tool to handle your whole daycare in minutes! Manage
              staff, kids, and tasks all in one easy platform!
            </p>

            {/* Top Row of Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {Data.map((item) => (
                <FeatureCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WelcomePage;
