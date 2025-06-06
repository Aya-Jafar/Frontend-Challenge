/**
 * A composable for lazy loading data in chunks using IntersectionObserver.
 *
 * @template T - The type of the items in the data array.
 * @param {Ref<T[]> | ComputedRef<T[]>} fullData - Reactive reference or computed ref of the full data array.
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.initialCount=3] - Number of items to initially load.
 * @param {number} [options.increment=2] - Number of items to load on each increment.
 * @param {string} [options.rootMargin="100px"] - IntersectionObserver rootMargin setting.
 * @returns {{
 *   displayedData: Ref<T[]>,
 *   hasMore: ComputedRef<boolean>,
 *   isLoading: Ref<boolean>,
 *   endTracker: Ref<HTMLElement | null>
 * }} Reactive references for the lazy-loaded data, loading state, and intersection tracker element.
 */

export default function useLazyScroll<T>(
  fullData: Ref<T[]> | ComputedRef<T[]>,
  { initialCount = 3, increment = 2, rootMargin = "100px" } = {}
) {
  const loadedCount = ref(initialCount);
  const endTracker = ref<HTMLElement | null>(null);
  const isLoading = ref(false);
  const displayedData = ref<T[]>([]);

  const hasMore = computed(() => loadedCount.value < fullData.value.length);

  const updateDisplayed = () =>
    (displayedData.value = fullData.value.slice(0, loadedCount.value));

  /**
   * Load more items by increasing loadedCount, simulating async delay.
   */
  const loadMore = () => {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    setTimeout(() => {
      loadedCount.value = loadedCount.value + increment;
      updateDisplayed();
      isLoading.value = false;
    }, 1000);
  };

  /**
   * Creates an IntersectionObserver to watch the endTracker element.
   * Calls loadMore when it comes into view and there's more data.
   */
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

  /**
   * Observes the current endTracker element to trigger loading more.
   */
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
