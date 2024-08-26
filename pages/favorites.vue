<script setup lang="ts">
import type { IProduct } from '~/types/product';

useSeoMeta({
    title: 'Favorites'
})

definePageMeta({
    auth:false
})

const {state:favorites} = useLocalState<IProduct[]>('favorites', [])

const removeFavorite = (id: number) => {
    favorites.value = favorites.value.filter(product => product.id !== id);
};

</script>

<template>
    <div v-if="favorites.length == 0">
        <div class="max-w-xl mx-auto mt-20">
            <div class="mx-auto h-20 w-20 mb-5 bg-slate-200 flex items-center justify-center shadow-xl">
                <UIcon name="i-line-md:heart-twotone" class="w-10 h-10 text-red-500" />
            </div>
            <div class="text-center">
                <div class="text-2xl font-semibold mb-4">Your list is currently empty.</div>
                <div class="text-gray-500">
                    To add products to your list, please click the heart icon on the product detail pages to add them to
                    your Favorites.
                </div>
            </div>
        </div>
    </div>
    <div v-else class="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 m-auto gap-4">
        <div v-for="product in favorites" :key="product.id"
            class="w-full relative select-none">
            <div class="relative overflow-hidden pb-[125%]">
                <NuxtImg class="group-hover:scale-105 duration-300 absolute w-full h-full object-cover bg-slate-200"
                    placeholder="/placeholder.webp" format="webp" loading="lazy" :src="product.thumbnail"
                    :alt="product.title" />
                    <!-- @vue-expect-error -->
                <ULink
                    :to="{ name: 'categories-category-slug', params: { category: product.category, slug: slugify(product.title, product.id) } }"
                    class="absolute inset-0 bg-gradient-to-t from-black/50 hover:from-black/60 flex items-end p-5">
                    <div class="grid gap-0.5 text-white">
                        <div class="flex gap-2 text-sm"><span>${{ product.price }}</span>
                            <span class="line-through text-white/50">${{ Number(product.price / (1 -
                                (product.discountPercentage / 100))).toFixed(2) }}</span>
                        </div>
                        
                        <div class="font-bold">{{ product.title }}</div>
                        <!-- @vue-skip -->
                        <div class="text-sm font-medium">{{ formatCategoryText(product.category) }}</div>
                    </div>
                </ULink>
                
            </div>
            <button @click="removeFavorite(product.id)" class="absolute top-5 right-5 group" title="Remove Product">
                <div class="w-12 h-12 rounded-full flex justify-center items-center bg-slate-200 shadow-md">
                    <UIcon name="i-material-symbols:favorite"
                        class="w-6 h-6 text-red-600 group-hover:text-white transition" />
                </div>
            </button>
        </div>
    </div>
</template>