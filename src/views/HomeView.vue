<script setup>
import blog from "../assets/images/blog.png";
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import CardSlider from "@/components/CardSlider.vue";
import { fetchData } from "../components/getCategory.js";

const categoryData = ref([]);

const activeCategories = ref([]);

// Function to toggle the active state of a category
const toggleActive = (categoryId) => {
  const index = activeCategories.value.indexOf(categoryId);

  if (index === -1) {
    // Category is not active, add it to the activeCategories array
    activeCategories.value.push(categoryId);
  } else {
    // Category is active, remove it from the activeCategories array
    activeCategories.value.splice(index, 1);
  }
};

// Function to check if a category is active
const isActive = (categoryId) => {
  return activeCategories.value.includes(categoryId);
};

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
    <div
      class="bg-gradient-to-b from-[#e0e9ee] from-1% via-white via-40% to-white to-90% px-20 py-16"
    >
      <div class="flex items-center justify-between py-4">
        <h1 class="text-5xl font-black">ბლოგი</h1>
        <img :src="blog" />
      </div>
      <div class="my-12">
        <ul class="flex items-center justify-center gap-4">
          <li
            v-for="category in categoryData"
            :key="category.id"
            class="text-xs rounded-[30px] tracking-wider py-2 px-4 flex-nowrap font-medium border cursor-pointer"
            :class="{
              'border-black': isActive(category.id),
            }"
            :style="{
              color: category.text_color,
              background: category.background_color,
            }"
            @click="toggleActive(category.id)"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
      <CardSlider :activeCategories="activeCategories" />
    </div>
  </main>
</template>
