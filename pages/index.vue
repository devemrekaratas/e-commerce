<script setup lang="ts">
import type { IProductAll } from '~/types/product';

definePageMeta({
  auth: false
})

const root = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)
const page = ref(1)
const hasMore = ref(true)

const limit = computed(() => {
  return page.value * 16
})

const skip = computed(() => {
  return (page.value - 1) * 16
})

const { data, status, execute } = await useLazyAsyncData<IProductAll>('products', () => $fetch(`https://dummyjson.com/products`, {
  query: {
    limit: limit.value,
    select: 'title,price,category,discountPercentage,thumbnail'
  }
}))

const fetchProducts = async () => {
  if (data.value) {
    data.value?.total > data.value.products.length ? await execute() : hasMore.value = false
  }
}

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasMore.value) {
      page.value++
      fetchProducts()
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <div>
    <div v-if="data?.products" ref="root" class="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 justify-center">
      <ProductCard :products="data.products" />
      <ProductSkeleton v-if="status === 'pending'" v-for="n in 16" />
      <div ref="target" class="h-14"></div>
    </div>
  </div>
</template>