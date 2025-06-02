<script setup lang="ts">
import Logo from "~/components/home/nav/Logo.vue";
</script>

<template>
  <div
    class="flex justify-between items-center rounded-[24px] bg-[#DFDFE8]/50 border border-[#DFDFE8] py-5 px-7 m-5"
  >
    <!-- Left side: card + wishlist + account -->
    <div class="flex items-center gap-3">
      <!-- Cart -->
      <button
        class="bg-[#FFE9E9] rounded-[12px] p-2 flex items-center justify-center"
      >
        <img src="/assets/images/nav-cart.png" class="w-5 h-5" alt="cart" />
      </button>

      <!-- Wishlist -->
      <button class="rounded-[12px] p-2 flex items-center justify-center">
        <img
          src="/assets/images/heart-empty.png"
          class="w-5 h-5"
          alt="wishlist"
        />
      </button>

      <!-- Account -->
      <button
        class="bg-white rounded-[12px] px-4 py-3 text-sm flex items-center gap-2"
      >
        إنشاء حساب
        <img src="/assets/images/user-icon.png" class="w-4 h-4" alt="user" />
      </button>
    </div>

    <!-- Middle side: Language + Search -->
    <div class="flex items-center gap-4">
      <!-- Language Switcher -->
      <div class="flex items-center gap-1 text-sm">
        العربية
        <img src="/assets/images/lang.png" class="w-5 h-5" alt="language" />
      </div>

      <!-- Search Bar -->
      <div class="relative w-[30rem]">
        <input
          type="text"
          :image="'/assets/images/search.png'"
          placeholder="ابحث عن منتج او ماركة"
          class="w-full rounded-[12px] bg-white px-4 py-2 text-sm border border-gray-300"
        />
        <img
          class="absolute top-2.5 end-3 w-4 h-4"
          src="/assets/images/search.png"
          alt="search"
        />
      </div>

      <!-- Right side: Logo -->
      <Logo />
    </div>
  </div>
</template>
