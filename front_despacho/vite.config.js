import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/despachos': {
        // Para desarrollo local: localhost:8081
        // Para Docker: backend-despachos:8081 (resuelto por DNS interno de Docker)
        target: process.env.API_TARGET_DESPACHOS || 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/despachos/, '')
      },
      '/api/ventas': {
        // Para desarrollo local: localhost:8082
        // Para Docker: backend-ventas:8082 (resuelto por DNS interno de Docker)
        target: process.env.API_TARGET_VENTAS || 'http://localhost:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ventas/, '')
      }
    }
  }
})
