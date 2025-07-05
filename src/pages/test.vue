<script setup lang="ts">

// This is to remove the root layout to prevent having 2 layouts
// And then add the new one with `NuxtLayout`
definePageMeta({
  layout: false,
});

</script>

<template>
  <NuxtLayout name="test"> I'm Here </NuxtLayout>
</template>
