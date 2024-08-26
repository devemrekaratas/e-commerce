<script setup lang="ts">

const props = defineProps<{
    title: string,
    images: string[]
}>()

const thumbsSwiper = ref(null)
const modules = [SwiperThumbs, SwiperNavigation]

const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper
}
</script>

<template>
    <div class="flex flex-col lg:flex-row">
        <div v-if="props.images.length > 1" class="mr-6 mt-5 pt-2.5 max-xl:hidden">
            <Swiper class="thumbs-slider w-14" @swiper="setThumbsSwiper" :modules="modules">
                <SwiperSlide
                    class="h-full w-full border-2 border-white bg-slate-100 dark:border-black"
                    v-for="(img, index) in props.images" :key="index">
                    <NuxtImg :src="img" :alt="`${props.title}_${index + 1}`" class="h-[52px] object-contain w-full" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="select-none">
            <Swiper :style="{
                '--swiper-navigation-size': '16px',
                '--swiper-navigation-color': '#000',
            }" :thumbs="{ swiper: thumbsSwiper }" :lazy="true" :modules="modules" :slides-per-view="1"
                :navigation="true" class="lg:w-[530px] lg:h-[530px] xl:w-[600px] xl:h-[600px]">
                <SwiperSlide class="h-full w-full bg-slate-100" v-for="img in props.images">
                    <NuxtImg class="h-full w-full bg-slate-100 object-contain" :src="img" loading="lazy" />
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<style>
.thumbs-slider .swiper-wrapper {
    @apply flex-col gap-3;
}

.thumbs-slider .swiper-slide-thumb-active {
    @apply border-black dark:border-white;
}

.swiper-button-next,
.swiper-button-prev {
    @apply bg-white/50 hover:bg-white p-6 flex items-center justify-center shadow transition backdrop-blur-sm;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
    @apply hidden;
}
</style>