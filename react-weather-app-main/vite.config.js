import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
base: '/react-weather-app/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
