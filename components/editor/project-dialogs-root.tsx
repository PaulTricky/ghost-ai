"use client"

import { useEffect, useId } from "react"

import { useProjectDialogsContext } from "@/context/project-dialogs-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function ProjectDialogsRoot() {
  const createNameId = useId()
  const renameNameId = useId()

  const {
    activeDialog,
    closeDialog,
    createName,
    setCreateName,
    createSlugPreview,
    renameName,
    setRenameName,
    targetProject,
    isSubmitting,
    submitCreate,
    submitRename,
    submitDelete,
  } = useProjectDialogsContext()

  useEffect(() => {
    if (activeDialog !== "rename") return
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(renameNameId)
      if (el instanceof HTMLInputElement) {
        el.focus()
        el.select()
      }
    })
    return () => cancelAnimationFrame(id)
  }, [activeDialog, renameNameId])

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) closeDialog()
  }

  return (
    <>
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={handleDialogOpenChange}
      >
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Choose a display name. A URL slug is generated automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <label
              htmlFor={createNameId}
              className="text-sm font-medium text-copy-secondary"
            >
              Project name
            </label>
            <Input
              id={createNameId}
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="e.g. Payment service redesign"
              autoFocus
            />
            <p className="text-xs text-copy-muted">
              Slug preview:{" "}
              <span className="font-mono text-copy-secondary">
                {createSlugPreview || "—"}
              </span>
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => void submitCreate()}
              disabled={isSubmitting || !createName.trim()}
            >
              {isSubmitting ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={handleDialogOpenChange}
      >
        <DialogContent className="rounded-3xl sm:max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void submitRename()
            }}
          >
            <DialogHeader>
              <DialogTitle>Rename project</DialogTitle>
              <DialogDescription>
                Current name:{" "}
                <span className="font-medium text-copy-primary">
                  {targetProject?.name ?? "—"}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-1">
              <label
                htmlFor={renameNameId}
                className="text-sm font-medium text-copy-secondary"
              >
                New name
              </label>
              <Input
                id={renameNameId}
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !renameName.trim()}
              >
                {isSubmitting ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={handleDialogOpenChange}
      >
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-copy-primary">
                {targetProject?.name ?? "this project"}
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => void submitDelete()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting…" : "Delete project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
