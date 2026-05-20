import { FIGMA_VARIABLES } from "../figma-tokens";

export function FigmaVariablesGrid() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            <th className="px-4 py-2 font-medium">Variável Figma</th>
            <th className="px-4 py-2 font-medium">Hex</th>
            <th className="px-4 py-2 font-medium">CSS (shadcn)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(FIGMA_VARIABLES).map(([name, hex]) => (
            <tr key={name} className="border-b border-border last:border-0">
              <td className="px-4 py-2 font-medium">{name}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                {hex}
              </td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                {FIGMA_TO_CSS[name] ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FIGMA_TO_CSS: Record<string, string> = {
  Surface: "--card",
  Primary: "--primary",
  Foreground: "--foreground",
  Secondary: "--secondary",
  "Muted Foreground": "--muted-foreground",
  Border: "--border",
  "Secondary Foreground": "--secondary-foreground",
  "Priority Med": "--priority-med / --warning",
  "Priority High": "--priority-high / --destructive",
  Background: "--background",
};
