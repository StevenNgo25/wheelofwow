<template>
  <footer class="bg-gray-900 text-white">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <Icon name="ph:seal-check-fill" class="w-6 h-6 text-primary-400" />
            <span class="text-xl font-display font-bold">
              {{ $t('app.title') }}
            </span>
          </div>
          <p class="text-gray-400 text-sm">
            {{ $t('app.description') }}
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-semibold mb-4">Product</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/#features" class="text-gray-400 hover:text-white transition">{{ $t('nav.features') }}</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="text-gray-400 hover:text-white transition">{{ $t('nav.pricing') }}</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="text-gray-400 hover:text-white transition">{{ $t('nav.dashboard') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Legal</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-gray-400 hover:text-white transition">{{ $t('footer.terms') }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-400 hover:text-white transition">{{ $t('footer.contact') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Connect</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon name="ph:twitter-logo" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon name="ph:facebook-logo" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition">
              <Icon name="ph:linkedin-logo" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
