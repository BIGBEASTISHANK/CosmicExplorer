"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "secondary" | "destructive" | "success" | "warning"
  showValue?: boolean
  animated?: boolean
  striped?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = "md", 
    variant = "default", 
    showValue = false,
    animated = false,
    striped = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4"
    }

    const variantClasses = {
      default: "bg-gradient-to-r from-blue-500 to-blue-600",
      secondary: "bg-gradient-to-r from-gray-400 to-gray-500",
      destructive: "bg-gradient-to-r from-red-500 to-red-600",
      success: "bg-gradient-to-r from-green-500 to-green-600",
      warning: "bg-gradient-to-r from-yellow-500 to-yellow-600"
    }

    const glowClasses = {
      default: "shadow-blue-500/50",
      secondary: "shadow-gray-500/50",
      destructive: "shadow-red-500/50",
      success: "shadow-green-500/50",
      warning: "shadow-yellow-500/50"
    }

    return (
      <div className="w-full space-y-1">
        <div
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-muted/30 border border-border/50",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Progress bar fill */}
          <div
            className={cn(
              "h-full transition-all duration-700 ease-out rounded-full relative overflow-hidden",
              variantClasses[variant],
              percentage > 0 && `shadow-lg ${glowClasses[variant]}`,
              animated && "animate-pulse",
              striped && "bg-stripes"
            )}
            style={{
              width: `${percentage}%`
            }}
          >
            {/* Animated shine effect */}
            {animated && percentage > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
            
            {/* Striped pattern */}
            {striped && (
              <div className="absolute inset-0 bg-stripes opacity-20" />
            )}
          </div>
          
          {/* Optional value display */}
          {showValue && size !== "sm" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn(
                "font-medium text-foreground drop-shadow-sm",
                size === "md" ? "text-xs" : "text-sm"
              )}>
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
        
        {/* External value display for small progress bars */}
        {showValue && size === "sm" && (
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress, type ProgressProps }
