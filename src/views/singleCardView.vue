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
        <p class="mb-4 text-[#404049] whitespace-pre-line">
          {{ singleBlog.description }}
        </p>
      </div>
    </div>
    <div class="mt-12 p-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
        <div class="flex justify-center items-center gap-4">
          <button class="rotate-180" :disabled="!foo">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="44"
                y="44"
                width="44"
                height="44"
                rx="22"
                transform="rotate(180 44 44)"
                :style="{
                  fill: !foo ? '#e4e3eb' : '#5D37F3',
                }"
              />
              <path
                d="M26 21C25.4477 21 25 21.4477 25 22C25 22.5523 25.4477 23 26 23L26 21ZM26.8071 22.7071C27.1976 22.3166 27.1976 21.6834 26.8071 21.2929L20.4431 14.9289C20.0526 14.5384 19.4195 14.5384 19.0289 14.9289C18.6384 15.3195 18.6384 15.9526 19.0289 16.3431L24.6858 22L19.0289 27.6569C18.6384 28.0474 18.6384 28.6805 19.0289 29.0711C19.4195 29.4616 20.0526 29.4616 20.4431 29.0711L26.8071 22.7071ZM26 23L26.1 23L26.1 21L26 21L26 23Z"
                fill="white"
              />
            </svg>
          </button>
          <button>
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="44"
                y="44"
                width="44"
                height="44"
                rx="22"
                transform="rotate(180 44 44)"
                :style="{ fill: foo ? '#5D37F3' : '#5D37F3' }"
              />
              <path
                d="M26 21C25.4477 21 25 21.4477 25 22C25 22.5523 25.4477 23 26 23L26 21ZM26.8071 22.7071C27.1976 22.3166 27.1976 21.6834 26.8071 21.2929L20.4431 14.9289C20.0526 14.5384 19.4195 14.5384 19.0289 14.9289C18.6384 15.3195 18.6384 15.9526 19.0289 16.3431L24.6858 22L19.0289 27.6569C18.6384 28.0474 18.6384 28.6805 19.0289 29.0711C19.4195 29.4616 20.0526 29.4616 20.4431 29.0711L26.8071 22.7071ZM26 23L26.1 23L26.1 21L26 21L26 23Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <CardSlider :similarBlog="similarBlog" :currentBlogId="currentBlogId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import arrowLeft from "../assets/images/Arrow-left.png";
import { onMounted, ref, watch, computed } from "vue";
import axios from "axios";
import CardSlider from "@/components/CardSlider.vue";

const route = useRoute();

const id = ref(route.params.id);
const singleBlog = ref([]);
const similarBlog = ref([]);
const currentBlogId = ref(id.value);

const foo = ref(false);

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

let getById = `https://api.blog.redberryinternship.ge/api/blogs/${id.value}`;

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
    // console.log(response.data);
    singleBlog.value = response.data;
    similarBlog.value = response.data.categories;

    similarBlog.value = similarBlog.value.map((item) => item.id);
    currentBlogId.value = response.data.id;
    console.log(currentBlogId.value);

    // console.log(similarBlog.value);
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
</script>
