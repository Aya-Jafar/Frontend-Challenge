<script setup lang="ts">
import { useSnackbarStore } from "~/stores/snackbar";

const { snackbar, hideSnackbar } = useSnackbarStore();
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-5"
    leave-active-class="transition-all duration-300 ease-in"
    leave-to-class="opacity-0 translate-y-5"
  >
    <div
      v-if="snackbar?.isVisible"
      class="fixed bottom-7 right-5 px-10 py-3 rounded cursor-pointer z-[1000] text-white"
      :class="{
        'bg-green-500': snackbar?.type === 'success',
        'bg-red-500': snackbar?.type === 'error',
        'bg-yellow-500': snackbar?.type === 'warning',
        'bg-blue-500': snackbar?.type === 'info',
      }"
      @click="hideSnackbar"
    >
      {{ snackbar?.message }}
    </div>
  </Transition>
</template>
