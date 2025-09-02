import CryptoJS from 'crypto-js';

export const hashNames = (name: string): string => {
  return CryptoJS.SHA256(name).toString(CryptoJS.enc.Hex);
}