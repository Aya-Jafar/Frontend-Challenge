<script setup lang="ts">
/**
 * A reusable button component supporting different variants, colors, and custom classes.
 * Props:
 *  - variant: "solid" | "outline" (default: "solid")
 *  - color: "primary" | "secondary" | "danger" | "success" (default: "primary")
 *  - customClass: string (overrides default classes)
 * Emits:
 *  - "click": Triggered when the button is clicked.
 **/

const emit = defineEmits(["click"]);

const props = defineProps<{
  variant?: "solid" | "outline";
  color?: "primary" | "secondary" | "danger" | "success";
  customClass?: string;
}>();

const baseClasses =
  "rounded-[16px] px-6 py-2 text-sm font-semibold transition  cursor-pointer";

const variantClasses = {
  solid: {
    primary: "miswag-button text-white",
    secondary: "bg-gray-600 text-white",
    danger: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
  },
  outline: {
    primary: "border border-[#D22525] text-[#D22525]",

    secondary: "border border-gray-600 text-gray-600",
    danger: "border border-red-600 text-red-600",
    success: "border border-green-600 text-green-600",
  },
};

const buttonClass = computed(() => {
  if (props.customClass) {
    return `${baseClasses} ${props.customClass}`;
  }
  return `${baseClasses} ${
    variantClasses[props.variant || "solid"][props.color || "primary"]
  }`;
});

const handleClick = (e: MouseEvent) => {
  emit("click");
  e.stopPropagation();
};
</script>

<template>
  <button :class="buttonClass.trim()" @click="handleClick">
    <slot />
  </button>
</template>
