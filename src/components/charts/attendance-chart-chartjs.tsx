"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = [
  { date: "Jul 29", present: 80, absent: 15 },
  { date: "Aug 29", present: 95, absent: 10 },
  { date: "Sep 29", present: 85, absent: 20 },
  { date: "Oct 29", present: 90, absent: 15 },
  { date: "Nov 29", present: 85, absent: 20 },
  { date: "Dec 29", present: 95, absent: 10 },
  { date: "Jan 30", present: 90, absent: 15 },
];

export function AttendanceChartChartJS() {
  const data: ChartData<'bar'> = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: 'Present',
        data: chartData.map(item => item.present),
        backgroundColor: '#E4EBF3',
        hoverBackgroundColor: '#7752FF',
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        barThickness: 27
      },
      {
        label: 'Absent',
        data: chartData.map(item => item.absent),
        backgroundColor: '#e5e7eb',
        hoverBackgroundColor: '#d1d5db', // Slightly darker shade for hover
        borderRadius: 4,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        barThickness: 27
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#7752FF',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        bodyFont: {
          size: 12,
          weight: 'bold',
        },
        titleFont: {
          size: 12,
          weight: 'normal',
        },
        callbacks: {
          title: function(tooltipItems: TooltipItem<'bar'>[]) {
            const date = tooltipItems[0].label;
            return date;
          },
          label: function(context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          }
        },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          }
        }
      },
      y: {
        display: true,
        min: 0,
        max: 120,
        grid: {
          color: '#f3f4f6',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
          padding: 10,
          callback: function(value) {
            if (value === 0) return '0';
            if (value === 30) return '30';
            if (value === 60) return '60';
            if (value === 90) return '90';
            if (value === 120) return '120';
            return '';
          },
          stepSize: 30
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <Card className="w-full gap-4 h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className='flex items-center justify-between w-full'>
          <CardTitle className="text-[#7752FF] text-base font-semibold">Attendance Overview</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Select>
              <SelectTrigger className="w-fit bg-[#E4EBF3] py-2 px-3 rounded-full text-sm font-medium text-[#7752FF] border-none outline-none">
                <SelectValue placeholder="Last 7 Month" className='text-sm font-medium text-[#7752FF]' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7" className='text-sm font-medium text-[#7752FF]'>Last 7 Month</SelectItem>
                <SelectItem value="6" className='text-sm font-medium text-[#7752FF]'>Last 6 Month</SelectItem>
                <SelectItem value="3" className='text-sm font-medium text-[#7752FF]'>Last 3 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className='flex items-center justify-between w-full'>
          <div className="mb-4">
            <h2 className="text-3xl font-bold">3,786</h2>
            <p className="text-sm text-gray-500">Total Check-ins This Month</p>
          </div>
          <div className="text-xs text-gray-500 w-[97px] flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="bg-[#E4EBF3] rounded-full w-2 h-2"></span>
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#E4EBF3] rounded-full w-2 h-2"></span>
              <span>Absent</span>
            </div>
          </div>
        </div>
        <div className="h-[200px] relative">
          <Bar options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
