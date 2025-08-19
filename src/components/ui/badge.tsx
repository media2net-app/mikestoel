import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
  
  const variantClasses = {
    default: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
    secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
    outline: "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className || ""}`
  
  return (
    <div className={classes} {...props} />
  )
}

export { Badge }
