<script setup lang="ts">
import type { ICartSum } from '~/types/cart';
import type { IProduct } from '~/types/product';

const { state: cart } = useLocalState<ICartSum[]>('cart', [])
const { state: favorites } = useLocalState<IProduct[]>('favorites', [])
const toast = useToast()
const qty = ref(1)
const loading = ref(false)
const favoriteIcon = ref('i-material-symbols:favorite-outline-rounded')

interface Props {
    product: IProduct
}

const props = defineProps<Props>()

const incQty = () => {
    if (qty.value < props.product.stock) {
        qty.value++
    } else {
        toast.add({
            id: 'cart_stock',
            title: `You can add up to ${props.product.stock} items to your cart.`,
            icon: 'i-material-symbols:warning',
            timeout: 2000,
        })
    }
}

const decQty = () => {
    if (qty.value !== 1) qty.value--
}

const addItem = (product: ICartSum) => {
    loading.value = true
    const newItem = { quantity: qty.value, product: props.product }
    const existingItem = cart.value.find(item => item.product.id === newItem.product.id)

    if (existingItem) {
        existingItem.quantity += newItem.quantity
    } else {
        cart.value.push(newItem)
    }
    setTimeout(() => {
        toast.add({
            id: 'cart_added',
            title: `Product added to your cart`,
            icon: 'i-material-symbols:check-box-sharp',
            timeout: 2000,
        })
        loading.value = false;
    }, 500)
}

const toggleFavorite = () => {
    addFavorite(props.product, favorites)
}

watchEffect(() => {
    if (favorites.value) {
        const isFavorite = favorites.value.some(item => item.id === props.product.id)
        favoriteIcon.value = isFavorite ? 'i-material-symbols:favorite' : 'i-material-symbols:favorite-outline';
    }
})
</script>

<template>
    <div>
        <div class="flex sm:flex-row flex-col gap-2">
            <UButtonGroup size="xl" orientation="horizontal">
                <UButton @click="decQty" icon="i-material-symbols:remove" color="black" variant="solid" />
                <UInput :ui="{ base: 'w-16 text-center font-semibold text-lg' }" variant="none" color="white" disabled
                    v-model="qty" />
                <UButton @click="incQty" icon="i-material-symbols:add" color="black" variant="solid" />
            </UButtonGroup>
            <div class="flex flex-1 gap-x-2">
                <UButton @click="addItem" class="flex-1" :loading="loading" icon="i-material-symbols:add" size="xl"
                    color="black" variant="solid" label="ADD TO CART" />
                <UButton @click="toggleFavorite()" :ui="{ rounded: 'rounded-full' }" :icon="favoriteIcon" size="xl"
                    color="red" variant="solid" />
            </div>
        </div>
    </div>
</template>