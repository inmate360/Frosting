export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    primary: 'cyan'
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/sitemap.xml']
    },
    storage: {
      redis: {
        driver: 'redis'
      }
    }
  },
  routeRules: {
    // Cache static assets
    '/**/*.{js,css,ico,svg,webp}': { cache: { maxAge: 60 * 60 * 24 * 365 } }
  }
})
