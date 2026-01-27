import type { FtmConfig, Scheme, Theme } from '@ftm/services/config';

/**
 * UI Settings shape used by SettingsService
 */
export type Settings = Readonly<{
    /** Theme id (must exist in FtmConfig themes) */
    theme: Theme;
    /** Color scheme preference */
    scheme: Scheme; // 'auto' | 'dark' | 'light'
    /** App layout */
    layout: FtmConfig['layout'];
    /** Persist selection to localStorage */
    persist: boolean;
    /** localStorage key for persistence */
    storageKey: string;
    /** Brand colors for UI surfaces controlled via env */
    colors: Readonly<{
        splashBg: string;      // Splash screen background
        splashFg: string;      // Splash screen foreground text/icon
        splashSpinner: string; // Splash screen spinner dots
        sidenavBg: string;     // Sidenav background
        sidenavFg: string;     // Sidenav text/icon color
        sidenavHoverBg: string;   // Sidenav item hover background
        sidenavActiveBg: string;  // Sidenav item active background
        sidenavBorder: string;    // thin border for edges
        sidenavDivider: string;   // dividers between groups
        sidenavAccent: string;    // accents for active icons/badges
    }>;
}>;

export const environment = {
    api: {
        baseUrl: '',
        navigationUrl: ''
    },
    enableMockApi: true,
    settings: {
        theme: 'theme-brand',
        scheme: 'light',
        layout: 'classy',
        persist: true,
        storageKey: 'ftm.settings',
        colors: {
            splashBg: '#111827',
            splashFg: '#F9FAFB',
            splashSpinner: '#1E96F7',
            sidenavBg: '#0d9488',
            sidenavFg: '#0d9488',
            sidenavHoverBg: 'rgba(229, 231, 235, 0.06)',
            sidenavActiveBg: 'rgba(229, 231, 235, 0.12)',
            sidenavBorder: 'rgba(229, 231, 235, 0.10)',
            sidenavDivider: 'rgba(229, 231, 235, 0.12)',
            sidenavAccent: '#60A5FA',
        },
    } satisfies Settings,
} as const;
