<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import type { ProductDTO } from "../../../utils/types";
import BaseButton from "../../common/BaseButton.vue";
import useCard from "../../../stores/products/card";
import { useSnackbarStore } from "~/stores/snackbar";
import { useClickOutside } from "~/composables/useClickOutside";

const props = defineProps<{
  product: ProductDTO | null;
}>();

const modalRef = ref<HTMLElement | null>(null);
const { addToCard } = useCard();
const isLoading = ref(false);
const error = ref(null);
const { showSnackbar } = useSnackbarStore();

const emit = defineEmits(["close"]);
useClickOutside(modalRef, () => emit("close"));

// Handle add to cart
const handleAddToCart = () => {
  addToCard(props.product!);
  showSnackbar("Item added to card!", "success");
};
</script>
c
<template>
  <div
    class="fixed text-right inset-0 z-50 bg-black/50 flex items-center justify-center"
  >
    <div
      ref="modalRef"
      class="bg-white rounded-xl w-[500px] max-w-[90%] p-6 relative flex flex-col gap-4"
    >
      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 text-red-700 p-3 rounded">
        {{ error }}
      </div>

      <!-- Loading Indicator -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white/80 flex items-center justify-center"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- 🧠 Title + Close -->
      <div class="flex justify-between items-start">
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>
        <h2
          class="text-lg font-bold text-right flex-1 text-natural-secondary"
          v-if="product && product.title"
        >
          {{ product?.title }}
        </h2>
      </div>

      <!-- 🎨 Colors -->
      <span v-if="product?.colors" class="text-sm text-black">الالوان</span>

      <div v-if="product?.colors" class="flex gap-1 justify-end">
        <div
          v-for="(color, idx) in product.colors"
          :key="idx"
          class="w-6 h-6 rounded-full border border-gray-300"
          :style="{ backgroundColor: color }"
        ></div>
      </div>

      <!-- 🖼️ Image -->
      <div class="flex justify-end">
        <div
          class="w-1/2 h-48 bg-white border product-border-color rounded-lg overflow-hidden flex justify-end"
        >
          <img
            v-if="product?.imageURL"
            :src="product.imageURL"
            alt="product"
            class="object-contain max-h-full p-4"
          />
        </div>
      </div>

      <!-- 📦 Details -->
      <div v-if="product" class="text-right">
        <!-- Show any details here -->
      </div>

      <!-- 🔘 Bottom Buttons -->
      <div class="flex justify-between items-center mt-4">
        <!-- Left Side Buttons -->
        <div class="flex gap-2">
          <BaseButton variant="outline" color="primary"> الغاء </BaseButton>

          <BaseButton
            variant="solid"
            color="primary"
            class="px-5"
            @click="handleAddToCart"
          >
            اضافة الى السلة
          </BaseButton>
        </div>
        <!-- Right Side price -->
        <div
          class="rounded-[16px] px-6 py-2 text-sm font-semibold transition border border-[#E7E5E5] text-base-default"
        >
          {{ product?.currency }} {{ product?.price }}
        </div>
      </div>
    </div>
  </div>
</template>
