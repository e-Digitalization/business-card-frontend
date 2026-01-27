import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvStyleService {
  constructor() {
    this.applyCssVars();
  }

  private applyCssVars(): void {
    const root = document.documentElement;
    const c = environment.settings.colors;

    root.style.setProperty('--env-splash-bg', c.splashBg);
    root.style.setProperty('--env-splash-fg', c.splashFg);
    root.style.setProperty('--env-splash-spinner', c.splashSpinner);

    root.style.setProperty('--env-sidenav-bg', c.sidenavBg);
    root.style.setProperty('--env-sidenav-fg', c.sidenavFg);
    root.style.setProperty('--env-sidenav-hover-bg', c.sidenavHoverBg);
    root.style.setProperty('--env-sidenav-active-bg', c.sidenavActiveBg);
    root.style.setProperty('--env-sidenav-border', c.sidenavBorder);
    root.style.setProperty('--env-sidenav-divider', c.sidenavDivider);
    root.style.setProperty('--env-sidenav-accent', c.sidenavAccent);
  }
}
