<script setup lang="ts">
import { ref } from "vue";
import type { BannerGridPropertiesDTO, BannerDTO } from "../../../utils/types";

const props = defineProps({
  data: {
    type: Array<BannerDTO>,
    default: () => [],
  },
  proprties: {
    type: Object as () => BannerGridPropertiesDTO,
    default: () => ({}),
  },
});
</script>

<template>
  <div
    :class="[
      'grid p-4',
      `grid-cols-${proprties.cols}`,
      `gap-x-[${proprties.interitemSpacing}px]`,
      `gap-y-[${proprties.lineSpacing}px]`,
      `p-[${proprties.topBottomMargins}px_${proprties.leftRightMargins}px]`,
    ]"
  >
    <div
      v-for="item in data"
      :key="item.id"
      :class="[
        'overflow-hidden rounded-lg  mb-5 mr-3',
        proprties.hasShadow ? 'shadow-md' : '',
        proprties.ratio === '2' ? 'aspect-[2/1]' : 'aspect-square',
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
