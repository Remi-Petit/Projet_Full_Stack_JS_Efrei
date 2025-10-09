// src/config/env.ts

export const ENV = Object.freeze({
  API_URL: import.meta.env.VITE_PROTOCOL_API + '://' + import.meta.env.VITE_HOST_API + ':' + import.meta.env.VITE_PORT_API + '/api' || import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'MyApp',
  MODE: import.meta.env.VITE_ENV_MODE ?? 'development',
  VITE_PROTOCOL: import.meta.env.VITE_PROTOCOL,
  VITE_HOST: import.meta.env.VITE_HOST,
  VITE_PORT: import.meta.env.VITE_PORT,
});
