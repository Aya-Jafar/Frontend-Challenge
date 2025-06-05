<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import WrapperComponent from "~/components/common/WrapperComponent.vue";
import { SSR_ENDPOINTS } from "~/utils/SSR-endpoint";
import { computed } from "vue";
import Snackbar from "~/components/common/Snackbar.vue";
import {
  preparePrdoucts,
  preparePrdouctsProperties,
} from "~/stores/products/products";
import {
  prepareBanners,
  prepareBannersProperties,
} from "~/stores/products/banners";
import {
  type Type,
  type Section,
  type ProductPropertiesDTO,
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
const { data, error, status } = useLazyFetch(SSR_ENDPOINTS.HOME);

const isProductSection = computed(() => {
  return (section: Type) => section === "products";
});

/**
 * Checks if the section type is a product section and prepares each section data seperatly.
 * @param section - The section to check.
 * @returns The prepared products data or an empty array if the section is not a product section.
 */
const sections = computed((): Section[] | [] => {
  if (!Array.isArray(data.value)) return [];

  // Pre-process each section data
  return data.value.map((section: any) => {
    if (isProductSection.value(section.type)) {
      return {
        type: section.type,
        content: preparePrdoucts(section?.content || []) as ProductDTO[],
        properties: preparePrdouctsProperties(
          section?.properties || {}
        ) as ProductPropertiesDTO,
      };
    } else {
      return {
        type: section.type,
        content: prepareBanners(section?.content || []) as BannerDTO[],
        properties: prepareBannersProperties(
          section?.properties || {}
        ) as BannerGridPropertiesDTO,
      };
    }
  });
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
          <template v-for="(section, index) in sections" :key="index">
            <Grid
              v-if="section.type === 'products'"
              :data="section.content"
              :proprties="section.properties"
            />
            <BannersGrid
              v-if="section.type === 'grid'"
              :data="section.content"
              :properties="section.properties"
            />
          </template>
        </div>
      </template>
    </WrapperComponent>
    <Snackbar />
  </DefaultLayout>
</template>
