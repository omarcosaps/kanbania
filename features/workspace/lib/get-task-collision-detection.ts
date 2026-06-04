import {
  closestCenter,
  pointerWithin,
  type CollisionDetection,
} from "@dnd-kit/core";

import { COLUMN_DROP_PREFIX } from "@/features/workspace/lib/column-drop-id";
import type { Task } from "@/features/workspace/types";

export function createTaskCollisionDetection(
  getTaskById: (id: string) => Task | undefined
): CollisionDetection {
  return (args) => {
    if (args.active.data.current?.type !== "task") {
      return closestCenter(args);
    }

    const activeId = String(args.active.id);
    const isTaskCollision = (id: string) =>
      id !== activeId &&
      !id.startsWith(COLUMN_DROP_PREFIX) &&
      Boolean(getTaskById(id));

    const pointerCollisions = pointerWithin(args);
    const taskPointerHits = pointerCollisions.filter((collision) =>
      isTaskCollision(String(collision.id))
    );
    if (taskPointerHits.length > 0) {
      return taskPointerHits;
    }

    const centerCollisions = closestCenter(args);
    const taskCenterHit = centerCollisions.find((collision) =>
      isTaskCollision(String(collision.id))
    );
    if (taskCenterHit) {
      return [taskCenterHit];
    }

    return centerCollisions;
  };
}
