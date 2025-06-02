<template>
  <header class="flex items-start gap-[0.3rem]">
    <img src="~/assets/images/logo-m.png" alt="" class="logo-letter" />

    <div class="flex flex-col items-center -mt-2 -ml-1">
      <img
        src="~/assets/images/logo-i-dot.png"
        alt=""
        class="mini-logo-letter"
      />
      <img src="~/assets/images/logo-i.png" alt="" class="logo-letter -mt-1" />
    </div>

    <img src="~/assets/images/logo-s.png" alt="" class="logo-letter -ml-1" />
    <img src="~/assets/images/logo-w.png" alt="" class="logo-letter -ml-1" />
    <img src="~assets/images/logo-a.png" alt="" class="logo-letter -ml-1" />
    <img src="~/assets/images/logo-g.png" alt="" class="-ml-1 h-10" />
  </header>
</template>

<style scoped>
@reference "~/assets/css/app.css";

.logo-letter {
  @apply h-7;
}
.mini-logo-letter {
  @apply h-[0.5rem] w-[0.5rem] mb-[0.27rem];
}
</style>
