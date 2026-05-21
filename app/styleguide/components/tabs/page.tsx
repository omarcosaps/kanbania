import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function TabsPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Tabs"
        description="Abas shadcn/base-ui. WorkspaceTabs usa variant line com indicador primary."
      />

      <ComponentDemo title="Default">
        <Tabs defaultValue="a" className="max-w-md">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="pt-4 text-sm text-muted-foreground">
            Conteúdo A
          </TabsContent>
          <TabsContent value="b" className="pt-4 text-sm text-muted-foreground">
            Conteúdo B
          </TabsContent>
        </Tabs>
      </ComponentDemo>

      <ComponentDemo title="Line (workspace)">
        <Tabs defaultValue="roadmap" className="w-full max-w-lg">
          <TabsList variant="line" className="w-full justify-start gap-6 border-b border-border bg-transparent p-0">
            <TabsTrigger
              value="roadmap"
              className="text-heading rounded-none px-0 pb-3 after:bg-primary"
            >
              Roadmap Q3
            </TabsTrigger>
            <TabsTrigger
              value="sprint"
              className="text-heading rounded-none px-0 pb-3 after:bg-primary"
            >
              Sprint 24
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </ComponentDemo>
    </div>
  );
}
