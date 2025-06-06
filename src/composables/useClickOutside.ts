import { onMounted, onBeforeUnmount } from "vue";

/**
 * Composable to detect clicks outside a specified element and run a callback.
 *
 * @param {Ref<HTMLElement | null>} targetElementRef - The ref to the element to detect outside clicks on.
 * @param {() => void} callback - The function to call when a click outside is detected.
 */
export default function useClickOutside(
  targetElementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  /**
   * Handles the document mousedown event and calls the callback if clicked outside the target element.
   *
   * @param {MouseEvent} event - The mouse event.
   */
  const handleClick = (event: MouseEvent) => {
    const el = targetElementRef.value;
    if (el && !el.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClick);
  });
}
