<template>
  <header class="flex items-start gap-[0.3rem]">
    <img
      src="~/assets/images/logo.png"
      alt="logo"
      class="logo"
      fetchpriority="high"
    />
  </header>
</template>

<style scoped>
@reference "~/assets/css/app.css";

.logo {
  @apply h-11;
}
</style>
