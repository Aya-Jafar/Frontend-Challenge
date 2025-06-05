<script setup lang="ts">
import useWishListStore from "~/stores/products/wishlist";
import useCardStore from "../../../stores/products/card";
import type { ProductDTO, ProductPropertiesDTO } from "../../../utils/types";
import { useSnackbarStore } from "~/stores/snackbar";

const props = defineProps<{
  productData: ProductDTO;
  properties: ProductPropertiesDTO;
}>();

const emit = defineEmits<{
  (e: "open-modal", productData: ProductDTO): void;
}>();

const { addToCard } = useCardStore();
const { addToWishlist } = useWishListStore();
const { showSnackbar } = useSnackbarStore();


const handleAddToCard = () => {
  addToCard(props.productData!);
  showSnackbar("Item added to card!", "success");
};
const handleAddToWishList = () => {
  addToWishlist(props.productData!);
  showSnackbar("Item added to wishlist!", "success");
};
</script>

<template>
  <div
    @click="emit('open-modal', productData)"
    class="rtl cursor-pointer relative rounded-[8px] border border-gray-200 bg-base-default px-3 py-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
  >
    <!-- Heart Button -->
    <button
      v-if="properties.hasFavouriteBtn"
      @click.stop="handleAddToWishList"
      class="absolute cursor-pointer top-3 right-3 bg-white shadow-md rounded-[8px] p-2 flex items-center justify-center"
    >
      <img src="~/assets/images/heart-filled.png" class="w-6 h-6" alt="heart" />
    </button>

    <!--  Cart Button -->
    <button
      v-if="properties.hasCartBtn"
      @click.stop="handleAddToCard"
      class="absolute top-32 right-3 bg-white rounded-[8px] p-2 flex items-center justify-center shadow-sm"
    >
      <img src="~/assets/images/shop-cart.png" class="w-6 h-6" alt="cart" />
    </button>

    <!--  Rating Button -->
    <button
      v-if="properties.shouldShowRating"
      class="absolute top-35 left-3 bg-white rounded-[8px] p-1 flex items-center justify-center shadow-sm"
    >
      <span class="text-natural-secondary font-[600]"
        >{{ productData.rating }}[{{ productData.ratingCount }}]</span
      >
      <img src="~/assets/images/star.png" class="w-4 h-4" alt="star" />
    </button>

    <!--  Discount Button -->
    <button
      v-if="
        productData.topTag &&
        productData.topTagBgColor &&
        productData.topTagColor
      "
      class="absolute top-3 left-3 text-white shadow-md rounded-full px-1 flex items-center justify-center"
      :style="{
        backgroundColor: productData.topTagBgColor,
        color: productData.topTagColor,
      }"
    >
      <span>{{ productData.topTag }}</span>
    </button>

    <!-- Image -->
    <div
      :style="{ aspectRatio: properties.imageRatio || '1' }"
      class="flex justify-center items-center h-40 mb-2 bg-white rounded-[8px] overflow-hidden"
    >
      <img
        :src="productData.imageURL"
        alt="product"
        class="object-contain max-h-full p-4"
      />
    </div>

    <!--  Title -->
    <h2
      v-if="properties.shouldShowTitle"
      :class="[
        'text-[15px] leading-snug font-medium text-gray-800 mb-1 text-right',
        `line-clamp-${properties.titleLines || 2}`,
      ]"
    >
      {{ productData.title }}
    </h2>

    <!--  Price & currency -->
    <div class="text-right text-[#141414] !font-bold text-lg mb-1">
      {{ productData.currency }} {{ productData.price }}
    </div>

    <div class="flex justify-between items-end">
      <!-- Colors circles stack -->
      <div class="flex justify-between items-center">
        <div
          v-if="productData.colors && productData.colors.length > 0"
          class="flex flex-col items-center gap-1 shadow-sm py-1 px-0.5 rounded-full"
        >
          <div class="flex flex-col -space-y-2">
            <!-- 3 color circles -->
            <div
              v-for="color in productData.colors.slice(0, 3)"
              :style="{ backgroundColor: color }"
              class="w-5 h-5 rounded-full border border-white"
            ></div>

            <!--The rest of colors number is inside a white circle -->
            <div
              v-if="productData.colors.length > 3"
              class="w-5 h-5 rounded-full bg-white border border-white"
            >
              +{{ productData.colors.length - 3 }}
            </div>
          </div>
        </div>
      </div>

      <!-- Old price -->
      <div class="flex flex-col items-end">
        <div class="flex items-end flex-col justify-between mt-3">
          <div class="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <span
              class="font-bold text-natural-secondary line-through text-base-tertiary"
              v-if="productData.priceBeforeDiscount"
              >{{ productData.priceBeforeDiscount }}</span
            >
          </div>
        </div>

        <!--  Badge + seller -->
        <div class="flex items-end flex-col justify-between mt-1">
          <div
            class="flex items-center gap-1 text-sm mb-2 rounded-full px-2 py-0.5 font-semibold"
            v-if="
              productData.bottomTag &&
              productData.bottomTagBgColor &&
              productData.bottomTagColor
            "
            :style="{
              backgroundColor: productData.bottomTagBgColor,
              color: productData.bottomTagColor,
            }"
          >
            <span class="font-bold text-natural-secondary">{{
              productData.bottomTag
            }}</span>
            <img
              v-if="productData.bottomTagIcon"
              :src="productData.bottomTagIcon"
              class="w-5 h-5"
              alt="bag"
            />
          </div>
        </div>

        <div
          v-if="productData.merchant"
          :style="{
            backgroundColor: productData.merchantBgColor || '#000',
          }"
          class="flex items-center gap-1 bg-black text-white text-sm rounded-full px-2 py-0.5 font-semibold"
        >
          <span>{{ productData.merchant }}</span>
          <img src="~/assets/images/paper-bag.png" class="w-5 h-5" alt="bag" />
        </div>
      </div>
    </div>
  </div>
</template>
