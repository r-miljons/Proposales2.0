import * as React from "react"
import Link from "next/link"
import Image from "next/image"

export interface SiteLogoProps {
  href?: string
  width?: number
  height?: number
  className?: string
  ariaLabel?: string
}

export function SiteLogo({
  href = "/",
  width = 120,
  height = 32,
  className = "h-8 w-auto select-none transition-all dark:invert-0 invert",
  ariaLabel = "Go to homepage",
}: SiteLogoProps) {
  return (
    <Link href={href} className="flex items-center" aria-label={ariaLabel}>
      <Image
        src="/images/Proposales-logo.svg"
        alt="Proposales logo"
        width={width}
        height={height}
        priority
        className={className}
      />
    </Link>
  )
}
