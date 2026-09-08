import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { CAMPAIGN_CATEGORIES } from '@/constants/campaigns';

/** Initial form values (always clean when the modal opens). */
const EMPTY_FORM = {
  name: '',
  brand: '',
  category: CAMPAIGN_CATEGORIES[0],
  budget: '',
  startDate: '',
  endDate: '',
  goal: '',
};

/** Simulated save duration so the button isLoading state is visible. */
const SUBMIT_DELAY_MS = 700;

/**
 * New campaign modal (mockup): collects the core data and forwards it via
 * `onCreate`. The result appears immediately in the table as a draft campaign.
 */
export const CreateCampaignModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset the form each time the modal opens so stale data never lingers.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [open]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Campaign name is required.';
    if (!form.brand.trim()) nextErrors.brand = 'Brand name is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      onCreate({
        ...form,
        budget: Number(form.budget) > 0 ? Number(form.budget) : 0,
        goal: form.goal.trim() || 'No description yet — complete the brief before sending it to talent.',
      });
      setIsSubmitting(false);
      onClose();
    }, SUBMIT_DELAY_MS);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Campaign"
      description="New campaigns start as Draft and can be completed later."
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="form-create-campaign" isLoading={isSubmitting} loadingText="Saving...">
            Create Campaign
          </Button>
        </>
      }
    >
      <form id="form-create-campaign" onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Campaign Name"
            placeholder="e.g. Glow Up Challenge"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            error={errors.name}
          />
          <Input
            label="Brand / Client"
            placeholder="e.g. GlowSkin ID"
            value={form.brand}
            onChange={(event) => updateField('brand', event.target.value)}
            error={errors.brand}
          />
          <Select
            label="Brand Category"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {CAMPAIGN_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input
            label="Budget (Rp)"
            type="number"
            min="0"
            step="1000000"
            placeholder="e.g. 150000000"
            value={form.budget}
            onChange={(event) => updateField('budget', event.target.value)}
            hint="Leave empty if the budget is not approved yet."
          />
          <Input
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(event) => updateField('startDate', event.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(event) => updateField('endDate', event.target.value)}
          />
        </div>
        <Textarea
          label="Short Description / Goal"
          rows={3}
          placeholder="Briefly describe the campaign goal…"
          value={form.goal}
          onChange={(event) => updateField('goal', event.target.value)}
        />
      </form>
    </Modal>
  );
};
