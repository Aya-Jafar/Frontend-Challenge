<script setup lang="ts">
import ProductCard from "~/components/home/products/ProductCard.vue";
import ProductModal from "./ProductModal.vue";
import { ref, onMounted, watch } from "vue";
import type { ProductDTO, ProductPropertiesDTO } from "../../../utils/types";

const props = defineProps({
  data: {
    type: Array<ProductDTO>,
    default: () => [],
  },
  proprties: {
    type: Object as () => ProductPropertiesDTO,
    default: () => ({}),
  },
});

// Data flow :
// Card clicked -> toggleProductModal -> currentProductId updated -> ProductModal opened with currentProductId

const isModalOpen: Ref<boolean> = ref(false);
const currentProduct: Ref<ProductDTO | null> = ref(null);

const openProductModal = (clickedProduct: ProductDTO) => {
  currentProduct.value = clickedProduct;
  isModalOpen.value = true;
};
</script>

<template>
  <div class="p-4 max-w-screen-xl mx-auto">
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <ProductCard
        v-for="product in data"
        :key="String(product.id)"
        :product-data="product"
        @open-modal="openProductModal"
        :properties="proprties"
      />
    </div>
    <ProductModal
      v-if="isModalOpen"
      :product="currentProduct"
      @close="isModalOpen = false"
    />
  </div>
</template>
