<template>
  <nav class="flex justify-between px-20 py-6">
    <img :src="logo" class="w-[150px] h-6" />
    <button class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm">
      შესვლა
    </button>
  </nav>
</template>

<script setup>
import logo from "../assets/images/logo.png";
</script>
