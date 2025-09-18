import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { cn } from '../lib/utils'

interface UserProfileProps {
  name: string
  status?: 'Online' | 'Away' | 'Busy' | 'Offline'
  avatarUrl?: string
  className?: string
}

export const UserProfile = ({
  name,
  status = 'Offline',
  avatarUrl,
  className,
}: UserProfileProps) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex flex-col items-end text-sm">
        <span className="font-bold text-base text-[#101828]">{name}</span>
      </div>
      <div className="relative">
        <Avatar className="h-8 w-8 border border-gray-200">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : null}
          <AvatarFallback className="bg-indigo-100 text-indigo-600">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
} 