"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface TaskEditorProps {
  placeholder?: string;
  onSave?: (title: string) => void;
  onCancel?: () => void;
  className?: string;
}

export function TaskEditor({
  placeholder = "Task title...",
  onSave,
  onCancel,
  className,
}: TaskEditorProps) {
  return (
    <div
      className={cn(
        "shadow-card flex flex-col gap-3 rounded-lg border border-border bg-card p-3",
        className
      )}
    >
      <Textarea
        placeholder={placeholder}
        className="text-body min-h-16 resize-none border-0 bg-surface-input shadow-none focus-visible:ring-2"
        rows={2}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="sm" onClick={() => onSave?.("")}>
          Save
        </Button>
      </div>
    </div>
  );
}
