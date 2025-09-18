"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

type SwitchSize = "sm" | "md" | "lg"

const sizeClasses: Record<SwitchSize, { root: string; thumb: string }> = {
  sm: {
    root: "h-4 w-7",
    thumb: "size-3 translate-x-[calc(100%-2px)]",
  },
  md: {
    root: "h-[1.15rem] w-8",
    thumb: "size-4 translate-x-[calc(100%-2px)]",
  },
  lg: {
    root: "h-6 w-11",
    thumb: "size-5 translate-x-[calc(100%-2px)]",
  },
}

interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: SwitchSize
}

function Switch({ className, size = "md", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#7752FF] data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        sizeClasses[size].root,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          sizeClasses[size].thumb
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
