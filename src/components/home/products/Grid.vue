<script setup lang="ts">
/**
 * ProductGrid Component
 * ---------------------
 * Displays a grid of products with lazy loading and modal preview.
 *
 * Props:
 * - data: ProductDTO[] — List of products to render.
 * - properties: ProductPropertiesDTO — Layout & style configuration for cards.
 *
 * Behavior:
 * - Opens ProductModal when a card is clicked.
 * - Lazy loads more products as you scroll.
 */

import ProductCard from "~/components/home/products/ProductCard.vue";
import ProductModal from "./ProductModal.vue";
import { ref } from "vue";
import type { ProductDTO, ProductPropertiesDTO } from "../../../utils/types";
import useLazyScroll from "~/composables/useLazyScroll";

const props = defineProps({
  data: {
    type: Array<ProductDTO>,
    default: () => [],
  },
  properties: {
    type: Object as () => ProductPropertiesDTO,
    default: () => ({}),
  },
});

// Data flow :
// Card clicked -> Open Product Modal -> `currentProduct` updated -> `ProductModal` opened with `currentProduct`

const isModalOpen: Ref<boolean> = ref(false);
const currentProduct: Ref<ProductDTO | null> = ref(null);

const openProductModal = (clickedProduct: ProductDTO) => {
  currentProduct.value = clickedProduct;
  isModalOpen.value = true;
};

// Lazy load nested content
const localProducts: Ref<ProductDTO[]> = ref(props.data);
const {
  displayedData: lazyProducts,
  hasMore,
  isLoading,
  endTracker,
} = useLazyScroll(localProducts, {
  initialCount: 20,
  increment: 10,
});
</script>

<template>
  <div class="px-2 sm:px-4 max-w-screen-xl mx-auto mb-5 mt-10">
    <!-- Products grid -->
    <div
      class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4"
    >
      <ProductCard
        v-for="product in lazyProducts"
        :key="String(product.id)"
        :product-data="product"
        @open-modal="openProductModal"
        :properties="properties"
        class="w-full"
      />
      <!-- Lazy loading tracker -->
      <div
        v-if="hasMore"
        ref="endTracker"
        class="h-1 w-full bg-transparent col-span-full"
      ></div>

      <!-- Loading indicator -->
      <div
        v-if="isLoading"
        class="flex justify-center min-h-[100px] col-span-full"
      >
        <Loading />
      </div>
    </div>
    <ProductModal
      v-if="isModalOpen"
      :product="currentProduct"
      @close="isModalOpen = false"
    />
  </div>
</template>
