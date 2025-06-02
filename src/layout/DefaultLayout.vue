<script setup lang="ts">
import Nav from "../components/home/nav/index.vue";
</script>

<template>
  <Nav />

  <Suspense>
    <template #default>
      <main>
        <slot />
      </main>
    </template>

    <template #fallback>
      <main>
        <Loading />
      </main>
    </template>
  </Suspense>

</template>
