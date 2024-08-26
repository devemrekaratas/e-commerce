<script setup lang="ts">
import type { IProductAll } from '~/types/product';

definePageMeta({
    auth: false
})

const route = useRoute()
const router = useRouter()
const page = ref(1)
const options = [
    {
        label: 'Recomended',
    },
    {
        label: 'Price: Low to High',
        sortBy: 'price',
        order: 'asc'
    },
    {
        label: 'Price: High to Low',
        sortBy: 'price',
        order: 'desc'
    }
]
const selected = ref<any>('Recomended')

const skip = computed(() => { return (page.value - 1) * 5 })

const query = reactive({
    limit: 5,
    skip,
    select: 'title,price,category,discountPercentage,thumbnail'
})

const params = computed(() => {
    if (selected.value.label === 'Recomended') {
        return {}
    }
    return {
        sortBy: selected.value.sortBy,
        order: selected.value.order,
    }
})

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
}]

const { data: productAll } = await useFetch<IProductAll>(`https://dummyjson.com/products/category/${route.params.category}`, {
    query,
    params,
    
    immediate: false
})

useSeoMeta({
    title: formatCategoryText(route.params.category as string),
})

watch([selected], () => {
    if (selected.value.label === 'Recomended') {
        router.replace({ query: {} });
    } else {
        router.replace({
            query: {
                sortBy: selected.value.sortBy,
                order: selected.value.order,
            },
        })
    }
})

watch(() => route.query, (newQuery) => {
    const { sortBy, order } = newQuery
    if (sortBy && order) {
        const option = options.find(
            (opt) => opt.sortBy === sortBy && opt.order === order
        )
        if (option) {
            selected.value = option;
        }
    } else {
        selected.value = options[0]
    }
}, { immediate: true })
</script>

<template>
    <div>
        <div v-if="productAll?.products">
            <div class="flex items-center justify-between pt-1.5 pb-4">
                <!-- Breadcrumb  -->
                <UBreadcrumb class="font-semibold" :links="links" />
                <!-- Breadcrumb  -->

                <!-- Sort By -->
                <USelectMenu color="primary" class="w-44" size="sm" selected-icon="i-material-symbols:check" v-model="selected"
                    :options="options" option-attribute="label" />
                <!-- Sort By-->
            </div>

            <!-- Products -->
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 justify-center" v-auto-animate>
                <ProductCard :products="productAll.products" />
            </div>
            <!-- Products -->

            <!-- Pagination -->
            <UPagination v-model="page" :page-count="5" :total="productAll?.total!" class="my-4 justify-center" />
            <!-- Pagination -->
        </div>
    </div>
</template>