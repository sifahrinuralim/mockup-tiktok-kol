import { useCallback, useMemo, useState } from 'react';

/**
 * Creator selection state for the campaign shortlist ("Add to Campaign").
 * Stores a list of talent ids so selections survive filter/sort changes
 * in the directory.
 */
export const useCampaignSelection = (talents) => {
  const [selectedIds, setSelectedIds] = useState([]);

  /** Adds/removes a single creator from the shortlist. */
  const toggleSelection = useCallback((id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }, []);

  /** Empties the whole shortlist. */
  const clearSelection = useCallback(() => setSelectedIds([]), []);

  /** Checks whether an id is already selected. */
  const isSelected = useCallback((id) => selectedIds.includes(id), [selectedIds]);

  const selectedTalents = useMemo(
    () => talents.filter((talent) => selectedIds.includes(talent.id)),
    [talents, selectedIds],
  );

  return {
    selectedIds,
    selectedCount: selectedIds.length,
    isSelected,
    toggleSelection,
    clearSelection,
    selectedTalents,
  };
};
