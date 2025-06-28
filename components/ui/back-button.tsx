import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * BackButton - Navigates the user back one page in history.
 * Uses outline variant and includes a left arrow icon.
 */
export function BackButton({
  children = "Atpakaļ",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => router.back()}
      {...props}
    >
      <ArrowLeft className="mr-2" />
      {children}
    </Button>
  )
}
