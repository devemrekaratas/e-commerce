<script setup lang="ts">
import type { ICategory } from '~/types/category';

useSeoMeta({
    title: 'Categories'
})

definePageMeta({
    auth:false
})

const { data: categories, status } = await useLazyFetch<ICategory[]>('https://dummyjson.com/products/categories')

</script>

<template>
    <div v-if="status === 'pending'" class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2  justify-center gap-4">
        <div v-for="n in 9" :key="n">
            <USkeleton class="block pb-[75%]" />
        </div>
    </div>
    <div v-else-if="status === 'success'" class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center gap-4">
        <ULink 
        :to="{ name:'categories-category', params: { category:category.slug }}" 
        v-for="category in categories" :key="category.slug" 
        class="group block">
            <div class="pb-[75%] relative overflow-hidden">
                <NuxtImg loading="lazy" class="group-hover:scale-105 duration-300 absolute w-full h-full object-cover"
                    :src="`https://dummyjson.com/image/600x300/f1f5f9?fontFamily=poppins&text=${String(category.name).replace(/ /g, '+')}`"
                    :alt="category.name" />
            </div>
        </ULink>
    </div>
</template>