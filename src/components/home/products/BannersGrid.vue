<script setup lang="ts">
import { ref } from "vue";
import type { BannerGridPropertiesDTO, BannerDTO } from "../../../utils/types";

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
</script>

<template>
  <div
    :class="[
      'grid p-4',
      `grid-cols-${properties.cols}`,
      `grid-rows-${properties.rows}`,
      `gap-x-[${properties.interitemSpacing}px]`,
      `gap-y-[${properties.lineSpacing}px]`,
      `p-[${properties.topBottomMargins}px_${properties.leftRightMargins}px]`,
    ]"
  >
    <div
      v-for="item in data"
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
      />
    </div>
  </div>
</template>
