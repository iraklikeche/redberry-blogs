<script setup>
import blog from "../assets/images/blog.png";
import { ref, onMounted } from "vue";
import Card from "@/components/Card.vue";
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

<template>
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
