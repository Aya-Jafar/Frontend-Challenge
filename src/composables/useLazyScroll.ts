import { ref, computed } from "vue";

const useLazyScroll = <T>(
  loader: () => Promise<T[]>,
  options: {
    chunkSize?: number;
    immediate?: boolean;
    processItem?: (item: any) => T;
  } = {}
) => {
  const {
    chunkSize = 10,
    immediate = false,
    processItem = (item) => item,
  } = options;

  // States
  const allItems = ref([]);
  const visibleItems = ref([]);
  const currentIndex = ref(0);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const hasMoreItems = ref(true);

  // Load all data (but only show chunks)
  const loadAllData = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      const data = await loader();
      allItems.value = data.map(processItem) as any;
      loadNextChunk(); // Load initial chunk
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  };

  // Load next chunk of data
  const loadNextChunk = () => {
    if (isLoading.value || !hasMoreItems.value) return;

    const nextChunk = allItems.value.slice(
      currentIndex.value,
      currentIndex.value + chunkSize
    );

    visibleItems.value = [...visibleItems.value, ...nextChunk];
    currentIndex.value += chunkSize;
    hasMoreItems.value = currentIndex.value < allItems.value.length;
  };

  // Initialize if immediate
  if (immediate) {
    loadAllData();
  }

  return {
    visibleItems,
    isLoading,
    error,
    hasMoreItems,
    loadAllData,
    loadNextChunk,
    reset: () => {
      allItems.value = [];
      visibleItems.value = [];
      currentIndex.value = 0;
      hasMoreItems.value = true;
    },
  };
};

export default useLazyScroll;
