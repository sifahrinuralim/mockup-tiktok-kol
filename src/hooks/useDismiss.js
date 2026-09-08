import { useEffect, useRef } from 'react';

/**
 * Hook untuk menutup dropdown/menu:
 * - saat klik terjadi di luar elemen pembungkus (`ref` hasil hook), atau
 * - saat tombol Escape ditekan.
 *
 * @param {boolean} open Apakah menu sedang terbuka.
 * @param {() => void} onDismiss Callback saat menu diminta untuk ditutup.
 * @returns {import('react').MutableRefObject<HTMLElement|null>} Ref elemen pembungkus.
 */
export const useDismiss = (open, onDismiss) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onDismiss();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onDismiss]);

  return ref;
};