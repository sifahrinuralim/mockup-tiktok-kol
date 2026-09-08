import { useEffect, useRef } from 'react';

/**
 * Hook for dismissing a dropdown/menu:
 * - when a click happens outside the wrapper element (the hook's `ref`), or
 * - when the Escape key is pressed.
 *
 * @param {boolean} open Whether the menu is currently open.
 * @param {() => void} onDismiss Callback called when the menu should close.
 * @returns {import('react').MutableRefObject<HTMLElement|null>} Ref to the wrapper element.
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