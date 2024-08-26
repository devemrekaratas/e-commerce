<template>
    <div>
        <div class="md:hidden fixed bottom-0 left-0 z-50 w-full bg-white/75 backdrop-blur-md dark:bg-black">
            <div class="grid grid-cols-5 mx-auto max-w-lg py-1.5">
                
                <UButton to="/" activeClass="bg-black" icon="i-material-symbols:other-houses" :padded="false"
                        size="xl" color="black" variant="link" />
                    <span class="text-sm">Home</span>
                <UButtonGroup size="sm" orientation="vertical">
                    <UButton to="/categories" icon="i-material-symbols-category" :padded="false" size="xl" color="black"
                        variant="link" />
                    <span class="text-sm">Categories</span>
                </UButtonGroup>
                <div class="flex flex-col items-center">
                    <UButton to="/cart" icon="i-material-symbols:shopping-cart" :padded="false" size="xl" color="black"
                        variant="link" />
                    <span class="text-sm">Cart</span>
                </div>
                <div class="flex flex-col items-center">
                    <AppSearchButton />
                    <span class="text-sm">Search</span>
                </div>
                <div class="flex flex-col items-center">
                    <UButton to="/favorites" icon="i-material-symbols:favorite" :padded="false" size="xl" color="black"
                        variant="link" />
                    <span class="text-sm">Favorites</span>
                </div>
            </div>
        </div>
    </div>
</template>