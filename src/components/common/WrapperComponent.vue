<script setup>
/**
 * This component is a wrapper that handles various states such as loading, network error, server error, and empty data.
 * It leverages Vuetify's theme and dynamic imports for different states' illustrations.
 * Props are used to manage the states and slots provide flexibility for custom UI components.
 */
const props = defineProps({
  error: Object,
  isLoading: Boolean,
  isPending: Boolean,
  isError: Boolean,
  isSuccess: Boolean,
  isRefetching: Boolean,
  isRefetchError: Boolean,
  isEmpty: Boolean,
  data: Array,
  cardSkeleton: [String, Boolean],
  skeletonHeight: [String, Number],
  spinnerSize: [String, Number],
});
</script>

<template>
  <div class="w-full h-full">
    <!-- 🌀 Loading State -->
    <slot name="loading" v-if="props.isLoading">
      <div
        v-if="props.cardSkeleton"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 max-w-screen-xl mx-auto"
      >
        <div
          v-for="n in 12"
          :key="n"
          class="animate-pulse rounded-[8px] border border-gray-200 bg-white p-4 flex flex-col gap-4"
        >
          <div class="w-full h-40 bg-[#D9D9D9] rounded"></div>
          <div class="h-4 bg-[#D9D9D9] rounded w-3/4"></div>
          <div class="h-4 bg-[#D9D9D9] rounded w-2/4"></div>
          <div class="h-5 bg-[#E0E0E0] rounded w-1/3 mt-auto"></div>
        </div>
      </div>

      <div v-else class="flex justify-center items-center h-32">
        <div
          class="border-4 border-primary border-t-transparent rounded-full w-10 h-10 animate-spin"
        ></div>
      </div>
    </slot>

    <!-- 🌐 Network Error -->
    <slot name="networkError" v-else-if="props.error && !props.error.response">
      <div
        class="flex flex-col justify-center items-center w-full h-full text-center"
      >
        <img
          src="~/assets/images/network-error-state-light.svg"
          class="w-[22rem]"
          alt="Network Error"
        />
        <h1 class="mt-6 font-semibold text-lg">No internet</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Check your internet.
        </p>
      </div>
    </slot>

    <!-- 💥 Server Error -->
    <slot name="serverError" v-else-if="props.error && props.error.response">
      <div
        class="flex flex-col justify-center items-center w-full h-full text-center"
      >
        <img
          src="~/assets/images/server-error-state-light.svg"
          class="w-[22rem]"
          alt="Server Error"
        />
        <h1 class="mt-6 font-semibold text-lg">Something went wrong</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Error Occured On our end
        </p>
      </div>
    </slot>

    <!-- 📭 Empty State -->
    <slot name="empty" v-else-if="props.isEmpty">
      <div
        class="flex flex-col justify-center items-center w-full h-full text-center"
      >
        <img
          src="~/assets/images/empty-state-light.svg"
          class="w-[22rem]"
          alt="No Data"
        />
        <h1 class="mt-6 font-semibold text-lg">No results found</h1>
      </div>
    </slot>

    <!-- 🎯 Success Content -->
    <div v-else>
      <slot />
      <slot name="content" />
    </div>
  </div>
</template>
