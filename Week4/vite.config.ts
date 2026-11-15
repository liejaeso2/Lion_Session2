import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // json-server가 db.json을 고칠 때 화면이 새로고침되지 않도록
    watch: {
      ignored: ['**/server/**'],
    },
  },
})
