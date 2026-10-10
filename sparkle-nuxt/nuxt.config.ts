export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ui: {
    primary: 'cyan'
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/sitemap.xml'],
      failOnError: false
    }
  },
  routeRules: {
    '/**/*.{js,css,ico,svg,webp}': { cache: { maxAge: 60 * 60 * 24 * 365 } }
  },
  experimental: {
    enforceModuleCompatibility: false
  }
})
