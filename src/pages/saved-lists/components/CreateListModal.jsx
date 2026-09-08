import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { TALENT_CATEGORY_LIST } from '@/data/mockTalents';
import { LIST_TARGET_OPTIONS } from '@/constants/savedLists';

/** Initial form values when the modal opens. */
const EMPTY_FORM = {
  name: '',
  category: TALENT_CATEGORY_LIST[0],
  target: LIST_TARGET_OPTIONS[0].value,
  description: '',
};

/** Simulated save duration. */
const SUBMIT_DELAY_MS = 600;

/**
 * New creator-list modal (mockup).
 * New lists start empty — members are added later from Talent Discovery.
 */
export const CreateListModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear the form each time the modal opens.
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [open]);

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrors({ name: 'List name is required.' });
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      onCreate({
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
      });
      setIsSubmitting(false);
      onClose();
    }, SUBMIT_DELAY_MS);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New List"
      description="A group of creators for your campaign shortlist, ready to be filled in later."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="form-create-list"
            isLoading={isSubmitting}
            loadingText="Saving..."
          >
            Save List
          </Button>
        </>
      }
    >
      <form id="form-create-list" onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="List Name"
          placeholder="e.g. Beauty Micro-Influencer"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          error={errors.name}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Focus Category"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          >
            {TALENT_CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="Multi-category">Multi-category</option>
          </Select>
          <Select
            label="Target Creator Size"
            value={form.target}
            onChange={(event) => updateField('target', event.target.value)}
          >
            {LIST_TARGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <Textarea
          label="Description (optional)"
          rows={3}
          placeholder="Describe the creator criteria you want to gather…"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
        />
      </form>
    </Modal>
  );
};
