import { onMounted, onBeforeUnmount } from "vue";

export default function useClickOutside(
  targetElementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
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
