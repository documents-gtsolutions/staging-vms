"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
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
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartData = [
  { month: "Jan", revenue: 6000, profit: 3500, expenses: 2500 },
  { month: "Feb", revenue: 5000, profit: 2800, expenses: 2200 },
  { month: "Mar", revenue: 6500, profit: 3800, expenses: 2700 },
  { month: "Apr", revenue: 13785, profit: 8650, expenses: 5135 },
  { month: "May", revenue: 7000, profit: 4200, expenses: 2800 },
  { month: "Jun", revenue: 8200, profit: 5000, expenses: 3200 },
  { month: "Jul", revenue: 9000, profit: 5500, expenses: 3500 },
  { month: "Aug", revenue: 10500, profit: 6500, expenses: 4000 },
];

export function RevenueChartChartJS() {
  const selectedMonth = "Apr";
  const selectedMonthIndex = chartData.findIndex(item => item.month === selectedMonth);
  const selectedData = chartData[selectedMonthIndex];

  const data: ChartData<'line'> = {
    labels: chartData.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: chartData.map(item => item.revenue),
        borderColor: '#6366f1',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: (ctx) => {
          // Show point for selected month
          return ctx.dataIndex === selectedMonthIndex ? 4 : 0;
        },
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6366f1',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6366f1',
        pointHoverBorderColor: '#fff',
      },
      {
        label: 'Profit',
        data: chartData.map(item => item.profit),
        borderColor: '#8b5cf6',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: (ctx) => {
          // Show point for selected month
          return ctx.dataIndex === selectedMonthIndex ? 4 : 0;
        },
        pointBackgroundColor: '#fff',
        pointBorderColor: '#8b5cf6',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8b5cf6',
        pointHoverBorderColor: '#fff',
      },
      {
        label: 'Expenses',
        data: chartData.map(item => item.expenses),
        borderColor: '#c4b5fd',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: (ctx) => {
          // Show point for selected month
          return ctx.dataIndex === selectedMonthIndex ? 4 : 0;
        },
        pointBackgroundColor: '#fff',
        pointBorderColor: '#c4b5fd',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#c4b5fd',
        pointHoverBorderColor: '#fff',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'white',
        titleColor: '#6b7280',
        bodyColor: '#111827',
        borderColor: 'rgba(229, 231, 235, 0.5)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 12,
          weight: 'normal',
        },
        callbacks: {
          title: function(tooltipItems: TooltipItem<'line'>[]) {
            const month = tooltipItems[0].label;
            return `Revenue`;
          },
          label: function(context: TooltipItem<'line'>) {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            
            if (label === 'Revenue') {
              return `${label}: $${value.toLocaleString()}`;
            } else if (label === 'Profit') {
              return `${label}: $${value.toLocaleString()}`;
            } else if (label === 'Expenses') {
              return `${label}: $${value.toLocaleString()}`;
            }
            return `${label}: ${value}`;
          }
        }
      }
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
        max: 12000,
        grid: {
          drawBorder: false,
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
            if (value === 3000) return '3k';
            if (value === 6000) return '6k';
            if (value === 9000) return '9k';
            if (value === 12000) return '12k';
            return '';
          },
          stepSize: 3000
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  } as ChartOptions<'line'>;

  return (
    <Card className="w-full gap-4 h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className='flex items-center justify-between w-full'>
          <CardTitle className="text-[#7752FF] text-base font-semibold">Revenue Summary</CardTitle>
          <div className="flex items-center gap-2 mt-1">
          <Select>
            <SelectTrigger className="w-fit bg-[#E4EBF3] py-2 px-3 rounded-full text-sm font-medium text-[#7752FF] border-none outline-none">
                <SelectValue placeholder="Last 8 Months" className='text-sm font-medium text-[#7752FF]' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="8" className='text-sm font-medium text-[#7752FF]'>Last 8 Months</SelectItem>
                <SelectItem value="6" className='text-sm font-medium text-[#7752FF]'>Last 6 Months</SelectItem>
                <SelectItem value="3" className='text-sm font-medium text-[#7752FF]'>Last 3 Months</SelectItem>
            </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className='flex items-center justify-between w-full'>
        <div className="mb-4">
          <h2 className="text-3xl font-bold">$289,554</h2>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
        <div className="text-xs text-gray-500  w-[97px] flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className=" text-purple-500">--</span>
            <span>Profit</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-purple-500">--</span>
            <span>Expenses</span>
          </div>
        </div>
        </div>
        <div className="h-[200px] relative">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
