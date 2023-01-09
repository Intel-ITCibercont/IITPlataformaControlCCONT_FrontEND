
import * as CryptoJS from 'crypto-js';

// const encryptKey: string = 'D3923BDE-C58B-4F4A-8DAC-E9F301CDB8FD';
const encryptKey: string = 'bcQVGrUmPXL7ICbUsmioe4KoQjTpVlQa';
const AES_IV: string = "1234567890000000";

export function encrypt(data: any): string {

  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString();
}

export function decrypt<T>(data: string): T {
  const bytes = CryptoJS.AES.decrypt(data, encryptKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}