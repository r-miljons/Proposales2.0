import * as React from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { SiteLogo } from "@/components/ui/site-logo"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  children?: React.ReactNode
}

export function Header({ title = "Proposales", children, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow",
        className
      )}
      {...props}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-32 py-2">
        <SiteLogo />
        <div className="flex items-center gap-2">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
