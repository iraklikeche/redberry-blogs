<script setup>
import logo from "../assets/images/logo.png";
import blog from "../assets/images/blog.png";
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const apiURL = "https://api.blog.redberryinternship.ge/api/categories";

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

const categoryData = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    categoryData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
<!-- [`w-${percent}/12`]: show -->
<template>
  <main>
    <nav class="flex justify-between px-20 py-6">
      <img :src="logo" class="w-[150px] h-6" />
      <button class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm">
        შესვლა
      </button>
    </nav>
    <div class="bg-gradient-to-b from-[#d5dee3] px-20 py-12">
      <div class="flex items-center justify-between py-4">
        <h1 class="text-5xl font-extrabold">ბლოგი</h1>
        <img :src="blog" />
      </div>
      <div class="mt-12">
        <ul class="flex items-center justify-center gap-4">
          <li
            v-for="category in categoryData"
            :key="category.id"
            class="text-xs rounded-xl tracking-wider text-[#31b5] bg-cyan-400 py-2 px-4 flex-nowrap"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
      <div class="mt-12 grid grid-cols-3 gap-8">
        <div class="flex flex-col">
          <img src="https://picsum.photos/400/330" class="rounded-lg" />
          <p class="text-xs font-extrabold">ავტორი</p>
          <p class="text-xs opacity-40">11.11.11</p>
          <p class="font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
            nisi!
          </p>
          <p>CATEGORIES,CATEGORIES1,CATEGORIES2</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            laboriosam praesentium qui facilis? Animi maiores, saepe debitis
            architecto possimus facilis? Ex, eius. Sint, delectus magni.
          </p>
          <button>სრულად ნახვა</button>
        </div>
      </div>
    </div>
  </main>
</template>
