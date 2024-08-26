<script setup lang="ts">
</script>

<template>
  <div>
    <AppHeader />
    <UContainer class="min-h-[calc(100vh-80px]">
      <main>
        <slot />
      </main>
    </UContainer>
    <AppFooter />
  </div>
</template>