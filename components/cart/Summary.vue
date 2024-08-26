<script setup lang="ts">
import type { ICartSum } from '~/types/cart';

const { state: cart } = useLocalState<ICartSum[]>('cart', [])

const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const totalPriceWithoutDiscount = computed(() => {
    return cart.value.reduce((total, item) => {
        const discount = item.product.discountPercentage || 0
        const discountedPrice = item.product.price
        const originalPrice = discountedPrice / (1 - discount / 100)
        return total + originalPrice * item.quantity
    }, 0)
})
</script>

<template>
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div class="space-y-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                <div class="space-y-4">
                    <div class="space-y-2">
                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original
                                price</dt>
                            <dd class="text-base font-medium text-gray-900 dark:text-white">${{
                                totalPriceWithoutDiscount.toFixed(2) }}</dd>
                        </dl>
                        <dl class="flex items-center justify-between gap-4">
                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd class="text-base font-medium text-green-600">-${{ (totalPriceWithoutDiscount
                                - totalPrice).toFixed(2) }}</dd>
                        </dl>
                    </div>
                    <dl
                        class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd class="text-base font-bold text-gray-900 dark:text-white">${{
                            totalPrice.toFixed(2) }}</dd>
                    </dl>
                </div>
                <UButton block label="Proceed to Checkout" size="lg" color="green" />
                <div class="flex items-center justify-center gap-2">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                    <UButton to="/" trailingIcon="i-material-symbols:arrow-right-alt" label="Continue Shopping"
                        variant="link" />
                </div>
            </div>
        </div>
</template>