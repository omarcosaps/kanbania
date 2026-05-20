import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  LayoutGrid,
  Lock,
  Minus,
  Moon,
  MoreHorizontal,
  Plus,
  Sun,
  User,
} from "lucide-react";

export {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  LayoutGrid,
  Lock,
  Minus,
  Moon,
  MoreHorizontal,
  Plus,
  Sun,
  User,
};

export type IconSize = "xs" | "sm" | "md";

export const ICON_SIZES = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
} as const satisfies Record<IconSize, string>;

export type IconGroupId =
  | "header"
  | "board"
  | "priority"
  | "feedback"
  | "system";

export interface IconCatalogEntry {
  id: string;
  name: string;
  component: LucideIcon;
  label: string;
  usage: string;
  group: IconGroupId;
  defaultSize: IconSize;
  colorClass?: string;
}

export const ICON_CATALOG: IconCatalogEntry[] = [
  {
    id: "plus",
    name: "Plus",
    component: Plus,
    label: "Adicionar",
    usage: "Botão New Task, adicionar coluna ou card no board",
    group: "header",
    defaultSize: "md",
  },
  {
    id: "lock",
    name: "Lock",
    component: Lock,
    label: "Privado",
    usage: "Badge Private no header do projeto",
    group: "header",
    defaultSize: "xs",
  },
  {
    id: "layout-grid",
    name: "LayoutGrid",
    component: LayoutGrid,
    label: "Visualização",
    usage: "Botão View no header do projeto",
    group: "header",
    defaultSize: "sm",
  },
  {
    id: "user",
    name: "User",
    component: User,
    label: "Usuário",
    usage: "Avatar / menu do usuário no header",
    group: "header",
    defaultSize: "sm",
  },
  {
    id: "plus-board",
    name: "Plus",
    component: Plus,
    label: "Adicionar (board)",
    usage: "Ícone + nas ações de coluna e criar tarefa",
    group: "board",
    defaultSize: "sm",
  },
  {
    id: "more-horizontal",
    name: "MoreHorizontal",
    component: MoreHorizontal,
    label: "Mais opções",
    usage: "Menu ⋯ no header de cada coluna",
    group: "board",
    defaultSize: "sm",
  },
  {
    id: "chevron-down",
    name: "ChevronDown",
    component: ChevronDown,
    label: "Expandir",
    usage: "Dropdown ao lado do ID da tarefa (KAN-12)",
    group: "board",
    defaultSize: "sm",
  },
  {
    id: "arrow-up",
    name: "ArrowUp",
    component: ArrowUp,
    label: "Prioridade alta",
    usage: "Indicador de prioridade alta na task card",
    group: "priority",
    defaultSize: "sm",
    colorClass: "text-priority-high",
  },
  {
    id: "minus",
    name: "Minus",
    component: Minus,
    label: "Prioridade média",
    usage: "Indicador de prioridade média na task card",
    group: "priority",
    defaultSize: "sm",
    colorClass: "text-priority-med",
  },
  {
    id: "arrow-down",
    name: "ArrowDown",
    component: ArrowDown,
    label: "Prioridade baixa",
    usage: "Indicador de prioridade baixa na task card",
    group: "priority",
    defaultSize: "sm",
    colorClass: "text-priority-low",
  },
  {
    id: "alert-circle",
    name: "AlertCircle",
    component: AlertCircle,
    label: "Alerta",
    usage: "Ícone em Alert de sucesso ou erro",
    group: "feedback",
    defaultSize: "md",
  },
  {
    id: "sun",
    name: "Sun",
    component: Sun,
    label: "Modo claro",
    usage: "Toggle de tema (styleguide)",
    group: "system",
    defaultSize: "md",
  },
  {
    id: "moon",
    name: "Moon",
    component: Moon,
    label: "Modo escuro",
    usage: "Toggle de tema (styleguide)",
    group: "system",
    defaultSize: "md",
  },
];

export const ICON_GROUPS: {
  id: IconGroupId;
  title: string;
  description: string;
}[] = [
  {
    id: "header",
    title: "Header",
    description: "Navegação superior, projeto e ações globais.",
  },
  {
    id: "board",
    title: "Board",
    description: "Colunas Kanban e metadados das tarefas.",
  },
  {
    id: "priority",
    title: "Prioridade",
    description: "Indicadores visuais nas task cards.",
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Alertas e mensagens ao usuário.",
  },
  {
    id: "system",
    title: "Sistema",
    description: "Preferências de interface.",
  },
];

export function getIconsByGroup(group: IconGroupId): IconCatalogEntry[] {
  return ICON_CATALOG.filter((entry) => entry.group === group);
}
