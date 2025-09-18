import FeatureCard from '@/app/cms/components/FeatureCard'
import { LayoutDashboard, PenTool, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import FinanceReport from './tabs/Finance';
import AttendenceReport from './tabs/Attendence';
import PayrollReport from './tabs/Payroll';
import ConsolidatedReport from './tabs/Consolidated';

type Active = 'finance' | 'attendance' | 'payroll' | 'consolidated';

const data = [
    {
        title: 'Finance Report',
        description: 'Fee collection, expenses, net balance',
        icon: PenTool,
        active: 'finance',
    },
    {
        title: 'Attendance Report',
        description: 'Students and staff attendance',
        icon: LayoutDashboard,
        active: 'attendance',
    },
    {
        title: 'Payroll Report',
        description: 'Salaries, overtime, deductions',
        icon: Wallet,
        active: 'payroll',
    },
    {
        title: 'Consolidated Report',
        description: 'Complete summary with P&L',
        icon: Wallet,
        active: 'consolidated',
    },
]

const Report = () => {
  const [active, setActive] = useState<Active>('finance');

  return (
    <div className='flex flex-col gap-5'>
        <div className='bg-white p-4 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {data.map((item) => (
                    <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} active={active === item.active} onClick={() => setActive(item.active as Active)} />
                ))}
            </div>
        </div>
        {active === 'finance' && <FinanceReport />}
        {active === 'attendance' && <AttendenceReport />}
        {active === 'payroll' && <PayrollReport />}
        {active === 'consolidated' && <ConsolidatedReport />}
    </div>
  )
}

export default Report