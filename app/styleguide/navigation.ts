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
    title: "Components",
    items: [
      { name: "Task Card", href: "/styleguide/components/task-card" },
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Input", href: "/styleguide/components/input" },
    ],
  },
];
