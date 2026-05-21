import type { Task } from "@/features/workspace/types";

export function getPositionForIndex(tasks: Task[], targetIndex: number): number {
  const sorted = [...tasks].sort((a, b) => a.position - b.position);

  if (sorted.length === 0) {
    return 1;
  }

  if (targetIndex <= 0) {
    return sorted[0].position / 2;
  }

  if (targetIndex >= sorted.length) {
    return sorted[sorted.length - 1].position + 1;
  }

  const before = sorted[targetIndex - 1].position;
  const after = sorted[targetIndex].position;
  return (before + after) / 2;
}
