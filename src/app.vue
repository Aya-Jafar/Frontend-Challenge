<!-- <script setup lang="ts">
import Home from "./pages/index.vue";
</script>

<template>
  <div>
    <Home />

    <NuxtRouteAnnouncer />
<NuxtWelcome /> 
  </div>
</template> -->

<!-- <script setup lang="ts">
import Home from "./pages/index.vue";
import DefaultLayout from "./layout/DefaultLayout.vue";
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>

          <template #fallback> Loading.... </template>
        </Suspense>
      </template>
    </RouterView>
    <NuxtRouteAnnouncer />
  </DefaultLayout>
</template>
<style></style> -->

<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <NuxtRouteAnnouncer />
  </NuxtLayout>
</template>

<style></style>
