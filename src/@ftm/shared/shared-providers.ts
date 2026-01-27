import { Provider } from '@angular/core';

// Add reusable providers you want to compose into features when needed.
// Keep it minimal to preserve tree-shaking.
export const provideShared = (): Provider[] => [
  // Example: custom tokens or feature-scoped interceptors can go here.
];
