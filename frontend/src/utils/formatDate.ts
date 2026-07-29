/**
 * Formato corto junto al autor en el feed: "5 sep".
 */
export function formatShortDate(isoString: string): string {
  const parts = new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
  }).formatToParts(new Date(isoString));

  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  // Locale 'es' usa "sept"; el diseño pide abreviatura de 3 letras ("sep").
  const month = (parts.find((part) => part.type === 'month')?.value ?? '')
    .replace(/\.$/, '')
    .slice(0, 3);

  return `${day} ${month}`;
}
