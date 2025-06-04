<script setup lang="ts">
import Logo from "~/components/home/nav/Logo.vue";
import Search from "~/components/home/nav/Search.vue";
import LanguageSwitcher from "~/components/home/nav/LanguageSwitcher.vue";
import AccountButton from "~/components/home/nav/AccountButton.vue";
import useCart from "../../../stores/products/card";

const { card } = useCart();
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center rounded-[24px] bg-[#DFDFE8]/50 border border-[#DFDFE8] py-3 px-5 md:py-5 md:px-7 m-2 md:m-5 gap-3 md:gap-0"
  >
    <!-- Mobile top row: Logo + wishlist + cart -->
    <div class="flex md:hidden w-full justify-between items-center">
      <Logo class="scale-90" />
      <div class="flex items-center gap-2">
        <!-- Wishlist -->
        <button class="rounded-[12px] p-2 flex items-center justify-center">
          <img
            src="/assets/images/heart-empty.png"
            class="w-5 h-5"
            alt="wishlist"
          />
        </button>

        <!-- Cart -->
        <button
          class="bg-[#FFE9E9] rounded-[12px] p-2 flex items-center justify-center"
        >
          <img src="/assets/images/nav-cart.png" class="w-5 h-5" alt="cart" />
        </button>
      </div>
    </div>

    <!-- Left side (desktop): cart + wishlist + account -->
    <div class="hidden md:flex items-center gap-3">
      <!-- Cart -->
      <button
        class="bg-[#FFE9E9] rounded-[12px] p-2 flex items-center justify-center"
      >
        <img src="/assets/images/nav-cart.png" class="w-5 h-5" alt="cart" />
        {{ card.length }}
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
      <AccountButton />
    </div>

    <!-- Middle side: Search + Language (desktop) -->
    <div
      class="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 order-last md:order-none"
    >
      <!-- Language Switcher (desktop only) -->
      <LanguageSwitcher />
      <!-- Search Bar -->
      <Search />
    </div>

    <!-- Logo -->
    <Logo class="hidden md:block" />
  </div>
</template>
