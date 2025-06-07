<script setup lang="ts">
import Logo from "~/components/home/nav/Logo.vue";
import Search from "~/components/home/nav/Search.vue";
import LanguageSwitcher from "~/components/home/nav/LanguageSwitcher.vue";
import AccountButton from "~/components/home/nav/AccountButton.vue";
import useCardStore from "../../../stores/products/card";
import useWishListStore from "~/stores/products/wishlist";

const { card } = useCardStore();
const { wishlist } = useWishListStore();
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center rounded-[24px] bg-[#DFDFE880]/50 border border-[#E8E8E880] py-3 px-5 md:py-5 md:px-7 m-2 md:m-5 gap-3 md:gap-0"
  >
    <!-- Mobile top row: Logo + wishlist + cart -->
    <div class="flex md:hidden w-full justify-between items-center">
      <Logo class="scale-90" />
      <div class="flex items-center gap-2">
        <!-- Wishlist -->
        <button
          class="rounded-[12px] p-2 flex items-center justify-center gap-1"
        >
          <img
            src="/images/empty-heart.svg"
            class="w-5 h-5"
            alt="wishlist"
            fetchpriority="high"
          />
          {{ wishlist.length }}
        </button>

        <!-- Cart -->
        <button
          class="bg-[#FFE9E9] rounded-[12px] p-2 flex items-center justify-center gap-1"
        >
          <img
            src="/images/nav-cart.svg"
            class="w-5 h-5"
            alt="cart"
            fetchpriority="high"
          />
          {{ card.length }}
        </button>
      </div>
    </div>

    <!-- Left side (desktop): cart + wishlist + account -->
    <div class="hidden md:flex items-center gap-3 ml-10">
      <!-- Cart -->
      <button
        class="bg-[#FFE9E9] rounded-[12px] p-2 flex items-center justify-center gap-1"
      >
        <img src="/images/nav-cart.svg" class="w-5 h-5" alt="cart" fetchpriority="high" />
        {{ card.length }}
      </button>

      <!-- Wishlist -->
      <button class="rounded-[12px] p-2 flex items-center justify-center gap-1">
        <img
          src="/images/empty-heart.svg"
          class="w-5 h-5"
          alt="wishlist"
          fetchpriority="high"
        />
        {{ wishlist.length }}
      </button>

      <!-- Account -->
      <AccountButton />
    </div>

    <!-- Middle side: Search + Language (desktop) -->
    <div
      class="w-full md:w-auto flex flex-col md:flex-row items-center gap-10 order-last md:order-none"
    >
      <!-- Language Switcher (desktop only) -->
      <LanguageSwitcher />
      <!-- Search Bar -->
      <Search />

      <!-- Logo -->
      <Logo class="hidden md:block" />
    </div>
  </div>
</template>
