import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const guidelineBaseWidth = 430; // Tasarım genişliği iPhone 14 Pro için

export const scaleSize = (size: number) => (width / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => {
  return Math.round(size * (width / guidelineBaseWidth));
};

export const FONT_SIZES = {
  /** 11 birim (En küçük yazı tipi boyutu) */
  XXS: scaleFont(11),
  /** 13 birim (Çok küçük yazı tipi boyutu) */
  XS: scaleFont(13),
  /** 15 birim (Küçük yazı tipi boyutu) */
  SM: scaleFont(15),
  /** 17 birim (Orta yazı tipi boyutu) */
  MD: scaleFont(17),
  /** 19 birim (Büyük yazı tipi boyutu) */
  LG: scaleFont(19),
  /** 21 birim (Çok büyük yazı tipi boyutu) */
  XL: scaleFont(21),
  /** 25 birim (En büyük yazı tipi boyutu) */
  XXL: scaleFont(25), // Kullanıldı
  /** 27 birim (En büyük yazı tipi boyutu) */
  XXXL: scaleFont(27), // Kullanıldı
};

export const LINE_HEIGHTS = {
  /** 14 birim (En küçük satır yüksekliği) */
  XXS: scaleFont(14),
  /** 16 birim (Çok küçük satır yüksekliği) */
  XS: scaleFont(16),
  /** 18 birim (Küçük satır yüksekliği) */
  SM: scaleFont(18),
  /** 20 birim (Orta satır yüksekliği) */
  MD: scaleFont(19),
  /** 21 birim (Büyük satır yüksekliği) */
  LG: scaleFont(21), // Kullanıldı
  /** 26 birim (Çok büyük satır yüksekliği) */
  XL: scaleFont(26),
  /** 30 birim (En büyük satır yüksekliği) */
  XXL: scaleFont(30),
  /** 32 birim (En büyük satır yüksekliği) */
  XXXL: scaleFont(32), // Kullanıldı
};

export const SPACING = {
  /** 4 birim (En küçük boşluk) */
  XXS: scaleSize(4),
  /** 8 birim (Çok küçük boşluk) */
  XS: scaleSize(8),
  /** 12 birim (Küçük boşluk) */
  SM: scaleSize(12), // Kullanıldı
  /** 16 birim (Orta boşluk) */
  MD: scaleSize(16),
  /** 20 birim (Büyük boşluk) */
  LG: scaleSize(20),
  /** 22 birim (Orta büyüklükte boşluk) */
  MD_LG: scaleSize(22), // Kullanıldı
  /** 24 birim (Çok büyük boşluk) */
  XL: scaleSize(24), // Kullanıldı
  /** 28 birim (Çok büyük boşluk) */
  XXL: scaleSize(28), // Kullanıldı
  /** 32 birim (En büyük boşluk) */
  XXXL: scaleSize(32),
  /** 41 birim (Sayfa alt boşluğu) */
  PAGE_BOTTOM: scaleSize(41),
};

export const BORDER_RADIUS = {
  /** 2 birim (En küçük kenar yuvarlama) */
  XXS: scaleSize(2),
  /** 4 birim (Çok küçük kenar yuvarlama) */
  XS: scaleSize(4),
  /** 6 birim (Küçük kenar yuvarlama) */
  SM: scaleSize(6),
  /** 8 birim (Orta kenar yuvarlama) */
  MD: scaleSize(8),
  /** 10 birim (Büyük kenar yuvarlama) */
  LG: scaleSize(10),
  /** 12 birim (Çok büyük kenar yuvarlama) */
  XL: scaleSize(14),
  /** 18 birim (Çok büyük kenar yuvarlama) */
  XXL: scaleSize(18), // Kullanıldı
  /** 20 birim (En büyük kenar yuvarlama) */
  XXXL: scaleSize(20),
};

export const BORDER_WIDTH = {
  /** 0.5 birim (En ince kenar kalınlığı) */
  THIN: 0.5,
  /** 1 birim (Standart kenar kalınlığı) */
  DEFAULT: 1,
  /** 1.5 birim (Orta kalınlıkta kenar) */
  MEDIUM: 1.5,
  /** 2 birim (Kalın kenar) */
  THICK: 2,
};
