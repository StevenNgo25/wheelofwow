<template>
  <div class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      <Icon :name="currentLocale === 'en' ? 'circle-flags:gb' : 'circle-flags:vn'" class="w-5 h-5" />
      <span class="text-sm font-medium">{{ currentLocale.toUpperCase() }}</span>
      <Icon name="ph:caret-down" class="w-4 h-4" />
    </button>

    <div
      v-if="menuOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLocale(locale.code)"
        class="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
        :class="{ 'bg-primary-50': locale.code === currentLocale }"
      >
        <Icon :name="locale.code === 'en' ? 'circle-flags:gb' : 'circle-flags:vn'" class="w-5 h-5" />
        <span class="text-sm">{{ locale.name }}</span>
        <Icon v-if="locale.code === currentLocale" name="ph:check" class="w-4 h-4 ml-auto text-primary-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const menuOpen = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const switchLocale = (code: string) => {
  setLocale(code)
  menuOpen.value = false
}

// Close menu when clicking outside
onClickOutside(menuOpen, () => {
  menuOpen.value = false
})
</script>
