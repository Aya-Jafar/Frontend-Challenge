<script setup lang="ts">
/**
 * Home Page Component
 * -------------------
 * Fetches and displays home page sections with lazy loading.
 * Uses async components for layout and grids, handling products and banners.
 * Shows loading, error, empty states via WrapperComponent.
 * Tracks online status and supports infinite scroll.
 **/

import { defineAsyncComponent } from "vue";
import WrapperComponent from "~/components/common/WrapperComponent.vue";
import { SSR_ENDPOINTS } from "~/utils/SSR-endpoint";
import { computed } from "vue";
import Snackbar from "~/components/common/Snackbar.vue";
import Loading from "~/components/common/Loading.vue";
import useProdcutsStore from "~/stores/products/products";
import useBannersStore from "~/stores/products/banners";
import {
  type Type,
  type Section,
  type RawSection,
  type BannerGridProperties,
} from "~/utils/types";

/**
 * Lazy loaded components
 **/
const DefaultLayout = defineAsyncComponent(
  () => import("~/layout/DefaultLayout.vue")
);
const Grid = defineAsyncComponent(
  () => import("~/components/home/products/ProductsGrid.vue")
);
const BannersGrid = defineAsyncComponent(
  () => import("~/components/home/products/BannersGrid.vue")
);
const { data, error, status } = await useFetch<RawSection[]>(
  SSR_ENDPOINTS.HOME
);
// Stores and composables
const store = useProdcutsStore();
const bannerStore = useBannersStore();
const { isOnline } = useOnline();
const isComponentsLoading = ref(true);

/**
 * Checks if the section type is a product section and prepares each section data seperatly.
 * @param section - The section to check.
 * @returns The prepared products data or an empty array if the section is not a product section.
 */
const sections = computed((): Section[] | [] => {
  if (!Array.isArray(data.value)) return [];

  const isProductSection = (type: Type): type is "products" =>
    type === "products";

  // Pre-process each section data
  return data.value.map((section: RawSection) => {
    if (isProductSection(section.type)) {
      return {
        type: section.type,
        content: store.preparePrdoucts(section?.content as Product[]),
        properties: store.preparePrdouctsProperties(
          section?.properties as ProductProperties
        ),
      };
    } else {
      return {
        type: section.type,
        content: bannerStore.prepareBanners(section?.content),
        properties: bannerStore.prepareBannersProperties(
          (section?.properties as BannerGridProperties) || {}
        ),
      };
    }
  });
});

// Lazy load the sections data
const {
  displayedData: lazySections,
  hasMore,
  isLoading: endLoading,
  endTracker,
} = useLazyScroll(sections, {
  initialCount: 2,
  increment: 2,
});

// After all async components are loaded
onMounted(() => {
  Promise.all([DefaultLayout, Grid, BannersGrid]).then(() => {
    isComponentsLoading.value = false;
  });
});

// Skeleton show conditions
const isLoadingState = computed(() => {
  return (
    status.value === "pending" ||
    status.value === "idle" ||
    isComponentsLoading.value
  );
});
</script>

<template>
  <!-- Default layout for nav and shared components  -->
  <DefaultLayout>
    <!-- Wrapper component to handle different states of data (loading,error, empty) -->
    <WrapperComponent
      :card-skeleton="true"
      :is-loading="isLoadingState"
      :is-pending="isLoadingState"
      :is-success="status === 'success' && !isComponentsLoading"
      :error="error ?? undefined"
      :is-online="isOnline ?? true"
      :is-empty="sections?.length === 0 && status !== 'pending' && isOnline"
    >
      <template #content>
        <div class="px-4 lg:px-10 max-w-screen-2xl mx-auto mb-5 mt-10">
          <!-- Each section is eaither of type "grid" or "products" -->
          <template v-for="(section, index) in lazySections" :key="index">
            <div
              :class="{
                'min-h-[300px]': section.type === 'grid',
                'min-h-[600px]': section.type === 'products',
              }"
            >
              <Grid
                v-if="section.type === 'products'"
                :data="section.content"
                :properties="section.properties"
              />
              <BannersGrid
                v-else-if="section.type === 'grid'"
                :data="section.content"
                :properties="section.properties"
              />
            </div>
          </template>
        </div>

        <div
          v-if="hasMore"
          ref="endTracker"
          class="h-1 w-full bg-transparent"
        ></div>

        <!-- Loading indicator -->
        <div v-if="endLoading" class="flex justify-center min-h-[100px]">
          <Loading />
        </div>

        <!-- No more content indicator -->
        <div
          v-if="!hasMore && lazySections.length > 0"
          class="py-8 text-gray-500 flex items-center justify-center !text-center"
        >
          You've reached the end 🙁
        </div>
      </template>
    </WrapperComponent>
    <Snackbar />
  </DefaultLayout>
</template>
