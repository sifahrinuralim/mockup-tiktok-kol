import { Search } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Toggle } from '@/components/ui/Toggle';

export const DemoForms = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [notify, setNotify] = useState(false);

  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
      <div className="space-y-5">
        <Input label="Full Name" placeholder="e.g: John Doe" />
        <Input
          label="Email"
          type="email"
          defaultValue="johndoe@example.id"
          hint="Email will not be published."
        />
        <Input
          label="Student Number"
          defaultValue="1234"
          error="Student number must be 10 digits."
        />
        <Input
          label="Search data"
          placeholder="Type a keyword..."
          rightElement={<Search className="h-4 w-4 text-slate-400" aria-hidden="true" />}
        />
      </div>

      <div className="space-y-5">
        <Select label="Activity Status" defaultValue="">
          <option value="" disabled>
            Select a status...
          </option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="disabled">Disabled</option>
        </Select>
        <Textarea label="Notes" rows={3} placeholder="Write any additional notes here..." />
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Auto save</p>
              <p className="text-xs text-slate-500">Saves changes periodically.</p>
            </div>
            <Toggle checked={autoSave} onChange={setAutoSave} aria-label="Auto save" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <div>
              <p className="text-sm font-medium text-slate-700">Email notifications</p>
              <p className="text-xs text-slate-500">Send notifications to your email.</p>
            </div>
            <Toggle checked={notify} onChange={setNotify} aria-label="Email notifications" />
          </div>
        </div>
      </div>
    </div>
  );
};
