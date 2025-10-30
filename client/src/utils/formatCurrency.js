export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value || 0);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}


