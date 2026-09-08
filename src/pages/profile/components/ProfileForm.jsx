import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const SAVE_DELAY_MS = 700;

/** Profile form (name, role, phone, bio) with simulated saving. */
export const ProfileForm = ({ profile }) => {
  const [form, setForm] = useState({
    name: profile.name,
    role: profile.role,
    phone: profile.phone,
    bio: profile.bio,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync the form when the profile source data changes (e.g. page reset).
  useEffect(() => {
    setForm({
      name: profile.name,
      role: profile.role,
      phone: profile.phone,
      bio: profile.bio,
    });
  }, [profile]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
            />
            <Input
              label="Job Title"
              value={form.role}
              onChange={(event) => updateField('role', event.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              disabled
              hint="Email is used to sign in — contact an admin to change it."
            />
            <Input
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
            />
          </div>
          <Textarea
            label="Short Bio"
            rows={3}
            value={form.bio}
            onChange={(event) => updateField('bio', event.target.value)}
          />

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4">
            {isSaved && (
              <p className="mr-auto inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600" role="status">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Profile saved successfully
              </p>
            )}
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                setForm({
                  name: profile.name,
                  role: profile.role,
                  phone: profile.phone,
                  bio: profile.bio,
                })
              }
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSaving} loadingText="Saving...">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
