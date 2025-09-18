import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative min-h-screen bg-[#FCFCFC] overflow-x-hidden">
        <div className="absolute top-[76px] -left-6 w-[400px] h-[400px]">
          <Image
            src="/images/auth-layer.png"
            alt="login-bg"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-[76px] -right-6 w-[400px] h-[400px]">
          <Image
            src="/images/auth-layer.png"
            alt="login-bg"
            fill
            className="object-contain rotate-180"
          />
        </div>
        <Header />
        <div className="w-full flex items-center justify-center min-h-[calc(100vh-76px)]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
