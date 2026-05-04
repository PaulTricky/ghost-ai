"use client"

import { useState } from "react"

import { ProjectDialogsProvider } from "@/context/project-dialogs-context"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogsRoot } from "@/components/editor/project-dialogs-root"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface EditorShellProps {
  children: React.ReactNode
}

function EditorShellInner({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-full min-h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-x-0 top-12 bottom-0 z-10 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <ProjectDialogsRoot />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export function EditorShell({ children }: EditorShellProps) {
  return (
    <ProjectDialogsProvider>
      <EditorShellInner>{children}</EditorShellInner>
    </ProjectDialogsProvider>
  )
}
