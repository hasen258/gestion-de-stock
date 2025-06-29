import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkInitialTheme();
  }

  private checkInitialTheme(): void {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  toggleDarkMode(): void {
    if (!this.isBrowser) return;

    if (this.isDarkMode.value) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode(): void {
    if (!this.isBrowser) return;

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode.next(true);
  }

  private disableDarkMode(): void {
    if (!this.isBrowser) return;

    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDarkMode.next(false);
  }
} 