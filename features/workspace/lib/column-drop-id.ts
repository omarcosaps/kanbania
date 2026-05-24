export const COLUMN_DROP_PREFIX = "column-drop:";

export function columnDropId(columnId: string) {
  return `${COLUMN_DROP_PREFIX}${columnId}`;
}

export function parseColumnDropId(overId: string): string | null {
  if (!overId.startsWith(COLUMN_DROP_PREFIX)) {
    return null;
  }
  return overId.slice(COLUMN_DROP_PREFIX.length);
}
