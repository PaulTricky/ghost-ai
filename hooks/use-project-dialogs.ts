"use client"

import { useCallback, useMemo, useState } from "react"

import { slugFromDisplayName } from "@/lib/slug"

export interface MockProject {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export type ProjectDialogKind = "create" | "rename" | "delete" | null

const MOCK_DELAY_MS = 400

const INITIAL_PROJECTS: MockProject[] = [
  { id: "p1", name: "Payment API", slug: "payment-api", isOwner: true },
  { id: "p2", name: "Monolith Refactor", slug: "monolith-refactor", isOwner: true },
  {
    id: "p3",
    name: "Shared Design System",
    slug: "shared-design-system",
    isOwner: false,
  },
]

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(INITIAL_PROJECTS)
  const [activeDialog, setActiveDialog] = useState<ProjectDialogKind>(null)
  const [createName, setCreateName] = useState("")
  const [renameName, setRenameName] = useState("")
  const [targetProject, setTargetProject] = useState<MockProject | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createSlugPreview = useMemo(
    () => slugFromDisplayName(createName),
    [createName]
  )

  const myProjects = useMemo(
    () => projects.filter((p) => p.isOwner),
    [projects]
  )
  const sharedProjects = useMemo(
    () => projects.filter((p) => !p.isOwner),
    [projects]
  )

  const openCreate = useCallback(() => {
    setTargetProject(null)
    setCreateName("")
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((project: MockProject) => {
    setTargetProject(project)
    setRenameName(project.name)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((project: MockProject) => {
    setTargetProject(project)
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setTargetProject(null)
    setCreateName("")
    setRenameName("")
    setIsSubmitting(false)
  }, [])

  const submitCreate = useCallback(async () => {
    const name = createName.trim()
    if (!name) return
    setIsSubmitting(true)
    await delay(MOCK_DELAY_MS)
    const slug = slugFromDisplayName(name)
    const id = `p-${Date.now()}`
    setProjects((prev) => [
      ...prev,
      { id, name, slug: slug || "project", isOwner: true },
    ])
    closeDialog()
  }, [createName, closeDialog])

  const submitRename = useCallback(async () => {
    if (!targetProject) return
    const name = renameName.trim()
    if (!name) return
    setIsSubmitting(true)
    await delay(MOCK_DELAY_MS)
    const slug = slugFromDisplayName(name)
    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetProject.id
          ? { ...p, name, slug: slug || p.slug }
          : p
      )
    )
    closeDialog()
  }, [targetProject, renameName, closeDialog])

  const submitDelete = useCallback(async () => {
    if (!targetProject) return
    setIsSubmitting(true)
    await delay(MOCK_DELAY_MS)
    setProjects((prev) => prev.filter((p) => p.id !== targetProject.id))
    closeDialog()
  }, [targetProject, closeDialog])

  return {
    projects,
    myProjects,
    sharedProjects,
    activeDialog,
    createName,
    setCreateName,
    createSlugPreview,
    renameName,
    setRenameName,
    targetProject,
    isSubmitting,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  }
}

export type ProjectDialogsContextValue = ReturnType<typeof useProjectDialogs>
