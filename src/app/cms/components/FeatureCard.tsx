import { LucideIcon } from "lucide-react";
import React from "react";
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  active?: boolean;
}
const FeatureCard = ({ icon: Icon, title, description, onClick, active }: FeatureCardProps) => {
  return (
    <div className={`group ${active ? 'active' : ''}`} onClick={onClick}>
      <div
        className={`border p-8 flex flex-col items-center text-center h-full border-gray-200 transition group-hover:bg-white card-gradient rounded-2xl ${active ? 'bg-white' : 'bg-gray-100'}`}
      >
        <div
          className={`bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-3 icon`}
        >
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
