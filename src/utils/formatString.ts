import i18n from '../localization/i18n';

export const parseTimeRange = (timeRange: string) => {
  const match = timeRange.match(/^(\d+)(d|mo|s|h|w|y)$/);
  if (match) {
    const number = match[1];
    const unit = match[2];
    return {number, unit};
  }
  return null;
};

/**
 * Unix timestamp'ı insana okunabilir zaman formatına çevirir
 * @param timestamp - Unix timestamp (saniye cinsinden)
 * @returns Formatlanmış zaman string'i (örn: "2y", "3w", "5mo")
 */
export const formatTimestamp = (timestamp: number): string => {
  // Timestamp'in milisaniye mi saniye mi olduğunu kontrol et
  let timestampInSeconds: number;

  if (timestamp.toString().length === 13) {
    // Milisaniye cinsinden gelmiş, saniyeye çevir
    timestampInSeconds = Math.floor(timestamp / 1000);
  } else {
    // Zaten saniye cinsinden
    timestampInSeconds = timestamp;
  }

  const now = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye)
  const diff = now - timestampInSeconds; // Zaman farkı (saniye)

  const units = [
    {name: 'y', seconds: 365 * 24 * 60 * 60}, // Yıl
    {name: 'mo', seconds: 30 * 24 * 60 * 60}, // Ay (30 gün)
    {name: 'w', seconds: 7 * 24 * 60 * 60}, // Hafta
    {name: 'd', seconds: 24 * 60 * 60}, // Gün
    {name: 'h', seconds: 60 * 60}, // Saat
    {name: 's', seconds: 1}, // Saniye
  ];

  for (const unit of units) {
    const count = Math.floor(diff / unit.seconds);
    if (count > 0) {
      return `${count}${unit.name}`;
    }
  }

  return '0s';
};

/**
 * String'in başından belirtilen karakter sayısını alır ve sonuna nokta ekler
 * @param str - Formatlanacak string (null/undefined olabilir)
 * @param maxLength - Alınacak maksimum karakter sayısı
 * @param dots - Sonuna eklenecek nokta sayısı (varsayılan: 3)
 * @returns Formatlanmış string veya boş string
 */
export const truncateString = (
  str: string | null | undefined,
  maxLength: number = 3,
  dots: number = 3,
): string => {
  if (!str) return '';

  if (str.length <= maxLength) return str;

  return str.substring(0, maxLength) + '.'.repeat(dots);
};

/**
 * String'in başından ve sonundan belirtilen karakter sayısını alır, ortaya nokta ekler
 * @param str - Formatlanacak string (null/undefined olabilir)
 * @param startChars - Başından alınacak karakter sayısı
 * @param endChars - Sonundan alınacak karakter sayısı
 * @param dots - Ortaya eklenecek nokta sayısı (varsayılan: 3)
 * @returns Formatlanmış string veya boş string
 */
export const ellipsizeString = (
  str: string | null | undefined,
  startChars: number = 3,
  endChars: number = 3,
  dots: number = 3,
): string => {
  if (!str) return '';

  const totalChars = startChars + endChars;
  if (str.length <= totalChars) return str;

  const start = str.substring(0, startChars);
  const end = str.substring(str.length - endChars);

  return start + '.'.repeat(dots) + end;
};

export const toLocaleUpperCase = (str: string | null | undefined): string => {
  if (!str) return '';
  const locale = i18n.language || 'en'; // Geçerli dil ayarını al, varsayılan olarak 'en' kullan
  return str.toLocaleUpperCase(locale);
};

export const toLocaleLowerCase = (str: string | null | undefined): string => {
  if (!str) return '';
  const locale = i18n.language || 'en'; // Geçerli dil ayarını al, varsayılan olarak 'en' kullan
  return str.toLocaleLowerCase(locale);
};

export const stringToNumberString = (
  str: string | null | undefined,
): string => {
  if (!str) return '';
  str = str.replace(',', '.');

  const [integerPart, decimalPart] = str.split('.');
  if (!decimalPart) {
    const floatValue = parseFloat(integerPart);
    if (isNaN(floatValue)) return '';
    return str;
  } else {
    const parsed = parseFloat(str);
    return isNaN(parsed) ? '' : parsed.toString();
  }

  // const parsed = parseFloat(str.replace(',', '.'));
  // return isNaN(parsed) ? '' : parsed.toString();
};
