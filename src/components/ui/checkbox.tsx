import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.ComponentProps<"input"> {
  className?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "h-4 w-4 rounded border-2 border-gray-300 text-[#842DF0] focus:ring-[#842DF0] focus:ring-2 focus:ring-offset-0 transition-colors",
          "checked:bg-[#842DF0] checked:border-[#842DF0]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox } 