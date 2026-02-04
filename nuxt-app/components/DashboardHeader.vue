<template>
  <header class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/dashboard" class="flex items-center space-x-2">
          <Icon name="ph:seal-check-fill" class="w-6 h-6 text-primary-500" />
          <span class="text-xl font-display font-bold">
            {{ $t('app.title') }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            to="/dashboard" 
            class="text-gray-600 hover:text-primary-500 transition flex items-center gap-2"
          >
            <Icon name="ph:house" class="w-5 h-5" />
            {{ $t('nav.dashboard') }}
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/draw" 
            class="text-gray-600 hover:text-primary-500 transition flex items-center gap-2"
          >
            <Icon name="ph:trophy" class="w-5 h-5" />
            {{ $t('nav.draw') }}
          </NuxtLink>
          <NuxtLink 
            to="/dashboard/settings" 
            class="text-gray-600 hover:text-primary-500 transition flex items-center gap-2"
          >
            <Icon name="ph:gear" class="w-5 h-5" />
            {{ $t('nav.settings') }}
          </NuxtLink>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <div class="relative">
            <button 
              @click="menuOpen = !menuOpen"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                {{ userInitial }}
              </div>
              <Icon name="ph:caret-down" class="w-4 h-4" />
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="menuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2"
            >
              <button 
                @click="handleLogout"
                class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
              >
                <Icon name="ph:sign-out" class="w-5 h-5" />
                {{ $t('nav.logout') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, signOut } = useAuth()
const menuOpen = ref(false)
const router = useRouter()

const userInitial = computed(() => {
  if (!user.value) return '?'
  const name = user.value.user_metadata?.name || user.value.email
  return name?.charAt(0).toUpperCase() || '?'
})

const handleLogout = async () => {
  await signOut()
  router.push('/login')
}
</script>
