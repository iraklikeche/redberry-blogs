<template>
  <Navbar />
  <div class="px-20 pt-10">
    <div class="grid grid-cols-[25%,75%] justify-center">
      <div>
        <img :src="arrowLeft" class="cursor-pointer" @click="goToHomePage" />
      </div>
      <div class="grid grid-cols-1 max-w-3xl">
        <img
          :src="singleBlog.image"
          class="rounded-xl w-full"
          :style="{
            height: `${(368 / 1080) * 100}vh`,
          }"
        />
        <p class="text-xs font-extrabold mt-8 mb-2">{{ singleBlog.author }}</p>
        <p class="text-xs mb-4 text-[#85858D]">
          {{ singleBlog.publish_date }}
          <span v-if="singleBlog.email"> &#x2022; {{ singleBlog.email }}</span>
        </p>
        <p class="font-bold text-3xl">
          {{ singleBlog.title }}
        </p>
        <ul class="my-6 flex gap-4 gap-y-2 flex-wrap">
          <li
            v-for="category in singleBlog.categories"
            :key="category.id"
            class="text-xs rounded-[30px] tracking-wider py-2 px-4 flex-wrap font-medium"
            :style="{
              color: category.text_color,
              background: category.background_color,
            }"
          >
            {{ category.title }}
          </li>
        </ul>
        <p class="mb-4 text-[#404049]">
          {{ singleBlog.description }}
        </p>
      </div>
    </div>
    <div class="mt-12 p-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
        <div>
          <button>1</button>
          <button>2</button>
        </div>
      </div>
      <Card />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import arrowLeft from "../assets/images/Arrow-left.png";
import { onMounted, ref, watch } from "vue";
import axios from "axios";

const route = useRoute();

const id = ref(route.params.id);
const singleBlog = ref([]);
console.log(id);

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

let getById = `https://api.blog.redberryinternship.ge/api/blogs/${id.value}`;
console.log(getById);

const router = useRouter();

const goToHomePage = () => {
  // Use the router.push method to navigate to the home page
  router.push({ name: "home" });
};

const fetchData = async () => {
  try {
    const response = await axios.get(getById, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    singleBlog.value = response.data;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);

// Watch for changes in the route parameters
watch(
  () => route.params.id,
  (newId) => {
    // Update the id and fetch data when the id changes
    id.value = newId;
    getById = `https://api.blog.redberryinternship.ge/api/blogs/${id.value}`;
    fetchData();
  }
);

// onMounted(async () => {
//   try {
//     const response = await axios.get(getById, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response.data);
//     singleBlog.value = response.data;
//   } catch (error) {
//     console.error(error);
//   }
// });
</script>
