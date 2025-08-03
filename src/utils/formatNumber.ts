export const formatNumber = (
  value: number | null | undefined,
  decimals: number = 1,
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }

  const units = [
    {value: 1e12, suffix: 'T'},
    {value: 1e9, suffix: 'B'},
    {value: 1e6, suffix: 'M'},
    {value: 1e3, suffix: 'K'},
  ];

  for (const unit of units) {
    if (value >= unit.value) {
      const formatted = (value / unit.value).toFixed(decimals);
      // Sıfırları temizle (örn: 1.0K -> 1K)
      return formatted.replace(/\.0+$/, '') + unit.suffix;
    }
  }

  return value.toFixed(decimals).replace(/\.0+$/, '');
};

export const formatDecimalNumberToLength = (
  val: string | number | null | undefined,
  decimal: number = 2,
) => {
  let stringValue = '0';
  if (val === null || val === undefined) {
    return '0';
  }

  if (typeof val === 'string') {
    stringValue = val;
    // numberValue = parseFloat(val);
  } else if (typeof val === 'number') {
    // numberValue = val;
    stringValue = val.toString();
  }

  const [integerPart, decimalPart] = stringValue.split('.');
  const integerString = integerPart || '0';

  if (!decimalPart) {
    return integerString + (stringValue.includes('.') ? '.' : '');
  }

  if (decimalPart.length >= decimal) {
    return integerString + '.' + decimalPart.slice(0, decimal);
  } else {
    return integerString + '.' + decimalPart;
  }
};

export const formatUsdNumber = (
  value: number | null | undefined,
  decimals: number = 1,
) => {
  const numberValue = parseFloat(formatDecimalNumberToLength(value, decimals));

  if (numberValue < 0) {
    return `-$${Math.abs(numberValue)}`;
  }
  return `$${numberValue}`;
};
