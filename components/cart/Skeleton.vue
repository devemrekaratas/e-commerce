<template>
    <div class="antialiased">
        <div class="mx-auto max-w-screen-xl">
            <div class="md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div class="space-y-6">
                        <div v-for="s in 5" :key="s" class="rounded-lg p-4 shadow-sm md:p-6">
                            <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                <USkeleton as="div" class="h-20 w-20" />
                                <div class="flex gap-x-2 items-center justify-between md:order-3 md:justify-end">
                                    <div class="flex gap-x-1">
                                        <USkeleton class="h-4 w-5" />
                                        <USkeleton class="h-4 w-5" />
                                        <USkeleton class="h-4 w-5" />
                                    </div>
                                    <div class="text-end md:order-4 md:w-32">
                                        <USkeleton class="h-4 w-10" />
                                    </div>
                                </div>
                                <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                    <USkeleton class="h-4 w-full" />
                                    <div>
                                        <USkeleton class="h-4 w-12" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div class="space-y-4 rounded-lg p-4 shadow-sm sm:p-6">
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-4 w-full" />
                        <USkeleton class="h-8 w-full" />
                        <USkeleton class="h-8 w-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>