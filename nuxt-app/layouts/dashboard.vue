<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader />
    
    <div class="flex">
      <DashboardSidebar class="hidden lg:block" />
      
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dashboard layout for authenticated pages
definePageMeta({
  middleware: 'auth'
})
</script>
