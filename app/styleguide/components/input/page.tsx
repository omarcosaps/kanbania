import Link from "next/link";

import { Input } from "@/components/ui/input";

import { CodeExample } from "../../_components/code-example";
import { ComponentDemo } from "../../_components/component-demo";
import { ComponentPageHeader } from "../../_components/component-page-header";
import { Section } from "../../_components/section";
import {
  PasswordFieldCompositionDemo,
  PasswordInputDemo,
} from "./input-demos";

const IMPORT_CODE = `import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"
import { Label } from "@/components/ui/label"

<Input placeholder="voce@exemplo.com" />
<PasswordInput id="password" placeholder="••••••••" />`;

const COMPOSITION_CODE = `import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"

<div className="space-y-2">
  <Label htmlFor="password">Senha</Label>
  <PasswordInput
    id="password"
    placeholder="••••••••"
    aria-invalid={!!errors.password}
    {...register("password")}
  />
  {errors.password ? (
    <p className="text-sm text-destructive">{errors.password.message}</p>
  ) : null}
</div>`;

export default function InputPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Input"
        description="Campo de texto base (shadcn/base-ui) e PasswordInput com toggle de visibilidade para formulários de autenticação."
      />

      <ComponentDemo title="Default">
        <Input
          className="max-w-sm"
          placeholder="voce@exemplo.com"
          type="email"
        />
      </ComponentDemo>

      <ComponentDemo title="Estados" description="Desabilitado e erro de validação.">
        <div className="flex max-w-sm flex-col gap-4">
          <Input placeholder="Campo desabilitado" disabled />
          <Input placeholder="Campo inválido" aria-invalid />
        </div>
      </ComponentDemo>

      <ComponentDemo
        title="PasswordInput"
        description="Alterna entre type password e text. O toggle usa botão nativo posicionado dentro do campo."
      >
        <PasswordInputDemo />
      </ComponentDemo>

      <ComponentDemo
        title="Composição com Label"
        description="Padrão usado nas telas de login, cadastro e redefinição de senha."
      >
        <PasswordFieldCompositionDemo />
      </ComponentDemo>

      <Section title="Uso">
        <CodeExample code={IMPORT_CODE} />
        <p className="mt-4 text-sm text-muted-foreground">
          Composição completa com Label e mensagem de erro:
        </p>
        <div className="mt-3">
          <CodeExample code={COMPOSITION_CODE} />
        </div>
      </Section>

      <Section title="Notas de implementação">
        <p className="text-sm text-muted-foreground">
          O toggle de visibilidade{" "}
          <strong className="font-medium text-foreground">não deve usar</strong>{" "}
          o componente{" "}
          <code className="text-foreground">Button</code> de{" "}
          <code className="text-foreground">@/components/ui/button</code>.
          Esse botão aplica{" "}
          <code className="text-foreground">active:translate-y-px</code> e{" "}
          <code className="text-foreground">transition-all</code>, o que desloca
          ícones posicionados com{" "}
          <code className="text-foreground">-translate-y-1/2</code> dentro do
          input — gerando um pulo visual ao clicar.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Use um{" "}
          <code className="text-foreground">&lt;button&gt;</code> nativo com{" "}
          <code className="text-foreground">onMouseDown=&#123;(e) =&gt;
          e.preventDefault()&#125;</code> para manter o foco no input ao
          alternar a visibilidade. Veja também as{" "}
          <Link
            href="/styleguide/components/button"
            className="text-foreground underline-offset-4 hover:underline"
          >
            limitações do Button
          </Link>
          .
        </p>
      </Section>

      <Section title="Acessibilidade">
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Associe <code className="text-foreground">Label</code> ao input via{" "}
            <code className="text-foreground">htmlFor</code> /{" "}
            <code className="text-foreground">id</code>.
          </li>
          <li>
            Use <code className="text-foreground">aria-invalid</code> quando
            houver erro de validação.
          </li>
          <li>
            O toggle de senha precisa de{" "}
            <code className="text-foreground">aria-label</code> descritivo
            (&quot;Mostrar senha&quot; / &quot;Ocultar senha&quot;).
          </li>
          <li>
            Ícones decorativos dentro do toggle usam{" "}
            <code className="text-foreground">aria-hidden</code>.
          </li>
        </ul>
      </Section>
    </div>
  );
}
