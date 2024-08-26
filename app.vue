<script setup lang="ts">
useHead({
  titleTemplate: t => t ? `${t} - ShopyShop` : 'ShopyShop, Everything you need!',
})
</script>

<template>
  <div class="font-custom">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
