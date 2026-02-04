<template>
  <ClientOnly>
    <div class="lucky-draw-page">
      <!-- Import original CSS -->
      <link rel="stylesheet" href="/original-styles.css">
      
      <!-- Main Draw Section -->
      <main class="draw-container">
        <div class="background-animation"></div>
        
        <!-- Prize Level Selector -->
        <div class="prize-selector">
          <button class="prize-btn" data-prize="grand prize">
            <span class="prize-icon">🏆</span>
            <span>{{ $t('prizes.special') }}</span>
          </button>
          <button class="prize-btn" data-prize="first prize">
            <span class="prize-icon">🥇</span>
            <span>{{ $t('prizes.first') }}</span>
          </button>
          <button class="prize-btn" data-prize="second prize">
            <span class="prize-icon">🥈</span>
            <span>{{ $t('prizes.second') }}</span>
          </button>
          <button class="prize-btn active" data-prize="third prize">
            <span class="prize-icon">🥉</span>
            <span>{{ $t('prizes.third') }}</span>
          </button>
          <button class="prize-btn" data-prize="consolation prize">
            <span class="prize-icon">🎁</span>
            <span>{{ $t('prizes.consolation') }}</span>
          </button>
        </div>

        <!-- Display Area -->
        <div class="display-area">
          <h2 class="current-prize">{{ $t('prizes.third') }}</h2>
          <p class="instruction">{{ $t('draw.instruction') }}</p>
          
          <!-- Number Display Grid -->
          <div class="numbers-grid">
            <div v-for="i in 6" :key="i" class="number-box">
              <div class="number">0</div>
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="controls">
            <button class="btn-prev">
              <span>◄</span>
            </button>
            <button class="btn-draw">
              <span>{{ $t('draw.btnDraw') }}</span>
            </button>
            <button class="btn-next">
              <span>►</span>
            </button>
          </div>
        </div>

        <!-- Winners Display -->
        <div class="winners-section">
          <h3>{{ $t('winners.title') }}</h3>
          <div class="winners-list"></div>
        </div>
      </main>

      <!-- Participant Input Section -->
      <section class="participants-section">
        <div class="container">
          <h2>{{ $t('participants.title') }}</h2>
          <div class="input-area">
            <textarea id="participants-input" :placeholder="$t('participants.placeholder')"></textarea>
            <button id="load-participants" class="btn-load">{{ $t('participants.btnLoad') }}</button>
          </div>
          <div class="participants-info">
            <p>{{ $t('participants.total') }} <strong id="total-participants">0</strong></p>
            <p>{{ $t('participants.remaining') }} <strong id="remaining-participants">0</strong></p>
          </div>
        </div>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

onMounted(() => {
  // Load original script.js
  const script = document.createElement('script')
  script.src = '/script.js'
  document.body.appendChild(script)
})
</script>

<style>
/* Import original draw.css here if needed */
</style>
