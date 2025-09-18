"use client"
import { ChevronRight, LucideIcon, Minus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  href?: string
  icon: LucideIcon
  label: string
  children?: {
    label: string
    href: string
  }[]
  onClick?: () => void
  isCollapsed?: boolean
}

const SidebarItem = ({ href, icon: Icon, label, children, onClick, isCollapsed = false }: SidebarItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href;
  const isActiveChild = children?.some(child => pathname === child.href);
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
      setIsOpen(!isOpen)
      onClick?.()
    }
  return (
    <li className="group">
      <Link
        onClick={handleClick || onClick}
        href={href || ''}
        className={cn(
          "flex items-center justify-between gap-x-3 text-[#475467] text-sm bg-white group-hover:text-[#7752FF] group-hover:font-medium group-hover:bg-[#F4F2FF] px-2 py-2.5 w-full rounded-xl",
          isActive && "text-[#7752FF] font-medium bg-[#F4F2FF]",
          isActiveChild && "font-medium bg-[#F4F2FF]",
          isCollapsed && "justify-center"
        )}
        title={isCollapsed ? label : undefined}
      >
        {isCollapsed ? (
          <Icon size={20} />
        ) : (
          <>
            <div className="flex items-center gap-x-3">
              <Icon size={20} />
              <span className='text-nowrap'>{label}</span>
            </div>
            {children && (
              <ChevronRight size={20} className={`text-[#475467] ${isOpen ? 'rotate-90' : ''} transition-all duration-300`} />
            )}
          </>
        )}
      </Link>
      {!isCollapsed && children && isOpen && (
        <div className="flex flex-col gap-2 my-2">
          {children.map((child) => (
            <Link 
              href={child.href} 
              key={child.label} 
              className={cn(
                `flex items-center gap-x-3 text-[#475467] text-sm bg-white px-2 py-2.5 w-full rounded-xl text-nowrap`, 
                pathname === child.href && "text-[#7752FF] font-medium bg-[#F4F2FF]"
              )}
            >
              <span><Minus size={16} className={`${pathname === child.href ? 'text-[#7752FF]' : 'text-[#475467]'} `}/></span>
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}

export default SidebarItem
