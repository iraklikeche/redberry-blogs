<template>
  <div>
    <div v-if="isSingleCardPage">
      <swiper
        :slidesPerView="3"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <div class="mt-12 pt-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
            <div class="flex justify-center items-center gap-4">
              <SliderButton />
            </div>
          </div>
        </div>

        <swiper-slide v-for="blog in filteredBlogs" :key="blog.id">
          <Card :blog="blog" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="grid grid-cols-3 gap-8" v-else>
      <Card v-for="blog in filteredBlogs" :key="blog.id" :blog="blog" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Card from "./Card.vue";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import SliderButton from "../components/SliderButton.vue";

const modules = [Pagination];

const blogs = ref([]);
const route = useRoute();

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

    blogs.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
});

const props = defineProps(["activeCategories", "similarBlog", "currentBlogId"]);

const filteredBlogs = computed(() => {
  if (props.activeCategories && props.activeCategories.length > 0) {
    // Filtering for Home page using activeCategories
    return blogs.value.filter((blog) =>
      blog.categories.some((category) =>
        props.activeCategories.includes(category.id)
      )
    );
  }

  if (props.similarBlog && props.similarBlog.length > 0) {
    // Filtering for SingleCard page using similarBlog
    return blogs.value.filter((blog) => {
      return (
        blog.categories.some((category) =>
          props.similarBlog.includes(category.id)
        ) && blog.id !== props.currentBlogId
      );
    });
  }

  return blogs.value;
});

const isSingleCardPage = computed(() => {
  return route.name === "singleCard";
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
