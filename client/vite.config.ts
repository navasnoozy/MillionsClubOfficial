import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
     allowedHosts: ['millionsclub.local'], //  Allow your custom domain

    //  watch: { // TO SYNC BETTER, BUT MORE CPU USAGE
    //   usePolling: true,
    //   interval: 300  // Check every 300ms
    // }
  }
})
