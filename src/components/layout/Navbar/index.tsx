
'use client'
import React from 'react'
import { MessageCircleMore } from 'lucide-react'
import { Notifications } from '../Notification'
import { UserProfile } from '../../user-profile'
import { useAppSelector } from '@/app/store'
import { Button } from '../../ui/button'

const Navbar = () => {
  const { user } = useAppSelector(state => state.auth);
  
  // Get user display name or fallback to email
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  return (
    <div className="flex items-center justify-between w-full px-4 pt-[22px] pb-[16px] bg-[#f9fafb]">
      <div className="flex items-center gap-2">
        <h1 className='text-[#101828] text-xl font-bold'>
        Admin Panel
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon"><MessageCircleMore size={16} /></Button>
        <Notifications />
        <UserProfile 
          name={displayName} 
          status="Online" 
          avatarUrl={user?.photoURL || undefined} 
        />
      </div>
    </div>
  )
}

export default Navbar
