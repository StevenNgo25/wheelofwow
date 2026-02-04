<template>
  <aside class="w-64 bg-white border-r min-h-screen p-4">
    <nav class="space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center space-x-3 px-4 py-3 rounded-lg transition hover:bg-gray-50"
        :class="{ 'bg-primary-50 text-primary-600': isActive(item.to) }"
      >
        <Icon :name="item.icon" class="w-5 h-5" />
        <span class="font-medium">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- Subscription Status -->
    <div class="mt-8 p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white">
      <div class="text-sm opacity-90 mb-1">{{ $t('dashboard.subscription.plan') }}</div>
      <div class="text-lg font-bold">Free Plan</div>
      <NuxtLink to="/pricing" class="mt-3 btn bg-white text-primary-500 hover:bg-gray-100 w-full text-sm">
        {{ $t('dashboard.subscription.btnUpgrade') }}
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const menuItems = computed(() => [
  {
    to: '/dashboard',
    icon: 'ph:house',
    label: t('nav.dashboard'),
  },
  {
    to: '/dashboard/draw',
    icon: 'ph:trophy',
    label: t('nav.draw'),
  },
  {
    to: '/dashboard/settings',
    icon: 'ph:gear',
    label: t('nav.settings'),
  },
])

const isActive = (path: string) => {
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path.startsWith(path)
}
</script>
