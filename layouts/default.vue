<script setup lang="ts">
</script>

<template>
  <div>
    <AppHeader />
    <UContainer class="min-h-[calc(100vh-80px]">
      <main class="pb-4">
        <slot />
      </main>
    </UContainer>
    <AppFooter />
  </div>
</template>