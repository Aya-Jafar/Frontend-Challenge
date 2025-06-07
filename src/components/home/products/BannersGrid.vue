<script setup lang="ts">
/**
 * BannerGrid Component
 * --------------------
 * Displays banners in a grid with lazy loading.
 *
 * Props:
 * - data: BannerDTO[] — Array of banners to display.
 * - properties: BannerGridPropertiesDTO — Grid layout & styling config.
 *
 * Features:
 * - Lazy loads banners with configurable batch size.
 */

import type { BannerGridPropertiesDTO, BannerDTO } from "../../../utils/types";
import Loading from "~/components/common/Loading.vue";

const props = defineProps({
  data: {
    type: Array<BannerDTO>,
    default: () => [],
  },
  properties: {
    type: Object as () => BannerGridPropertiesDTO,
    default: () => ({
      cols: "1",
      rows: "1",
      ratio: "1",
      direction: "vertical",
      hasShadow: false,
      lineSpacing: "0",
      interitemSpacing: "0",
      leftRightMargins: "0",
      topBottomMargins: "0",
      outerLeftRightMargins: "16",
      outerTopBottomMargins: "8",
      innerLeftRightSpacing: "16",
      innerTopBottomSpacing: "8",
    }),
  },
});
// Lazy load nested content
const localBanners = ref<BannerDTO[]>(props.data);
const {
  displayedData: lazyBanners,
  hasMore,
  isLoading,
  endTracker,
} = useLazyScroll(localBanners, {
  initialCount: 2,
  increment: 2,
});
const aspectRatioStyle = computed(() => {
  const ratio = parseFloat(props.properties.ratio) || 1;
  return {
    aspectRatio: ratio.toString(),
  };
});
</script>

<template>
  <div
    :class="[
      'grid',
      `grid-cols-${Math.min(12, Math.max(1, parseInt(properties.cols) || 1))}`,
      `grid-rows-${properties.rows}`,
      `gap-x-[${properties.innerLeftRightSpacing}px]`,
      `gap-y-[${properties.innerTopBottomSpacing}px]`,
      `p-[${properties.outerTopBottomMargins}px_${properties.outerLeftRightMargins}px]`,
    ]"
  >
    <div
      v-for="item in lazyBanners"
      :key="item.id"
      :class="[
        'overflow-hidden rounded-lg  mb-5 mr-3',
        properties.hasShadow ? 'shadow-md' : '',
      ]"
      :style="aspectRatioStyle"
    >
      <img
        :src="item.imageURL"
        :alt="item.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div
      v-if="hasMore"
      ref="endTracker"
      class="h-1 w-full bg-transparent"
    ></div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center min-h-[100px]">
      <Loading />
    </div>
  </div>
</template>
