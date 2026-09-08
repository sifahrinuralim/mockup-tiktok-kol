/**
 * Merges Tailwind classes conditionally.
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');