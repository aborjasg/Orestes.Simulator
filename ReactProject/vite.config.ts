import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    server: {
        port: 5022,
        proxy: {
            '/api': { // Proxy requests starting with /api
            target: 'http://localhost:5062', // Your API server URL
            changeOrigin: true, // Needed for virtual hosted sites
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix
            }
        }
    }
})
