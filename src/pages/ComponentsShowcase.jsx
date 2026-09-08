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
 * Halaman pratinjau seluruh design system (tema Vite + React + Tailwind).
 * Gunakan sebagai referensi visual & titik mulai pengembangan halaman baru.
 */
export default function ComponentsShowcase() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Preview Komponen"
        description="Pratinjau seluruh elemen UI dari design system ini — warna, tombol, formulir, tabel, hingga umpan balik."
      />

      <Section id="tombol" title="Tombol & Badge" description="Varian, ukuran, status loading, dan badge status.">
        <DemoButtons />
      </Section>

      <Section id="formulir" title="Formulir" description="Input, select, textarea, toggle, serta state error dan hint.">
        <DemoForms />
      </Section>

      <Section id="kartu" title="Kartu & Statistik" description="Pola kartu statistik pada dashboard.">
        <DemoCards />
      </Section>

      <Section id="tabel" title="Tabel Data" description="Komponen tabel generik dengan aksi per baris.">
        <DemoTable />
      </Section>

      <Section id="feedback" title="Umpan Balik UI" description="Spinner, skeleton, empty state, modal, dan dialog konfirmasi.">
        <DemoFeedback />
      </Section>
    </div>
  );
}
