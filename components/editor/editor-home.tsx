"use client"

import { Plus } from "lucide-react"

import { useProjectDialogsContext } from "@/context/project-dialogs-context"
import { Button } from "@/components/ui/button"

export function EditorHome() {
  const { openCreate } = useProjectDialogsContext()

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="max-w-md text-lg font-semibold tracking-tight text-copy-primary sm:text-xl">
        Create a project or open an existing one
      </h1>
      <p className="mt-3 max-w-md text-sm text-copy-muted">
        Start a new architecture workspace, or choose a project from the
        sidebar.
      </p>
      <Button
        type="button"
        className="mt-8 gap-2"
        onClick={openCreate}
      >
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  )
}
