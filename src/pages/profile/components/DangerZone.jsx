import { useState } from 'react';
import { LogOut, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

/**
 * Account danger zone: sign out (mockup).
 * The action does not really end a session — this frontend has no auth yet.
 */
export const DangerZone = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    setConfirmOpen(false);
    setMessage('Sign-out is disabled in this mockup — the demo session stays active.');
    window.setTimeout(() => setMessage(''), 5000);
  };

  return (
    <Card className="border-rose-200">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-rose-700">
            The sign-out action is only simulated in this mockup. The page does not require a real
            authentication session.
          </p>
        </div>

        {message && (
          <p role="status" className="text-sm font-medium text-rose-600">
            {message}
          </p>
        )}

        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign Out
        </Button>

        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleLogout}
          title="Sign Out"
          description="Are you sure you want to sign out? In this mockup you will stay in the app because there is no real authentication yet."
          confirmText="Sign Out"
        />
      </CardContent>
    </Card>
  );
};
