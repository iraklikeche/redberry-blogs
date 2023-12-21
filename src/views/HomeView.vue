<script setup>
import blog from "../assets/images/blog.png";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import Card from "@/components/Card.vue";
import axios from "axios";

import { fetchData } from "../components/getCategory.js";

const categoryData = ref([]);

onMounted(async () => {
  try {
    categoryData.value = await fetchData();
  } catch (error) {
    console.error("Error in component:", error);
  }
});
</script>

<template>
  <Navbar />
  <main>
    <div class="bg-gradient-to-b from-[#e0e9ee] px-20 py-12">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-5xl font-extrabold">ბლოგი</h1>
        <img :src="blog" />
      </div>
      <div class="mt-12">
        <ul class="flex items-center justify-center gap-4">
          <li
            v-for="category in categoryData"
            :key="category.id"
            class="text-xs rounded-xl tracking-wider text-[#31b5] bg-cyan-400 py-2 px-4 flex-nowrap font-medium border border-black cursor-pointer"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
      <Card />
    </div>
  </main>
</template>
