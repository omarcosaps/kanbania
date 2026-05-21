import { Button } from "@/components/ui/button";

export function InteractiveStatesDemo() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Estado</th>
            <th className="py-2 pr-4 font-medium">Primary</th>
            <th className="py-2 font-medium">Ghost</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border">
            <td className="py-3 pr-4">Default</td>
            <td className="py-3 pr-4">
              <Button size="sm">Default</Button>
            </td>
            <td className="py-3">
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-3 pr-4">Hover</td>
            <td className="py-3 pr-4">
              <code className="text-xs">bg-primary/80</code>
            </td>
            <td className="py-3">
              <code className="text-xs">hover:bg-muted</code>
            </td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-3 pr-4">Focus</td>
            <td className="py-3 pr-4" colSpan={2}>
              <code className="text-xs">
                focus-visible:ring-3 focus-visible:ring-ring/50
              </code>
            </td>
          </tr>
          <tr className="border-b border-border">
            <td className="py-3 pr-4">Active</td>
            <td className="py-3 pr-4" colSpan={2}>
              <code className="text-xs">active:translate-y-px</code>
            </td>
          </tr>
          <tr>
            <td className="py-3 pr-4">Disabled</td>
            <td className="py-3 pr-4">
              <Button size="sm" disabled>
                Disabled
              </Button>
            </td>
            <td className="py-3">
              <code className="text-xs">opacity-50 pointer-events-none</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
