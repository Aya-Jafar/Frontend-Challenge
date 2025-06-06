<template>
  <div
    class="bg-white custom-rounded w-[500px] max-w-[90%] p-6 relative flex flex-col gap-4"
  >
    <!-- Title skeleton + close -->
    <div class="flex justify-between items-end">
      <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    </div>

    <div
      class="h-10 custom-rounded bg-gray-200 animate-pulse w-100 self-end"
    ></div>

    <!-- Image Skeleton -->
    <div class="flex justify-end">
      <div class="w-1/2 h-48 bg-gray-200 custom-rounded animate-pulse"></div>
    </div>

    <!-- Details Placeholder -->
    <div
      class="h-10 w-30 bg-gray-200 custom-rounded animate-pulse self-end"
    ></div>

    <!-- Buttons + Price -->
    <div class="flex justify-between items-center mt-4">
      <div class="flex gap-2">
        <div class="w-24 h-10 bg-gray-200 custom-rounded animate-pulse"></div>
        <div class="w-32 h-10 bg-gray-200 custom-rounded animate-pulse"></div>
      </div>
      <div class="w-28 h-10 bg-gray-200 custom-rounded animate-pulse"></div>
    </div>
  </div>
</template>

<style scoped>
.custom-rounded {
  border-radius: 12px;
}
</style>
