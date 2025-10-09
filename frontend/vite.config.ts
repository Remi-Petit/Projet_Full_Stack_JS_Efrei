import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const envPath = path.resolve(__dirname, './..');
  const env = loadEnv(mode, envPath, '');

  return {
    envDir: envPath,
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
    },
  }
})