import React from 'react'
import { Card } from './ui/card'
// import { colorClass } from '../lib/colors'
import { cn } from '../lib/utils'
import { CircularProgress } from './ui/circular-progress'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  progress?: number // Add progress prop for circular progress
}

export function StatsCard({ 
  title, 
  value, 
  subtitle,
  progress
}: StatsCardProps) {
  return (
    <div className={cn("flex items-center justify-between bg-[#F4F2FF] rounded-2xl p-4")}>
      <div className="">
        <p className="text-[#6E6F78] text-[12px] font-medium ">{title}</p>
        <p className="text-[26px] font-semibold text-[#222432] my-2">{value}</p>
        {subtitle && <p className="text-[11px] text-[#6E6F78]">{subtitle}</p>}
      </div>
      <div className='flex items-center justify-center'>
        {progress !== undefined && (
          <CircularProgress value={progress} size={80} strokeWidth={7} />
        )}
      </div>
    </div>
  )
} 