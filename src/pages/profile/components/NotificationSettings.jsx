import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Toggle } from '@/components/ui/Toggle';
import { NOTIFICATION_PREFERENCES } from '@/data/mockProfile';

const SAVE_DELAY_MS = 600;

/** Converts the static preference object into rows ready to render. */
const buildPreferenceRows = () =>
  Object.entries(NOTIFICATION_PREFERENCES).map(([key, preference]) => ({
    key,
    label: preference.label,
    description: preference.description,
    enabled: preference.enabled,
  }));

/** Notification settings: a list of toggles + a save button (simulated). */
export const NotificationSettings = () => {
  const [rows, setRows] = useState(buildPreferenceRows);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleRow = (key) =>
    setRows((current) =>
      current.map((row) => (row.key === key ? { ...row, enabled: !row.enabled } : row)),
    );

  const handleSave = () => {
    setIsSaved(false);
    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      window.setTimeout(() => setIsSaved(false), 3000);
    }, SAVE_DELAY_MS);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul role="list" className="divide-y divide-slate-100">
          {rows.map((row) => (
            <li key={row.key} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800">{row.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{row.description}</p>
              </div>
              <Toggle
                checked={row.enabled}
                onChange={() => toggleRow(row.key)}
                aria-label={`${row.label} — on/off`}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          {isSaved && (
            <p className="mr-auto inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600" role="status">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Preferences saved
            </p>
          )}
          <Button onClick={handleSave} isLoading={isSaving} loadingText="Saving..." size="sm">
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
