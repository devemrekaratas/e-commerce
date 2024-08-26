<template>
    <div>
        <USkeleton class="h-full w-full pb-[100%]" :ui="{ rounded: 'rounded-2xl' }" />
        <div class="py-3 px-1.5">
            <div class="flex gap-x-1 mb-2.5">
                <USkeleton class="h-3 w-10" />
                <USkeleton class="h-3 w-10" />
            </div>
            <USkeleton class="h-4 w-full" />
        </div>
    </div>
</template>