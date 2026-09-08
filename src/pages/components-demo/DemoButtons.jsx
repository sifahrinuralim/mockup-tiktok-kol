import { Plus, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const Group = ({ title, children }) => (
  <div>
    <p className="mb-3 text-sm font-semibold text-slate-700">{title}</p>
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

export const DemoButtons = () => (
  <div className="space-y-6">
    <Group title="Button variants">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </Group>

    <Group title="Sizes & states">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button isLoading loadingText="Processing...">
        Save
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </Group>

    <Group title="With icons">
      <Button>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add New
      </Button>
      <Button variant="outline">
        <Trash2 className="h-4 w-4 text-rose-600" aria-hidden="true" />
        Delete
      </Button>
    </Group>

    <Group title="Status badges">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Disabled</Badge>
      <Badge variant="outline">Outline</Badge>
    </Group>
  </div>
);
