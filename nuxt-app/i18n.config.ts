import en from './i18n/locales/en.json'
import vi from './i18n/locales/vi.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    vi
  }
}))
