import { AlertCircle } from "@/lib/icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";

const IMPORT_CODE = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Tarefa criada</AlertTitle>
  <AlertDescription>Adicionada à coluna To Do.</AlertDescription>
</Alert>`;

export default function AlertPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Alert"
        description="Feedback inline para ações do usuário — confirmações e erros no fluxo Kanban."
      />

      <ComponentDemo title="Default" description="Sucesso ou informação neutra.">
        <Alert className="max-w-md">
          <AlertCircle />
          <AlertTitle>Tarefa criada</AlertTitle>
          <AlertDescription>
            A tarefa foi adicionada à coluna To Do.
          </AlertDescription>
        </Alert>
      </ComponentDemo>

      <ComponentDemo title="Destructive" description="Erro ao persistir alteração.">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle />
          <AlertTitle>Erro ao salvar</AlertTitle>
          <AlertDescription>
            Não foi possível atualizar a tarefa. Tente novamente.
          </AlertDescription>
        </Alert>
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
        <p className="mt-4 text-sm text-muted-foreground">
          Variantes: <code className="text-foreground">default</code>,{" "}
          <code className="text-foreground">destructive</code>. Inclua um ícone e
          título conciso para leitores de tela.
        </p>
      </Section>

      <Section title="Acessibilidade">
        <p className="text-sm text-muted-foreground">
          O componente usa <code className="text-foreground">role=&quot;alert&quot;</code>{" "}
          para anunciar mensagens importantes. Evite alertas persistentes demais; prefira
          toast para feedback não crítico (futuro).
        </p>
      </Section>
    </div>
  );
}
