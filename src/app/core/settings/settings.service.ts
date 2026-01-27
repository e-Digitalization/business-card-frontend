import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { FtmConfig, FtmConfigService, Scheme, Theme } from '@ftm/services/config';
import { filter } from 'rxjs';

// Keys we persist from the global config
type PersistedKeys = Pick<FtmConfig, 'theme' | 'scheme' | 'layout'>;

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly cfg = inject(FtmConfigService);
  private readonly persist = environment.settings.persist;
  private readonly storageKey = environment.settings.storageKey;

  constructor() {
    // Apply defaults at startup
    this.applyDefaults();

    // Persist changes if enabled
    if (this.persist) {
      this.cfg.config$
        .pipe(filter(Boolean))
        .subscribe((c) => {
          const toSave: PersistedKeys = {
            theme: c.theme as Theme,
            scheme: c.scheme as Scheme,
            layout: c.layout,
          };
          try {
            localStorage.setItem(this.storageKey, JSON.stringify(toSave));
          } catch {}
        });
    }
  }

  private applyDefaults(): void {
    const defaults = environment.settings;

    // If persistence and a saved value exists, prefer it
    if (this.persist) {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<PersistedKeys>;
          this.cfg.config = {
            theme: parsed.theme ?? (defaults.theme as Theme),
            scheme: (parsed.scheme as Scheme) ?? (defaults.scheme as Scheme),
            layout: parsed.layout ?? defaults.layout,
          };
          return;
        }
      } catch {}
    }

    // Otherwise apply environment defaults
    this.cfg.config = {
      theme: defaults.theme as Theme,
      scheme: defaults.scheme as Scheme,
      layout: defaults.layout,
    };
  }
}
