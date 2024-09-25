import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex h-9 w-full placeholder:text-neutral-500 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "focus-visible:ring-1 focus-visible:ring-neutral-950 rounded-md border-neutral-200 border",
        checkout: "bg-transparent border-b-red-700 border-b outline-none py-2 text-lg focus:border-b-red-950 transition-all placeholder:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }