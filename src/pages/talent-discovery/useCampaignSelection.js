import { useCallback, useMemo, useState } from 'react';

/**
 * State pilihan kreator untuk shortlist kampanye ("Add to Campaign").
 * Menyimpan daftar id talent sehingga pilihan tetap bertahan meskipun
 * filter/sortir pada direktori berubah.
 */
export const useCampaignSelection = (talents) => {
  const [selectedIds, setSelectedIds] = useState([]);

  /** Tambah/hapus satu kreator dari shortlist. */
  const toggleSelection = useCallback((id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }, []);

  /** Kosongkan seluruh shortlist. */
  const clearSelection = useCallback(() => setSelectedIds([]), []);

  /** Cek apakah sebuah id sudah terpilih. */
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
