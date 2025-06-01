<script setup>
const { data } = await useFetch('/api/hello'); 
const message = computed(() => data?.value?.message ?? "Loading...");
</script>

<template>
  <div>
    HII
    <h1 class="text-red-900">{{ message }}</h1>
  </div>
</template>


