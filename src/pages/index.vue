<script setup lang="ts">
import { defineAsyncComponent } from "vue";

// Lazy loaded components
const DefaultLayout = defineAsyncComponent(
  () => import("~/layout/DefaultLayout.vue")
);
const Grid = defineAsyncComponent(() => import("~/components/home/Grid.vue"));
</script>

<template>
  <Suspense>
    <template #default>
      <DefaultLayout>
        <div class="p-10 text-center">
          <Grid />
        </div>
      </DefaultLayout>
    </template>
  </Suspense>
</template>
