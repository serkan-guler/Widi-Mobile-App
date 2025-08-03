import CryptoJS from 'react-native-crypto-js';
import {CRYPTO_SECRET} from '@env';

export function enCrypt(data: unknown) {
  const iv = CryptoJS.lib.WordArray.random(16);
  const keyParsed = CryptoJS.enc.Base64.parse(CRYPTO_SECRET); // Base64 olarak parse et

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), keyParsed, {
    iv: iv,
  }).ciphertext.toString(CryptoJS.enc.Hex);

  return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted}`;
}

export function deCrypt(data: string) {
  try {
    const [ivHex, encryptedHex] = data.split(':');
    if (!ivHex || !encryptedHex) {
      throw new Error('Geçersiz veri formatı');
    }

    const ivParsed = CryptoJS.enc.Hex.parse(ivHex);
    const keyParsed = CryptoJS.enc.Base64.parse(CRYPTO_SECRET); // Base64 olarak parse et

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(encryptedHex),
      }),
      keyParsed,
      {iv: ivParsed},
    ).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error('Şifre çözme başarısız: Boş veri');
    }

    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Decrypt hatası:', error);
    throw error;
  }
}
