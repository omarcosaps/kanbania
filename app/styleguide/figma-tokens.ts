/**
 * Tokens extraídos do Figma KanbanIA via MCP (node 8001:9301).
 * @see https://www.figma.com/design/yL2Ig92hRWjve0ZVKV5ytq/KanbanIA?node-id=8001-9301
 */
export const FIGMA_VARIABLES = {
  Surface: "#ffffff",
  Primary: "#4f46e5",
  Foreground: "#09090b",
  Secondary: "#f4f4f5",
  "Muted Foreground": "#71717a",
  Border: "#e4e4e7",
  "Secondary Foreground": "#18181b",
  "Priority Med": "#f59e0b",
  "Priority High": "#ef4444",
  Background: "#fafafa",
} as const;

export const FIGMA_TYPOGRAPHY = {
  pageTitle: { size: "18px", lineHeight: "28px", weight: 500 },
  body: { size: "14px", lineHeight: "20px", weight: 500 },
  metadata: { size: "12px", lineHeight: "16px", weight: 400 },
  tag: { size: "10px", lineHeight: "15px", weight: 500 },
} as const;

export const FIGMA_RADIUS = {
  card: "8px",
  tag: "4px",
} as const;

export const FIGMA_SHADOW_CARD =
  "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)";
