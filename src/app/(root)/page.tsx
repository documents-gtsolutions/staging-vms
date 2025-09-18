"use client";

import DropZone from "@/components/Inputs/Dropzone";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoadingSpinner } from "@/components/loading-spinner";
// import { useAppSelector } from "@/app/store";

export default function HomePage() {
  // const { user, loading } = useAppSelector(state => state.auth);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       router.push("/cms");
  //     }
  //   }
  // }, [user, loading, router]);

  // Show loading spinner while authentication state is being determined
  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  // Return null as we're handling navigation in the useEffect
  return (
    <div>
      Home Page
    </div>
  );
}