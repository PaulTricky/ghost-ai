"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"

import { useProjectDialogsContext } from "@/context/project-dialogs-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const {
    myProjects,
    sharedProjects,
    openCreate,
    openRename,
    openDelete,
  } = useProjectDialogsContext()

  return (
    <aside
      className={cn(
        "fixed left-0 top-12 z-20 flex h-[calc(100vh-3rem)] w-72 flex-col",
        "border-r border-surface-border bg-surface/95 backdrop-blur-md",
        "transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <span className="text-sm font-semibold text-copy-primary">Projects</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4 text-copy-muted" />
        </Button>
      </div>

      {/* Tab content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3">
        <Tabs defaultValue="my-projects" className="flex min-h-0 flex-1 flex-col gap-2">
          <TabsList className="w-full shrink-0">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="my-projects"
            className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <ScrollArea className="min-h-0 flex-1 pr-2">
              {myProjects.length === 0 ? (
                <p className="py-6 text-center text-sm text-copy-muted">
                  No projects yet.
                </p>
              ) : (
                <ul className="space-y-1">
                  {myProjects.map((project) => (
                    <li key={project.id}>
                      <div className="flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-subtle/80">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-copy-primary">
                            {project.name}
                          </p>
                          <p className="truncate font-mono text-xs text-copy-faint">
                            {project.slug}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-0.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="text-copy-muted"
                            aria-label={`Rename ${project.name}`}
                            onClick={() => {
                              openRename(project)
                              onClose()
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="text-copy-muted"
                            aria-label={`Delete ${project.name}`}
                            onClick={() => {
                              openDelete(project)
                              onClose()
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent
            value="shared"
            className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <ScrollArea className="min-h-0 flex-1 pr-2">
              {sharedProjects.length === 0 ? (
                <p className="py-6 text-center text-sm text-copy-muted">
                  No shared projects.
                </p>
              ) : (
                <ul className="space-y-1">
                  {sharedProjects.map((project) => (
                    <li key={project.id}>
                      <div className="flex items-center gap-1 rounded-xl px-2 py-1.5 hover:bg-subtle/80">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-copy-primary">
                            {project.name}
                          </p>
                          <p className="truncate font-mono text-xs text-copy-faint">
                            {project.slug}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-surface-border p-3">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={() => {
            openCreate()
            onClose()
          }}
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
