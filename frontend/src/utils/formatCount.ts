
export function formatCount(value: number): string {
  if (value < 1_000) {
    return String(value);
  }

  if (value < 1_000_000) {
    return `${formatOneDecimal(value / 1_000)} mil`;
  }

  return `${formatOneDecimal(value / 1_000_000)} M`;
}

function formatOneDecimal(scaled: number): string {
  const rounded = Math.round(scaled * 10) / 10;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return String(rounded).replace('.', '.');
}
