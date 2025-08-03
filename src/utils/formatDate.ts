import i18n from '../localization/i18n';

export const formatJoinDate = (date: string): number => {
  const joinDate = new Date(date);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - joinDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  return diffDays;
};

/**
 * Date'i "time ago" formatına çevirir
 * @param date - String veya number formatında date
 * @returns "2 minutes ago", "1 hour ago" gibi formatlanmış string
 */
export const formatTimeAgo = (date: string | number): string => {
  // Date objesine çevir
  let targetDate: Date;

  if (typeof date === 'string') {
    targetDate = new Date(date);
  } else if (typeof date === 'number') {
    // Number ise milisaniye mi saniye mi kontrol et
    const isSeconds = date.toString().length === 10;
    targetDate = new Date(isSeconds ? date * 1000 : date);
  } else {
    return 'Invalid date';
  }

  // Geçersiz date kontrolü
  if (isNaN(targetDate.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  // Gelecekteki tarih kontrolü
  if (diffMs < 0) {
    return 'Just now';
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // i18n ile çoklu dil desteği
  if (years > 0) {
    return i18n.t('common:timeAgo.years', {
      count: years,
      defaultValue: `${years} year${years > 1 ? 's' : ''} ago`,
    });
  } else if (months > 0) {
    return i18n.t('common:timeAgo.months', {
      count: months,
      defaultValue: `${months} month${months > 1 ? 's' : ''} ago`,
    });
  } else if (days > 0) {
    return i18n.t('common:timeAgo.days', {
      count: days,
      defaultValue: `${days} day${days > 1 ? 's' : ''} ago`,
    });
  } else if (hours > 0) {
    return i18n.t('common:timeAgo.hours', {
      count: hours,
      defaultValue: `${hours} hour${hours > 1 ? 's' : ''} ago`,
    });
  } else if (minutes > 0) {
    return i18n.t('common:timeAgo.minutes', {
      count: minutes,
      defaultValue: `${minutes} minute${minutes > 1 ? 's' : ''} ago`,
    });
  } else if (seconds > 10) {
    return i18n.t('common:timeAgo.seconds', {
      count: seconds,
      defaultValue: `${seconds} second${seconds > 1 ? 's' : ''} ago`,
    });
  } else {
    return i18n.t('common:timeAgo.justNow', {defaultValue: 'Just now'});
  }
};

/**
 * Date'i kısa "time ago" formatına çevirir (1y, 2mo, 3d, 4h, 5m, 6s)
 * @param date - String veya number formatında date
 * @returns "2m", "1h", "3d" gibi kısa formatlanmış string
 */
export const formatTimeAgoShort = (date: string | number): string => {
  // Date objesine çevir
  let targetDate: Date;

  if (typeof date === 'string') {
    targetDate = new Date(date);
  } else if (typeof date === 'number') {
    // Number ise milisaniye mi saniye mi kontrol et
    const isSeconds = date.toString().length === 10;
    targetDate = new Date(isSeconds ? date * 1000 : date);
  } else {
    return 'Invalid';
  }

  // Geçersiz date kontrolü
  if (isNaN(targetDate.getTime())) {
    return 'Invalid';
  }

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();

  // Gelecekteki tarih kontrolü
  if (diffMs < 0) {
    return 'now';
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return i18n.t('common:y', {value: years, defaultValue: `${years}y`});
  } else if (months > 0) {
    return i18n.t('common:mo', {value: months, defaultValue: `${months}mo`});
  } else if (days > 0) {
    return i18n.t('common:d', {value: days, defaultValue: `${days}d`});
  } else if (hours > 0) {
    return i18n.t('common:h', {value: hours, defaultValue: `${hours}h`});
  } else if (minutes > 0) {
    return i18n.t('common:m', {value: minutes, defaultValue: `${minutes}m`});
  } else if (seconds > 0) {
    return i18n.t('common:s', {value: seconds, defaultValue: `${seconds}s`});
  } else {
    return i18n.t('common:justNow', {defaultValue: 'now'});
  }
};
