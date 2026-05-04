"use client"

import { createContext, useContext, type ReactNode } from "react"

import {
  useProjectDialogs,
  type ProjectDialogsContextValue,
} from "@/hooks/use-project-dialogs"

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | null>(
  null
)

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const value = useProjectDialogs()
  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext(): ProjectDialogsContextValue {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) {
    throw new Error(
      "useProjectDialogsContext must be used within ProjectDialogsProvider"
    )
  }
  return ctx
}
