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
  display: { size: "24px", lineHeight: "36px", weight: 600 },
  heading: { size: "14px", lineHeight: "20px", weight: 500 },
  body: { size: "14px", lineHeight: "19.25px", weight: 500 },
  caption: { size: "12px", lineHeight: "16px", weight: 400 },
  tag: { size: "10px", lineHeight: "15px", weight: 500 },
} as const;

export const FIGMA_RADIUS = {
  card: "8px",
  tag: "4px",
} as const;

export const FIGMA_SHADOW_CARD =
  "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)";

export const SPACING_SCALE = [
  { step: 1, px: 4, rem: "0.25rem", variable: "--space-1", className: "p-1" },
  { step: 2, px: 8, rem: "0.5rem", variable: "--space-2", className: "p-2" },
  { step: 3, px: 12, rem: "0.75rem", variable: "--space-3", className: "p-3" },
  { step: 4, px: 16, rem: "1rem", variable: "--space-4", className: "p-4" },
  { step: 5, px: 20, rem: "1.25rem", variable: "--space-5", className: "p-5" },
  { step: 6, px: 24, rem: "1.5rem", variable: "--space-6", className: "p-6" },
  { step: 7, px: 28, rem: "1.75rem", variable: "--space-7", className: "p-7" },
  { step: 8, px: 32, rem: "2rem", variable: "--space-8", className: "p-8" },
  { step: 9, px: 36, rem: "2.25rem", variable: "--space-9", className: "p-9" },
  { step: 10, px: 40, rem: "2.5rem", variable: "--space-10", className: "p-10" },
  { step: 12, px: 48, rem: "3rem", variable: "--space-12", className: "p-12" },
  { step: 14, px: 56, rem: "3.5rem", variable: "--space-14", className: "p-14" },
  { step: 16, px: 64, rem: "4rem", variable: "--space-16", className: "p-16" },
] as const;
