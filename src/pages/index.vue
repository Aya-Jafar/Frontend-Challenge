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
import { computed } from "vue";
import Snackbar from "~/components/common/Snackbar.vue";
import Loading from "~/components/common/Loading.vue";
import useProdcutsStore from "~/stores/products/products";
import useBannersStore from "~/stores/products/banners";

/**
 * Lazy loaded components
 **/
const DefaultLayout = defineAsyncComponent(
  () => import("~/layout/DefaultLayout.vue")
);
const ProductsGrid = defineAsyncComponent(
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
 * Transforms raw API data into typed sections with prepared content and components.
 * @param section - The section to check.
 * @returns The prepared grid data or an empty array.
 */
const sections = computed((): Section[] | [] => {
  if (!Array.isArray(data.value)) return [];

  const sectionHandlers = { 
    products: {
      prepareContent: (content: unknown) => store.preparePrdoucts(content as Product[]),
      prepareProperties: (props: unknown) => store.preparePrdouctsProperties(props as ProductProperties),
      component: ProductsGrid,
    },
    grid: {
      prepareContent: (content: unknown) => bannerStore.prepareBanners(content as Banner[]),
      prepareProperties: (props: unknown) => bannerStore.prepareBannersProperties(props as BannerGridProperties),
      component: BannersGrid,
    },
    // Future sections can be added here
  };

  // Pre-process each section data with it's own prepare function
  return data?.value?.map((section: RawSection) => {
    const handler = sectionHandlers[section.type];
    return {
      type: section.type,
      content: handler.prepareContent(section.content),
      properties: handler.prepareProperties(section.properties || {}),
      component: handler.component,
    };
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
  Promise.all([DefaultLayout, ProductsGrid, BannersGrid]).then(() => {
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
                'min-h-[200px]': section.type === 'grid',
                'min-h-[600px]': section.type === 'products',
              }"
            >
              <component
                :is="section.component"
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
