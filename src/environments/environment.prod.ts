import type { FtmConfig, Scheme, Theme } from '@ftm/services/config';
import type { Settings } from './environment';

export const environment = {
  api: {
    baseUrl: '',
    navigationUrl: ''
  },
  enableMockApi: false,
  settings: {
    theme: 'theme-default',
    scheme: 'dark' as Scheme,
    layout: 'classy' as FtmConfig['layout'],
    persist: true,
    storageKey: 'ftm.settings',
    colors: {
      splashBg: '#0B1221',
      splashFg: '#F3F4F6',
      splashSpinner: '#22D3EE',
      sidenavBg: '#0B1221',
      sidenavFg: '#E5E7EB',
      sidenavHoverBg: 'rgba(229, 231, 235, 0.06)',
      sidenavActiveBg: 'rgba(229, 231, 235, 0.12)',
      sidenavBorder: 'rgba(229, 231, 235, 0.10)',
      sidenavDivider: 'rgba(229, 231, 235, 0.12)',
      sidenavAccent: '#60A5FA',
    },
  } satisfies Settings,
} as const;
