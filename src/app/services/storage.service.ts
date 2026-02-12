import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  getData<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setData<T>(key: string, data: T): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }
}
