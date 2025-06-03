<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import WrapperComponent from "~/components/common/WrapperComponent.vue";

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
        <!-- TODO: Add all  WrapperComponent props -->
        <WrapperComponent :card-skeleton="true">
          <template #content>
            <div class="px-10 text-center">
              <Grid />
            </div>
          </template>
        </WrapperComponent>
      </DefaultLayout>
    </template>
  </Suspense>
</template>
