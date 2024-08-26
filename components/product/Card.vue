<script setup lang="ts">
import type { IProduct } from '~/types/product';

const props = defineProps<{
    products: IProduct[]
}>()

</script>

<template>
    <!-- @vue-expect-error -->
    <ULink v-for="product in props.products" :key="product.id" class="group"
        :to="{ name: 'categories-category-slug', params: { category: product.category, slug: slugify(product.title, product.id) } }">
        <article>
            <div class="relative overflow-hidden pb-[100%] bg-slate-100">
                <NuxtImg class="group-hover:scale-105 duration-300 absolute w-full h-full object-cover"
                    placeholder="/placeholder.webp" format="webp" loading="lazy" :src="product.thumbnail"
                    :alt="product.title" />
            </div>
            <div class="py-3 px-1.5 font-semibold">
                <div class="flex gap-x-1 text-sm">
                    <div class="text-black dark:text-white">{{ product.price }}$</div>
                    <div class="line-through text-gray-400">{{ Number(product.price / (1 -
                        (product.discountPercentage / 100))).toFixed(2) }}$</div>
                </div>
                <div>{{ product.title }}</div>
            </div>
        </article>
    </ULink>
</template>