"use client"

import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  className?: string
}

export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  className,
}: EditorNavbarProps) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center border-b border-surface-border bg-surface px-3",
        className
      )}
    >
      {/* Left — sidebar toggle */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5 text-copy-muted" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-copy-muted" />
          )}
        </Button>
      </div>

      {/* Center */}
      <div className="flex flex-1 items-center justify-center" />

      {/* Right — user menu */}
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  )
}
