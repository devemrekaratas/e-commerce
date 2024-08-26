<script setup lang="ts">

const { state: cart, loading } = useLocalState<[]>('cart', [])
const toast = useToast()
const colorMode = useColorMode()
const { signOut, status, data } = useAuth()
const isOpen = ref(false)

const items = [
    [
        {
            label: 'Sign out',
            icon: 'i-material-symbols:logout',
            click: () => {
                toast.add({
                    id: 'logged_out',
                    title: `Succesfully logged out`,
                    icon: 'i-material-symbols:check-box-sharp',
                    timeout: 2000,
                })
                signOut({ redirect: false })
            }
        }
    ]
]

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>

<template>
    <header
        class="sticky md:top-0 flex items-center w-full  z-40 bg-white/75 dark:bg-black/75 backdrop-blur-sm dark:backdrop-blur-lg">
        <UContainer class="flex py-4 h-20 justify-between items-center w-full">
            <AppLogo />
            <div class="md:flex hidden gap-x-2">
                <ULink to="/categories" class="font-medium p-2"
                    active-class="bg-black dark:bg-white dark:text-black text-white"
                    inactive-class="dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    Categories
                </ULink>
                <ULink to="/favorites" class="font-medium p-2"
                    active-class="bg-black dark:bg-white dark:text-black text-white"
                    inactive-class="hover:text-gray-700 dark:hover:text-gray-200">
                    Favorites
                </ULink>
            </div>
            <div class="flex items-center gap-x-2.5">
                <!--Dark Mode -->
                <ClientOnly>
                    <UButton size="xl" :icon="isDark ? 'i-material-symbols:dark-mode' : 'i-material-symbols:light-mode'"
                        color="black" variant="link" :padded="false" aria-label="Theme" @click="isDark = !isDark" />
                </ClientOnly>
                <!-- Search -->
                <AppSearchButton />
                <!-- Cart -->
                <UChip :show="!loading" :text="cart?.length" size="lg">
                    <UButton to="/cart" size="xl" variant="link" aria-label="Cart" :padded="false" color="black"
                        icon="i-material-symbols:shopping-cart-outline" />
                </UChip>
                <!-- User -->
                <UButton class="md:flex hidden" v-if="status === 'unauthenticated'" to="/auth/login" size="xl"
                    variant="link" :padded="false" color="black" icon="i-material-symbols:person" aria-label="Login" />
                <UDropdown v-else :items="items" mode="click" class="md:block hidden"
                    :popper="{ placement: 'bottom-start' }">
                    <UAvatar :alt="data?.user?.name!" size="sm" />
                    <template #item="{ item }">
                        <span class="truncate font-semibold">{{ item.label }}</span>
                        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto font-semibold" />
                    </template>
                </UDropdown>
                <!-- Menu-->
                <UButton @click="isOpen = true" class="md:hidden flex" size="xl" variant="link" :padded="false"
                    color="black" icon="i-material-symbols:menu" aria-label="Menu" />
                <USlideover class="md:hidden" v-model="isOpen">
                    <div class="p-4 flex-1">
                        <div class="flex items-center justify-between h-12">
                            <AppLogo />
                            <UButton :padded="false" color="black" variant="ghost" size="xl"
                                icon="i-material-symbols:close" class="md:hidden" square @click="isOpen = false" />
                        </div>
                        <div class="flex flex-col mt-4 gap-2 uppercase">
                            <UDivider />
                            <ULink @click="isOpen = false" to="/categories" class="block font-medium p-2"
                                active-class="bg-black dark:bg-white dark:text-black text-white"
                                inactive-class="dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                Categories
                            </ULink>
                            <UDivider />
                            <ULink @click="isOpen = false" to="/favorites" class="block font-medium p-2"
                                active-class="bg-black dark:bg-white dark:text-black text-white"
                                inactive-class="hover:text-gray-700 dark:hover:text-gray-200">
                                Favorites
                            </ULink>
                            <UDivider />
                            <ULink v-if="status === 'unauthenticated'" @click="isOpen = false" to="/auth/login"
                                class="block font-medium p-2"
                                active-class="bg-black dark:bg-white dark:text-black text-white"
                                inactive-class="hover:text-gray-700 dark:hover:text-gray-200">
                                Login
                            </ULink>
                            <UButton v-else @click="signOut({redirect: false})" label="LOGOUT" size="xl" color="primary" />
                        </div>
                    </div>
                </USlideover>
            </div>
        </UContainer>
    </header>
</template>