import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class EncryptionDecryptionService {
  constructor() {}

  /*The set method is used for encryption the value.*/
  keys = "*n%^+-$#@$^@1ERF";

  set(value) {
    if (value === null || value === undefined) {
      return null;
    }
    const key = CryptoJS.enc.Utf8.parse(this.keys);
    const iv = CryptoJS.enc.Utf8.parse(this.keys);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 32,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // replacing a '/' character in the encrypted string with 'juam' in order to avoid unkown routes
    return encrypted.toString().replace(new RegExp("/", "g"), "juam");
    //  return encrypted.toString().replace('/', 'juam');
  }

  /*The get method is used for decrypting the value.*/
  get(value) {
    if (value === null || value === undefined) {
      return null;
    }
    const key = CryptoJS.enc.Utf8.parse(this.keys);
    const iv = CryptoJS.enc.Utf8.parse(this.keys);

    // return a '/' character before decryption

    const replacedValue = value.replace(new RegExp("juam", "g"), "/");

    // const replacedValue3 =  replacedValue.replace('juam', '/');

    const decrypted = CryptoJS.AES.decrypt(replacedValue, key, {
      keySize: 128 / 32,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
