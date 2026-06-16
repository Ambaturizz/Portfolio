import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hobbies: resolve(__dirname, 'hobbies.html'),
        terimakasih: resolve(__dirname, 'terimakasih.html')
      }
    }
  }
});
