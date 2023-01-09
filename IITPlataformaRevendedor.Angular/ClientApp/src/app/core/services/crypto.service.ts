import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const encryptKey: string = 'bcQVGrUmPXL7ICbUsmioe4KoQjTpVlQa';
const AES_IV: string = "1234567890000000";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString();
  }

  decrypt<T>(data: string): T {
    const bytes = CryptoJS.AES.decrypt(data, encryptKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  /**funcion de encriptacion de datos para lectura en el back */
  encriptarParaBack(msg: any) {
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2(encryptKey, salt, {
      keySize: keySize / 32,
      iterations: 100
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

    return result;
  }

  /**funcion que desencripta datos encriptados desde el back */
  desencriptarDesdeBack(ciphertextB64: any, key: string = encryptKey) {

    var keyAux = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, keyAux, { iv: iv });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
