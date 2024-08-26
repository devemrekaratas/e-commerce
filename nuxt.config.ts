// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  pages: true,
  devtools: { enabled: true },
  runtimeConfig: {
    authOrigin: process.env.AUTH_ORIGIN,
    authSecret: process.env.AUTH_SECRET
  },
  modules: ["@nuxt/ui", "@nuxt/image", "nuxt-swiper", "@nuxt/fonts", "@vueuse/nuxt", "@sidebase/nuxt-auth", "dayjs-nuxt", "@formkit/auto-animate/nuxt"],
  auth: {
    globalAppMiddleware:{
      isEnabled:true
    },
    provider: {
      type: 'authjs'
    }
  },
  icon: {
    serverBundle: 'local',
  },
  swiper:{
    modules: ['thumbs','navigation']
  }
})