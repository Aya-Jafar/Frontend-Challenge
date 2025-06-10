<script setup lang="ts">
/**
 * ProductModal component
 * ---------------------
 * Props:
 * - product: The selected product object or null.
 *
 * States:
 * - modalRef: Reference to the modal element for outside click detection.
 * - isLoading: Boolean for loading state (simulated delay).
 * - error: Holds error messages if any.
 *
 * Stores & Actions:
 * - useCardStore: Manage cart state (add/remove/check).
 * - useToggleActions: Creates toggle handlers with snackbar feedback.
 *
 * Features:
 * - Close modal on outside click.
 * - Add/remove product to/from cart with feedback.
 * - Show product details like title, colors, image, price.
 */

import { onMounted, ref } from "vue";
import BaseButton from "../../common/BaseButton.vue";
import useCardStore from "../../../stores/products/card";
import useToggleActions from "~/stores/products/actions";
import ProductModalSkeleton from "./ProductModalSkeleton.vue";

const props = defineProps<{
  product: ProductDTO | null;
}>();
// Model states
const modalRef = ref<HTMLElement | null>(null);
const { addToCard, isInCard, removeFromCard } = useCardStore();
const isLoading = ref(false);
const error = ref(null);

// Outside click handling
const emit = defineEmits(["close"]);
useClickOutside(modalRef, () => emit("close"));

// Handle add to card
const { createToggleHandler } = useToggleActions();

const toggleCard = createToggleHandler({
  checkFn: isInCard,
  addFn: addToCard,
  removeFn: removeFromCard,
  addMessage: "Item added to card!",
  removeMessage: "Item removed from card!",
});

onMounted(() => {
  isLoading.value = true;
  // Simualte delay
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
});
</script>

<template>
  <div
    class="fixed text-right inset-0 z-50 bg-black/50 flex items-center justify-center"
  >
    <ProductModalSkeleton v-if="isLoading" />

    <div
      v-else
      ref="modalRef"
      class="bg-white rounded-xl w-[500px] max-w-[90%] p-6 relative flex flex-col gap-4"
    >
      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded">
        {{ error }}
      </div>

      <!--  Title + Close -->
      <div class="flex justify-between items-end" v-else>
        <img
          src="/images/close.svg"
          alt="close"
          class="w-10 h-10 cursor-pointer"
          @click="$emit('close')"
          priority
        />
        <h2
          class="text-lg font-bold text-right flex-1 text-natural-secondary"
          v-if="product && product.title"
        >
          {{ product?.title }}
        </h2>
      </div>

      <!--  Colors -->
      <span v-if="product?.colors" class="text-sm text-black">الالوان</span>

      <div v-if="product?.colors" class="flex gap-1 justify-end">
        <div
          v-for="(color, idx) in product.colors"
          :key="idx"
          class="w-6 h-6 rounded-full border border-gray-300"
          :style="{ backgroundColor: color }"
        ></div>
      </div>

      <!--  Image -->
      <div class="flex justify-end">
        <div
          class="w-1/2 h-48 bg-white border product-border-color rounded-lg overflow-hidden flex justify-end"
        >
          <img
            v-if="product?.imageURL"
            :src="product.imageURL"
            alt="product"
            class="object-contain max-h-full p-4"
            priority
          />
        </div>
      </div>

      <!--  Details -->
      <div v-if="product" class="text-right">
        <!-- Show any details here -->
      </div>

      <!--  Bottom Buttons -->
      <div class="flex justify-between items-center mt-4">
        <!-- Left Side Buttons -->
        <div class="flex gap-2">
          <BaseButton variant="outline" color="primary" @click="emit('close')">
            الغاء
          </BaseButton>

          <BaseButton
            variant="solid"
            color="primary"
            class="px-5"
            @click="toggleCard(props.product!)"
          >
            {{ isInCard(product!.id) ? "حذف من السلة" : "اضافة الى السلة" }}
          </BaseButton>
        </div>
        <!-- Right Side price -->
        <div
          class="rounded-[12px] px-10 py-3 text-sm font-semibold transition border border-[#E7E5E5] text-base-default"
        >
          {{ product?.currency }} {{ product?.price }}
        </div>
      </div>
    </div>
  </div>
</template>
