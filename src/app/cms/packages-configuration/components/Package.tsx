import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface PackageProps {
    data: {
        id: string;
        title: string;
        totalCompanies: string;
        features: {
          title: string;
        }[];
    }
}

const Package = ({ data }: PackageProps) => {
    const router = useRouter();
  return (
    <div className="p-8 rounded-lg shadow-md border-2 card-gradient bg-white gap-8 flex flex-col">
      <div>
        <h3 className="font-bold text-[26px] text-gray-900">{data.title}</h3>
        <p className="text-gray-700 text-sm">
          Total companies with this packages: {data.totalCompanies}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {data.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
          <p className="text-gray-700 text-sm">
            {feature.title}
          </p>
        </div>
        ))}
      </div>
      <div>
        <Button onClick={() => router.push(`/cms/packages-configuration/${data.id}`)} variant="gradient" className="h-[54px] rounded-sm">
          View Pakage
        </Button>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-2 mt-2.5 w-full">
          <Button variant="ghost" className="h-[54px] rounded-sm min-w-[140px] w-full" onClick={()=>{}}>
            Delete Pakage
          </Button>
          <Button onClick={() => router.push(`/cms/packages-configuration/${data.id}/edit`)} className="h-[54px] rounded-sm min-w-[140px] w-full">Edit Pakage</Button>
        </div>
      </div>
    </div>
  );
};

export default Package;
