// src/types/global.d.ts
declare module '@mui/icons-material/*';
declare module '*.js';

// Déclarations pour authSlice
declare module '../stores/authSlice' {
  export const clearAuth: () => void;
  export const setToken: (token: string) => void;
  export const setUser: (user: any) => void;
}

// Déclarations pour store
declare module '../stores/store' {
  import { Store } from 'redux';
  const store: Store;
  export default store;
}
declare module './stores/store' {
  import { Store } from 'redux';
  const store: Store;
  export default store;
}
