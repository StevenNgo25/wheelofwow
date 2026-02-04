<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container-custom">
      <h1 class="text-4xl font-display font-bold mb-8">
        {{ $t('pricing.title') }}
      </h1>
      <p class="text-xl text-gray-600 mb-12 max-w-2xl">
        {{ $t('pricing.subtitle') }}
      </p>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Free Plan -->
        <div class="card hover:shadow-xl transition">
          <h3 class="text-2xl font-bold mb-2">{{ $t('pricing.free.name') }}</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">{{ $t('pricing.free.price') }}</span>
            <span class="text-gray-600">/ {{ $t('pricing.free.period') }}</span>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li v-for="(feature, i) in $tm('pricing.free.features')" :key="i" class="flex items-start gap-2">
              <Icon name="ph:check-circle-fill" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          
          <NuxtLink to="/signup" class="btn btn-outline w-full">
            {{ $t('pricing.free.cta') }}
          </NuxtLink>
        </div>

        <!-- Pro Plan (Popular) -->
        <div class="card hover:shadow-xl transition border-2 border-primary-500 relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span class="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {{ $t('pricing.pro.popular') }}
            </span>
          </div>
          
          <h3 class="text-2xl font-bold mb-2 text-primary-600">{{ $t('pricing.pro.name') }}</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">{{ $t('pricing.pro.price') }}</span>
            <span class="text-gray-600">/ {{ $t('pricing.pro.period') }}</span>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li v-for="(feature, i) in $tm('pricing.pro.features')" :key="i" class="flex items-start gap-2">
              <Icon name="ph:check-circle-fill" class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          
          <button @click="handleCheckout('pro')" class="btn btn-primary w-full">
            {{ $t('pricing.pro.cta') }}
          </button>
        </div>

        <!-- Enterprise Plan -->
        <div class="card hover:shadow-xl transition">
          <h3 class="text-2xl font-bold mb-2">{{ $t('pricing.enterprise.name') }}</h3>
          <div class="mb-6">
            <span class="text-4xl font-bold">{{ $t('pricing.enterprise.price') }}</span>
            <span class="text-gray-600 block text-sm">{{ $t('pricing.enterprise.period') }}</span>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li v-for="(feature, i) in $tm('pricing.enterprise.features')" :key="i" class="flex items-start gap-2">
              <Icon name="ph:check-circle-fill" class="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          
          <button @click="handleContact" class="btn btn-secondary w-full">
            {{ $t('pricing.enterprise.cta') }}
          </button>
        </div>
      </div>

      <!-- FAQ or Additional Info -->
      <div class="mt-16 text-center">
        <p class="text-gray-600">
          All plans include 30-day money-back guarantee
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const { t } = useI18n()
const router = useRouter()

const handleCheckout = async (plan: string) => {
  // TODO: Implement Stripe Checkout
  console.log('Checkout for plan:', plan)
  // For now, redirect to signup
  router.push('/signup')
}

const handleContact = () => {
  // TODO: Open contact form or email
  window.location.href = 'mailto:contact@luckydraw.com'
}

useSeoMeta({
  title: t('pricing.title'),
  description: t('pricing.subtitle'),
})
</script>
