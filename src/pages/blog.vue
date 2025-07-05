<script setup lang="ts">
import Header from "./blog/header.vue";
</script>

<template>
  <Header />
  <br />
  Blog Main Page

  <!-- Add this for nested files -->
  <!-- Note: this file name should be the same as folder name with nested files (blog) -->
  <NuxtPage />
</template>
