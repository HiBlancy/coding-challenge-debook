/**
 * Design tokens.
 *
 * Estos valores son PLACEHOLDERS para que la app compile y renderice algo.
 * El diseño real está en el Figma: define aquí los tokens que necesites.
 * Usa siempre tokens, nunca valores sueltos.
 */

export const colors = {
  gradientTop: '#0A0A0A',
  gradientMid: '#0A0A0A',
  bg: '#000000',

  surface: '#161616',
  surfaceElevated: '#1F1F1F',
  border: '#2A2A2A',

  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  textMuted: '#8A8A8A',

  accent: '#888888',
  verified: '#888888',
  key: '#888888',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 20,
  pill: 999,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, color: colors.textPrimary },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: colors.textSecondary,
  },
  tab: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 22, color: colors.textPrimary },
  meta: { fontSize: 13, color: colors.textMuted },
  authorName: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
} as const;
