<template>
    <div>
        <div class="flex items-center justify-center mt-10">
            <div class="w-full max-w-2xl text-center py-6 rounded-lg">
                <NuxtImg src="/empty.webp" class="w-full h-full" />
                <div class="font-medium lg:text-2xl text-xl mb-4">Your shopping cart is empty.</div>
                <UButton to="/" label="Lets go shopping" size="lg" />
            </div>
        </div>
    </div>
</template>