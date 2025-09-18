import React from 'react'
import { Bell } from 'lucide-react'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip'
import { Button } from '../../ui/button'

export const Notifications = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className='relative'><Bell size={18} />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-600"></span>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">You have 4 unread notifications</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 