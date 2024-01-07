import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin : any = {
  registerType:"prompt",
  includeAssets:['favicon.png', "apple-touch-icon.png"],
  manifest:{
    name:"style-sphere",
    short_name:"style-sphere",
    description:"Clothing store",
    icons:[{
      src: '/android-chrome-192x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/favicon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#181818',
  background_color:'#e0cc3b',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env-config',
  plugins: [react(),VitePWA({manifest:{icons:[{
    src: '/android-chrome-512x512.png',
    sizes:'512x512',
    type:'image/png',
    purpose:'any maskable',
  }]},registerType:"prompt"})],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    port: 5172,
  },
})
