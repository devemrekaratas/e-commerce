<script setup lang="ts">
import type { ICartSum } from '~/types/cart';

definePageMeta({
    auth: false,
    name: 'Shopping Cart'
})

useSeoMeta({
    title: 'Cart'
})

const toast = useToast()
const { state: cart, loading } = useLocalState<ICartSum[]>('cart', [])

const incQty = (id: number) => {
    cart.value = cart.value.map((item: ICartSum) => {
        if (item.product.id === id) {
            if (item.quantity < item.product.stock) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                toast.add({
                    id: 'cart_stock',
                    title: `You can add up to ${item.product.stock} items to your cart.`,
                    icon: 'i-material-symbols:warning',
                    timeout: 2000,
                })
            }
        }
        return item
    })
}

const decQty = (id: number) => {
    cart.value = cart.value.map((item: ICartSum) => {
        if (item.product.id === id) {
            if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 }
            }
        }
        return item
    })
}

const remove = (id: any) => {
    cart.value = cart.value.filter((item: ICartSum) => item.product.id !== id)
}
</script>

<template>
    <div v-if="loading">
        <CartSkeleton />
    </div>
    <div v-else>
        <div v-if="cart.length !== 0" class="antialiased">
            <div class="mx-auto max-w-screen-xl">
                <div class="md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div class="space-y-6">
                            <div v-for="item in cart" :key="item.product.id"
                                class="border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <!-- @vue-expect-error -->
                                    <NuxtLink
                                        :to="{ name: 'categories-category-slug', params: { category: item.product.category, slug: slugify(item.product.title, item.product.id) } }">
                                        <NuxtImg class="w-20 h-20 object-cover" :src="item.product.thumbnail" />
                                    </NuxtLink>
                                    <label for="counter-input" class="sr-only">Choose quantity:</label>
                                    <div class="flex items-center justify-between md:order-3 md:justify-end">
                                        <div class="flex">
                                            <UButton @click="decQty(item.product.id)" size="xs"
                                                icon="i-material-symbols:remove" color="black" variant="solid" />
                                            <UInput v-model="item.quantity" :value="item.quantity" variant="none"
                                                :ui="{ base: 'font-bold w-12 text-center' }" disabled />
                                            <UButton @click="incQty(item.product.id)" size="xs"
                                                icon="i-material-symbols:add" color="black" variant="solid" />
                                        </div>
                                        <div class="text-end md:order-4 md:w-32">
                                            <p class="text-base font-bold text-gray-900 dark:text-white">${{
                                                (item.product.price * item.quantity).toFixed(2) }}</p>
                                        </div>
                                    </div>
                                    <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <!-- @vue-expect-error -->
                                        <ULink
                                            :to="{ name: 'categories-category-slug', params: { category: item.product.category, slug: slugify(item.product.title, item.product.id) } }"
                                            active-class="text-primary"
                                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                            {{ item.product.title }}
                                        </ULink>
                                        <div>
                                            <UButton @click="remove(item.product.id)" icon="i-material-symbols:close"
                                                size="xs" color="red" variant="solid" label="Remove"
                                                :trailing="false" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CartSummary />
                </div>
            </div>
        </div>
        <div v-else>
            <CartEmpty />
        </div>
    </div>
</template>