<script setup>
import logo from "../assets/images/logo.png";
import blog from "../assets/images/blog.png";
</script>

<template>
  <main class="px-20 py-8">
    <nav class="flex justify-between">
      <img :src="logo" />
      <button class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm">
        შესვლა
      </button>
    </nav>
    <div>
      <img :src="blog" />
    </div>
  </main>
</template>
