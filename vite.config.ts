import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // Ensure alias points to src directory
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://app.lincoin.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,  // Set to true if the target uses HTTPS
      },
    },
  },
});
