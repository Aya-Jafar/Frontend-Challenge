<template>
  <div class="p-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ProductCard v-for="n in 12" :key="n" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/home/ProductCard.vue'
</script>
