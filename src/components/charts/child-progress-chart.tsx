"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
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
  Title,
  Tooltip,
  Filler,
  Legend
);

const chartData = [
  { month: "Jan", value: 105.9 },
  { month: "Feb", value: 106.2 },
  { month: "Mar", value: 105.9 },
  { month: "Apr", value: 106.4 },
  { month: "May", value: 106.2 },
  { month: "Jun", value: 106.9 },
  { month: "Jul", value: 106.5 },
  { month: "Aug", value: 107.2 },
  { month: "Sep", value: 106.9 },
  { month: "Oct", value: 107.8 },
  { month: "Nov", value: 107.5 },
  { month: "Dec", value: 108.6 },
];

export function ChildProgressChart() {
  const data: ChartData<'line'> = {
    labels: chartData.map(item => item.month),
    datasets: [
      {
        label: 'Progress Index',
        data: chartData.map(item => item.value),
        borderColor: '#7752FF',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(119, 82, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(119, 82, 255, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#7752FF',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#7752FF',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
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
          title: function(tooltipItems: TooltipItem<'line'>[]) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = tooltipItems[0].label;
            const monthIndex = chartData.findIndex(item => item.month === month);
            const fullMonthName = monthNames[monthIndex];
            return `${fullMonthName} 2030`;
          },
          label: function(context: TooltipItem<'line'>) {
            const value = context.parsed.y;
            return `${value.toFixed(1)} points`;
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
        min: 105,
        max: 109,
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
          callback: function(value: number) {
            return value;
          },
          stepSize: 1
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
  } as any;

  return (
    <Card className="w-full gap-4 h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className='flex items-center justify-between w-full'>
          <CardTitle className="text-[#7752FF] text-base font-semibold">Child Progress Index</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Select>
              <SelectTrigger className="w-fit bg-[#E4EBF3] py-2 px-3 rounded-full text-sm font-medium text-[#7752FF] border-none outline-none">
                <SelectValue placeholder="This Year" className='text-sm font-medium text-[#7752FF]' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year" className='text-sm font-medium text-[#7752FF]'>This Year</SelectItem>
                <SelectItem value="6months" className='text-sm font-medium text-[#7752FF]'>Last 6 Months</SelectItem>
                <SelectItem value="3months" className='text-sm font-medium text-[#7752FF]'>Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="h-[300px] relative">
          <Line options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
