/**
 * Verificación rápida de formatCount con valores reales de la API / seed.
 * Ejecutar: npx --yes tsx src/utils/formatCount.verify.ts
 */
import { formatCount } from './formatCount';

const cases: Array<{ label: string; value: number; expected: string }> = [
  { label: 'likesCount', value: 21_001, expected: '21 mil' },
  { label: 'commentsCount', value: 454, expected: '454' },
  { label: 'repostsCount', value: 1_000, expected: '1 mil' },
  { label: 'savesCount', value: 52_000, expected: '52 mil' },
  { label: 'booksCount', value: 33, expected: '33' },
  // Criterio de decimales
  { label: 'exact thousands', value: 12_000, expected: '12 mil' },
  { label: 'decimal thousands', value: 12_300, expected: '12,3 mil' },
  { label: 'exact millions', value: 1_000_000, expected: '1 M' },
  { label: 'decimal millions', value: 1_200_000, expected: '1,2 M' },
];

let failed = 0;

for (const { label, value, expected } of cases) {
  const actual = formatCount(value);
  const ok = actual === expected;
  // eslint-disable-next-line no-console
  console.log(
    `${ok ? '✓' : '✗'} ${label}: formatCount(${value}) → "${actual}"` +
      (ok ? '' : ` (esperado "${expected}")`),
  );
  if (!ok) failed += 1;
}

if (failed > 0) {
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log('\nTodos los casos OK.');
