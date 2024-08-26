<script setup lang="ts">

const props = defineProps({
    rating:{
        type:Number,
        required:true
    }
})

</script>

<template>
    <div class="text-sm text-yellow-500">
    <span v-for="(star, index) in 5" :key="index">
      {{ index < props.rating ? '★' : '☆' }}
    </span>
  </div>
</template>