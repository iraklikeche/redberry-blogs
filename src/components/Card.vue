<template>
  <div class="mt-12 grid grid-cols-3 gap-8">
    <div v-for="blog in blogs" :key="blog.id">
      <div class="flex flex-col">
        <div>
          <img :src="blog.image" class="rounded-lg w-full" />
        </div>
        <p class="text-xs font-extrabold mt-4 mb-2">{{ blog.author }}</p>
        <p class="text-xs mb-4">{{ blog.publish_date }}</p>
        <p class="font-bold">
          {{ blog.title }}
        </p>
        <ul class="my-2 flex gap-4 gap-x-6 flex-wrap">
          <li
            v-for="category in blog.categories"
            :key="category.id"
            class="text-xs rounded-xl tracking-wider py-2 px-4 flex-wrap font-medium"
            :style="{
              color: category.text_color,
              background: category.background_color,
            }"
          >
            {{ category.title }}
          </li>
        </ul>
        <p class="mb-4 text-[#404049] line-clamp-2">
          {{ blog.description }}
        </p>

        <router-link to="/singleCard" class="text-[#5D37F3] text-sm font-medium"
          >სრულად ნახვა</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const blogs = ref([]);

const apiUrl = "https://api.blog.redberryinternship.ge/api/blogs";
const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    console.log(response.data.data);
    blogs.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
});
</script>


<style scoped>
 .line-clamp-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
  }
</style>