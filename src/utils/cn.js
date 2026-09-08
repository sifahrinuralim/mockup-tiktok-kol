/**
 * Menggabungkan class Tailwind secara kondisional.
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');