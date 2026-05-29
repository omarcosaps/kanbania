export function shouldShowBoardEmptyState(
  hasTasks: boolean,
  newTaskColumnId: string | null
): boolean {
  return !hasTasks && !newTaskColumnId;
}
