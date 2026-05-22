"use client";

import { useState } from "react";
import { Flag, LogOut, Settings, Tag, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TASK_TAGS } from "@/features/workspace/types";
import { MoreHorizontal } from "@/lib/icons";

import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const IMPORT_CODE = `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open menu
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const PRIORITY_OPTIONS = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
] as const;

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState("bottom");
  const [priority, setPriority] = useState<string | null>(null);
  const [tag, setTag] = useState<string | undefined>(undefined);

  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Dropdown Menu"
        description="Menu contextual shadcn/base-nova com tokens popover, shadow-card e accent. Usado no header de colunas, seletores de tag/prioridade e ações destrutivas."
      />

      <ComponentDemo title="Uso básico">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Com ícones">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Account
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Atalhos de teclado">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>
              Save
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Duplicate
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Grupos, labels e separadores">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            View options
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuItem>Light mode</DropdownMenuItem>
              <DropdownMenuItem>Dark mode</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Layout</DropdownMenuLabel>
              <DropdownMenuItem>Compact</DropdownMenuItem>
              <DropdownMenuItem>Comfortable</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Checkbox items">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Preferences
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Side panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Radio items">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Panel position
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Submenu">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            More options
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>New file</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email link</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo title="Estados (disabled e destructive)">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Column actions
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>Rename column</DropdownMenuItem>
            <DropdownMenuItem disabled>Archive (coming soon)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo
        title="Padrão Figma — menu da coluna"
        description="Trigger icon-only com MoreHorizontal, alinhado ao header de coluna do board."
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground"
                aria-label="Column options"
              />
            }
          >
            <MoreHorizontal className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rename column</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <ComponentDemo
        title="Padrão Figma — tag e prioridade"
        description="Seletores compactos do task modal e inline create."
      >
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2.5 text-muted-foreground"
                />
              }
            >
              <Flag className="size-3.5" />
              {priority
                ? PRIORITY_OPTIONS.find((p) => p.value === priority)?.label
                : "+ Set priority"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {PRIORITY_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setPriority(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => setPriority(null)}>Clear</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2.5 text-muted-foreground"
                />
              }
            >
              <Tag className="size-3.5" />
              {tag ?? "+ Add label"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {TASK_TAGS.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setTag(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => setTag(undefined)}>Clear</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
        <p className="mt-4 text-sm text-muted-foreground">
          Subcomponentes:{" "}
          <code className="text-foreground">DropdownMenuContent</code>,{" "}
          <code className="text-foreground">DropdownMenuItem</code>,{" "}
          <code className="text-foreground">DropdownMenuCheckboxItem</code>,{" "}
          <code className="text-foreground">DropdownMenuRadioGroup</code>,{" "}
          <code className="text-foreground">DropdownMenuSub</code>,{" "}
          <code className="text-foreground">DropdownMenuSeparator</code>,{" "}
          <code className="text-foreground">DropdownMenuShortcut</code>. Item{" "}
          <code className="text-foreground">variant</code>:{" "}
          <code className="text-foreground">default</code> ou{" "}
          <code className="text-foreground">destructive</code>.
        </p>
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          Navegação por teclado: setas para mover entre itens, Enter para selecionar,
          Escape para fechar. Triggers apenas com ícone exigem{" "}
          <code className="text-foreground">aria-label</code> descritivo. Foco visível
          herda tokens <code className="text-foreground">ring</code> e{" "}
          <code className="text-foreground">bg-accent</code> nos itens focados.
        </p>
      </Section>
    </div>
  );
}
