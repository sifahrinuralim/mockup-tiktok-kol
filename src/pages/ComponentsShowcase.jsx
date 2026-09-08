import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import { DemoButtons } from './components-demo/DemoButtons';
import { DemoCards } from './components-demo/DemoCards';
import { DemoFeedback } from './components-demo/DemoFeedback';
import { DemoForms } from './components-demo/DemoForms';
import { DemoTable } from './components-demo/DemoTable';

const Section = ({ id, title, description, children }) => (
  <Card id={id} className="scroll-mt-24">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

/**
 * Preview page for the whole design system (Vite + React + Tailwind theme).
 * Use it as a visual reference and a starting point for building new pages.
 */
export default function ComponentsShowcase() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Component Preview"
        description="Preview every UI element of this design system — colors, buttons, forms, tables, and feedback states."
      />

      <Section id="buttons" title="Buttons & Badges" description="Variants, sizes, loading states, and status badges.">
        <DemoButtons />
      </Section>

      <Section id="forms" title="Forms" description="Input, select, textarea, toggle, plus error and hint states.">
        <DemoForms />
      </Section>

      <Section id="cards" title="Cards & Statistics" description="Statistic-card patterns used on dashboards.">
        <DemoCards />
      </Section>

      <Section id="tables" title="Data Table" description="Generic table component with per-row actions.">
        <DemoTable />
      </Section>

      <Section id="feedback" title="UI Feedback" description="Spinner, skeleton, empty state, modal, and confirmation dialog.">
        <DemoFeedback />
      </Section>
    </div>
  );
}
