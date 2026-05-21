import { CenteredAuthLayout } from "@/components/centered-auth-layout";

import { ComponentPageHeader } from "../../_components/component-page-header";

export default function CenteredAuthLayoutPage() {
  return (
    <div className="p-8 md:p-12">
      <ComponentPageHeader
        title="Centered Auth Layout"
        description="Layout full-screen com AuthHeader + AuthForm centralizados."
      />

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="max-h-[640px] overflow-y-auto">
          <CenteredAuthLayout />
        </div>
      </div>
    </div>
  );
}
