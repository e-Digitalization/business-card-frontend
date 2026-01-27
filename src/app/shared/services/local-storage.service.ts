import { Injectable } from "@angular/core";
import { EncryptionDecryptionService } from "./encryption.service";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private ls = window.localStorage;

  constructor(
    private encryptionDecryptionService: EncryptionDecryptionService
  ) {}

  /**
   * save data to local storage
   * encrypt data before saving
   * @param key
   * @param value
   * @returns true
   */
  public setItem(key: string, value: any) {
    value = this.encryptionDecryptionService.set(JSON.stringify(value));

    this.ls.setItem(key, value);
    return true;
  }

  /**
   * get data to local storage
   * decrypt data before returning
   * @param key
   * @returns true
   */
  public getItem(key: string) {
    const value = this.encryptionDecryptionService.get(this.ls.getItem(key));
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  /**
   * Remove single item from local storage
   * @param key
   * @returns
   */
  public removeItem(key: string) {
    this.ls.removeItem(key);
    return true;
  }

  /** Clear local storage */
  public clear() {
    this.ls.clear();
  }
}
