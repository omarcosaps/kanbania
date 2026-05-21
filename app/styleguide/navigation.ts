export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
      { name: "Icons", href: "/styleguide/icons" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Label", href: "/styleguide/components/label" },
      { name: "Textarea", href: "/styleguide/components/textarea" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
      { name: "Separator", href: "/styleguide/components/separator" },
    ],
  },
  {
    title: "Compositions",
    items: [
      { name: "Task Card", href: "/styleguide/components/task-card" },
      { name: "Form Field", href: "/styleguide/compositions/form-field" },
      { name: "Auth Card", href: "/styleguide/compositions/auth-card" },
      { name: "Column Header", href: "/styleguide/compositions/column-header" },
      { name: "Task Editor", href: "/styleguide/compositions/task-editor" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { name: "Auth Form", href: "/styleguide/patterns/auth-form" },
      { name: "Board Toolbar", href: "/styleguide/patterns/board-toolbar" },
      { name: "Workspace Tabs", href: "/styleguide/patterns/workspace-tabs" },
      { name: "Kanban Column", href: "/styleguide/patterns/kanban-column" },
      { name: "Kanban Board", href: "/styleguide/patterns/kanban-board" },
    ],
  },
  {
    title: "Layouts",
    items: [
      {
        name: "Centered Auth Layout",
        href: "/styleguide/layouts/centered-auth-layout",
      },
      {
        name: "Dashboard Layout",
        href: "/styleguide/layouts/dashboard-layout",
      },
    ],
  },
];

export const DOCUMENTED_COMPONENT_SECTIONS = [
  "Primitives",
  "Compositions",
  "Patterns",
  "Layouts",
] as const;
