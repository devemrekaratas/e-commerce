<script setup lang="ts">
import type { IProductAll } from '~/types/product';

const isOpen = ref(false)
const selected = ref()
const groups = [{
    key: 'products',
    label: (q: any) => q && `Products matching “${q}”...`,
    search: async (q: any) => {
        if (!q) {
            return []
        }
        const data: IProductAll = await $fetch('https://dummyjson.com/products/search', { params: { q } })

        return data.products.map(product => ({ id: product.id, label: product.title, suffix: product.category }))
    }
}]

defineShortcuts({
    meta_k: {
        usingInput: true,
        handler: () => {
            isOpen.value = !isOpen.value
        },
    },
})

watch(selected, (value: any) => {
    navigateTo(`/categories/${value.suffix}/${value.id}`)
    isOpen.value = false
})
</script>

<template>
    <UTooltip text="Search" :shortcuts="['⌘', 'O']">
        <UButton size="xl" variant="link" :padded="false" aria-label="Search" color="black"
            icon="i-material-symbols:search" @click="isOpen = true" />
    </UTooltip>
    <!-- Search Modal -->
    <UModal v-model="isOpen">
        <UCommandPalette v-model="selected" :groups="groups" :autoselect="false"
            :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }">
        </UCommandPalette>
    </UModal>
</template>