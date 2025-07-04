<script setup lang="ts">
/**
 * Layout with a top nav and Suspense for async content,
 * showing fallback loading while waiting.
 **/

import Nav from "../components/home/nav/index.vue";
import Loading from "~/components/common/Loading.vue";
</script>

<template>
  <!-- Render the navigation bar at the top -->
  <Nav />

  <!-- Suspense boundary to handle async content loading -->
  <Suspense>
    <!-- Default slot content to display once resolved -->
    <template #default>
      <main>
        <slot />
      </main>
    </template>

    <!-- Fallback UI while waiting for async content -->
    <template #fallback>
      <main>
        <Loading />
      </main>
    </template>
  </Suspense>
</template>
