// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    
    // Public keys (client-side accessible)
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    },
  },

  // i18n configuration
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Tiếng Việt' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Lucky Draw - Online Prize Drawing System',
      meta: [
        { name: 'description', content: 'Fair and transparent online lucky draw system with multiple prize levels. Perfect for events, conferences, and mini-games.' },
        { name: 'theme-color', content: '#ff6b35' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Disable for now to avoid build issues
  },
})
