<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Icon name="ph:seal-check-fill" class="w-8 h-8 text-primary-500" />
          <span class="text-2xl font-display font-bold text-gray-900">
            {{ $t('app.title') }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/#features" class="text-gray-600 hover:text-primary-500 transition">
            {{ $t('nav.features') }}
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-600 hover:text-primary-500 transition">
            {{ $t('nav.pricing') }}
          </NuxtLink>
          
          <template v-if="user">
            <NuxtLink to="/dashboard" class="text-gray-600 hover:text-primary-500 transition">
              {{ $t('nav.dashboard') }}
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-gray-600 hover:text-primary-500 transition">
              {{ $t('nav.login') }}
            </NuxtLink>
            <NuxtLink to="/signup" class="btn btn-primary">
              {{ $t('nav.signup') }}
            </NuxtLink>
          </template>

          <!-- Language Switcher -->
          <LanguageSwitcher />
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Icon :name="mobileMenuOpen ? 'ph:x' : 'ph:list'" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
        <div class="flex flex-col space-y-4">
          <NuxtLink to="/#features" class="text-gray-600 hover:text-primary-500 transition">
            {{ $t('nav.features') }}
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-gray-600 hover:text-primary-500 transition">
            {{ $t('nav.pricing') }}
          </NuxtLink>
          <template v-if="user">
            <NuxtLink to="/dashboard" class="text-gray-600 hover:text-primary-500 transition">
              {{ $t('nav.dashboard') }}
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-gray-600 hover:text-primary-500 transition">
              {{ $t('nav.login') }}
            </NuxtLink>
            <NuxtLink to="/signup" class="btn btn-primary w-full">
              {{ $t('nav.signup') }}
            </NuxtLink>
          </template>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const user = ref(null) // TODO: Replace with actual user from auth store
const mobileMenuOpen = ref(false)
</script>
