import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";

export default function CardPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Card"
        description="Superfície elevada base. TaskCard e AuthCard especializam este primitive."
      />

      <ComponentDemo title="Padrão">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Descrição com text-muted-foreground.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body">Conteúdo do card.</p>
          </CardContent>
        </Card>
      </ComponentDemo>
    </div>
  );
}
