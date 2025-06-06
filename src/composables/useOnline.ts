import { ref, onMounted, onUnmounted } from "vue";

/**
 * Composable to track the browser's online/offline status reactively.
 *
 * @returns  {isOnline}  Reactive boolean indicating online status.
 */
export default function useOnline() {
  const isOnline = ref(navigator?.onLine);

  /**
   * Updates the isOnline ref based on the current navigator.onLine value.
   */
  const updateOnlineStatus = () => {
    isOnline.value = navigator?.onLine;
  };

  onMounted(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });

  return { isOnline };
}
