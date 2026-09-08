import { Check, Plus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

/**
 * "Add to Campaign" action button (mock toggle).
 * Ownership state lives in the caller; the button only reflects the state.
 * Has a minimum 44px height for a comfortable mobile touch target.
 *
 * @param {boolean} isInCampaign Whether the creator is already on the campaign list.
 * @param {() => void} onClick Callback fired when the button is clicked.
 */
export const AddToCampaignButton = ({ isInCampaign, onClick, size = 'md', className }) => {
  if (isInCampaign) {
    return (
      <Button
        type="button"
        variant="success"
        size={size}
        onClick={onClick}
        aria-pressed="true"
        title="Click to remove from the campaign"
        className={cn('min-h-11', className)}
      >
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        Added
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="primary"
      size={size}
      onClick={onClick}
      aria-pressed="false"
      title="Add creator to the campaign list"
      className={cn('min-h-11', className)}
    >
      <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
      Add to Campaign
    </Button>
  );
};
