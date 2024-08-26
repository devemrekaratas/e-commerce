<script setup lang="ts">
import type { IProduct } from '~/types/product';

definePageMeta({
  auth: false
})

const route = useRoute()
const slug: string = String(route.params.slug)
const id: number = getIdFromSlug(slug)

const { data: product } = await useFetch<IProduct>(`https://dummyjson.com/products/${id}`)

const links = [{
  label: 'Home',
  to: '/'
},
{
  label: 'Categories',
  to: `/categories`
},
{
  label: formatCategoryText(route.params.category as string),
  to: `/categories/${route.params.category}`
},
{
  label: product.value?.title as string,
}]

useSeoMeta({
  title: product.value?.title,
  description: product.value?.description,
  ogImage: product.value?.thumbnail
})

</script>

<template>
  <div v-if="product">

    <!-- Breadcrumb  -->
    <UBreadcrumb class="mb-6" :links="links" />
    <!-- Breadcrumb  -->

    <div class="flex flex-col lg:flex-row gap-5">

      <!-- Slider  -->
      <ProductSlider :title="product.title" :images="product.images" />
      <!-- Slider  -->
      <div>
        <div class="flex gap-x-2 mb-2">
          <UBadge v-for="tag in product?.tags" color="red" variant="outline">{{ tag }}</UBadge>
        </div>
        <h2 class="lg:text-3xl text-lg font-semibold mb-1">{{ product?.title }}</h2>
        <div class="font-semibold">
          <span class="text-2xl me-2">{{ product?.price }}$</span>
          <span class="text-lg line-through text-gray-500">
            {{ Number(product?.price / (1 - (product?.discountPercentage / 100))).toFixed(2) }}$
          </span>
        </div>
        <UDivider class="my-4" />
        <div class="text-gray-500 text-lg mb-4">{{ product?.description }}</div>
        <UDivider class="my-4" />
        <ProductAddCart :product="product" />
        <UDivider class="my-4" />
        <div>
          <div class="text-lg font-medium mb-2">Featured Details</div>
          <ul class="list-disc list-inside">
            <li>{{ product.shippingInformation }}</li>
            <li>{{ product.returnPolicy }}</li>
            <li>{{ product.warrantyInformation }}</li>
          </ul>
        </div>
      </div>
    </div>
    <UDivider class="py-8" :label="`Reviews (${product?.reviews.length})`" />
    <div class="max-w-sm">
      <!--Comments-->
      <div v-for="review in product?.reviews">
        <div class="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-100">
          <UAvatar :alt="review.reviewerName" size="md" />
          <div class="flex gap-x-2 items-center">
            <Rating :rating="review.rating" />
            <!-- @vue-skip -->
            <time>{{$dayjs(review.date).utc().format('DD MMM YYYY')}}</time>
          </div>
          <div>
            {{ review.comment }}
          </div>
        </div>
        <UDivider class="text-xl font-semibold py-3" />
      </div>
    </div>
  </div>
</template>