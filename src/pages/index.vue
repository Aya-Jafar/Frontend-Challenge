<script setup lang="ts">
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
  () => import("~/components/home/products/Grid.vue")
);
const BannersGrid = defineAsyncComponent(
  () => import("~/components/home/products/BannersGrid.vue")
);
const { data, error, status } = await useFetch<RawSection[]>(
  SSR_ENDPOINTS.HOME
);
const store = useProdcutsStore();
const bannerStore = useBannersStore();

const isProductSection = (type: Type): type is "products" =>
  type === "products";

/**
 * Checks if the section type is a product section and prepares each section data seperatly.
 * @param section - The section to check.
 * @returns The prepared products data or an empty array if the section is not a product section.
 */
const sections = computed((): Section[] | [] => {
  if (!Array.isArray(data.value)) return [];

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

const {
  displayedData: lazySections,
  hasMore,
  isLoading,
  reachedEnd,
} = useLazyScroll(sections, {
  initialCount: 2,
  increment: 1,
});
</script>

<template>
  <!-- Default layout for nav and shared components  -->
  <DefaultLayout>
    <!-- Wrapper component to handle different states of data (loading,error, empty) -->

    <!-- TODO: Add all  WrapperComponent props later -->
    <WrapperComponent
      :card-skeleton="true"
      :isLoading="status === 'pending' || status === 'idle'"
      :is-pending="status === 'pending' || status === 'idle'"
      :error="error ?? undefined"
      :is-empty="sections?.length === 0 && status !== 'pending'"
    >
      <template #content>
        <div class="px-10 text-center">
          <!-- Each section is eaither of type "grid" or "products" -->
          <template v-for="(section, index) in lazySections" :key="index">
            <Grid
              v-if="section.type === 'products'"
              :data="section.content"
              :properties="section.properties"
            />
            <BannersGrid
              v-if="section.type === 'grid'"
              :data="section.content"
              :properties="section.properties"
            />
          </template>
        </div>

        <div
          v-if="hasMore"
          ref="reachedEnd"
          class="h-1 w-full bg-transparent"
        ></div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-center min-h-[100px]">
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
