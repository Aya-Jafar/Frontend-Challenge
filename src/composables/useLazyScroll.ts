export default function useLazyScroll<T>(
  fullData: Ref<T[]> | ComputedRef<T[]>,
  { initialCount = 3, increment = 2, rootMargin = "10px" } = {}
) {
  const loadedCount = ref(initialCount);
  const endTracker = ref<HTMLElement | null>(null);
  const isLoading = ref(false);
  const displayedData = ref<T[]>([]);

  const hasMore = computed(() => loadedCount.value < fullData.value.length);

  const updateDisplayed = () =>
    (displayedData.value = fullData.value.slice(0, loadedCount.value));

  // Simulate async loading and update the count
  const loadMore = () => {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    setTimeout(() => {
      loadedCount.value = loadedCount.value + increment;
      updateDisplayed();
      isLoading.value = false;
    }, 1000);
  };

  const createObserver = () => {
    return new IntersectionObserver(
      ([entry]) => entry.isIntersecting && hasMore.value && loadMore(),
      {
        root: null,
        rootMargin,
        threshold: 1.0,
      }
    );
  };
  let observer: IntersectionObserver | null = null;

  const observe = () => {
    observer?.disconnect();
    if (endTracker.value) {
      observer = createObserver();
      observer.observe(endTracker.value);
    }
  };

  // Reinitialize when fullData changes
  onMounted(() => {
    updateDisplayed();
    nextTick(observe);
  });

  // Reinitialize when fullData changes
  watch(fullData, () => {
    loadedCount.value = initialCount;
    updateDisplayed();
    nextTick(observe);
  });

  // Re-observe if the tracker element changes
  watch(endTracker, () => nextTick(observe));

  onUnmounted(() => observer?.disconnect());

  return {
    displayedData,
    hasMore,
    isLoading,
    endTracker,
  };
}
