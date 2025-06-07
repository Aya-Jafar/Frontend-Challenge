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
    default: () => ({}),
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
</script>

<template>
  <div
    :class="[
      'grid',
      `grid-cols-${properties.cols}`,
      `grid-rows-${properties.rows}`,
      `gap-x-[${properties.interitemSpacing}px]`,
      `gap-y-[${properties.lineSpacing}px]`,
      `p-[${properties.topBottomMargins}px_${properties.leftRightMargins}px]`,
    ]"
  >
    <div
      v-for="item in lazyBanners"
      :key="item.id"
      :class="[
        'overflow-hidden rounded-lg  mb-5 mr-3',
        properties.hasShadow ? 'shadow-md' : '',
        properties.ratio === '2' ? 'aspect-[2/1]' : '',
      ]"
    >
      <img
        :src="item.imageURL"
        :alt="item.title"
        class="w-full h-full object-cover"
        priority
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
