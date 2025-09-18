import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number; // Value between 0-100
  size?: number; // Size in pixels
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({
  value,
  size = 70,
  strokeWidth = 8,
  color = '#7752FF'
}: CircularProgressProps) {
  // Ensure value is between 0-100
  const percentage = Math.min(100, Math.max(0, value));
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center")} style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E4EBF3"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
        <div className="absolute inset-0 flex items-center justify-center p-2  rounded-full">
          <div className={`bg-[#E4EBF3] rounded-full flex items-center justify-center p-4`} style={{ width: size - 30, height: size - 30, }}>
          <span className="text-[11px] font-medium" style={{ color }}>{value}%</span>
          </div>
        </div>
    </div>
  );
}
