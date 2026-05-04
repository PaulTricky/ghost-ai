import { EditorShell } from "@/components/editor/editor-shell"

export default function EditorPage() {
  return (
    <EditorShell>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-copy-muted text-sm">Canvas goes here</p>
      </div>
    </EditorShell>
  )
}
