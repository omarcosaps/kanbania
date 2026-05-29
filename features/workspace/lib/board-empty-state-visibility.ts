export function shouldShowBoardEmptyState(
  hasTasks: boolean,
  newTaskColumnId: string | null,
  hasColumns: boolean
): boolean {
  if (hasColumns) {
    return false;
  }

  return !hasTasks && !newTaskColumnId;
}
