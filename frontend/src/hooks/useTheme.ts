/** Light theme only — dark mode removed per product direction. */
export function useTheme(): {
  theme: 'light'
  isDark: false
} {
  return { theme: 'light', isDark: false }
}
