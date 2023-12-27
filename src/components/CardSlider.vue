<template>
  <div>
    <div v-if="isSingleCardPage">
      <div class="mt-12 pt-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
          <div class="flex justify-center items-center gap-4">
            <button
              @click="slideToPrev"
              class="rotate-180"
              :disabled="disablePrevButton"
            >
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
                    fill: disablePrevButton ? '#e4e3eb' : '#5D37F3',
                  }"
                />
                <path
                  d="M26 21C25.4477 21 25 21.4477 25 22C25 22.5523 25.4477 23 26 23L26 21ZM26.8071 22.7071C27.1976 22.3166 27.1976 21.6834 26.8071 21.2929L20.4431 14.9289C20.0526 14.5384 19.4195 14.5384 19.0289 14.9289C18.6384 15.3195 18.6384 15.9526 19.0289 16.3431L24.6858 22L19.0289 27.6569C18.6384 28.0474 18.6384 28.6805 19.0289 29.0711C19.4195 29.4616 20.0526 29.4616 20.4431 29.0711L26.8071 22.7071ZM26 23L26.1 23L26.1 21L26 21L26 23Z"
                  fill="white"
                />
              </svg>
            </button>
            <button @click="slideToNext" :disabled="disableNextButton">
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
                  :style="{ fill: disableNextButton ? '#e4e3eb' : '#5D37F3' }"
                />
                <path
                  d="M26 21C25.4477 21 25 21.4477 25 22C25 22.5523 25.4477 23 26 23L26 21ZM26.8071 22.7071C27.1976 22.3166 27.1976 21.6834 26.8071 21.2929L20.4431 14.9289C20.0526 14.5384 19.4195 14.5384 19.0289 14.9289C18.6384 15.3195 18.6384 15.9526 19.0289 16.3431L24.6858 22L19.0289 27.6569C18.6384 28.0474 18.6384 28.6805 19.0289 29.0711C19.4195 29.4616 20.0526 29.4616 20.4431 29.0711L26.8071 22.7071ZM26 23L26.1 23L26.1 21L26 21L26 23Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <swiper
        :slidesPerView="3"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
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
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import { Pagination } from "swiper/modules";

const modules = [Pagination];

let swiperInstance;
const disablePrevButton = ref(true);
const disableNextButton = ref(false);

const onSwiper = (swiper) => {
  swiperInstance = swiper;
};

const slideToPrev = () => {
  swiperInstance.slidePrev();
};

const slideToNext = () => {
  swiperInstance.slideNext();
};

const onSlideChange = () => {
  if (swiperInstance.isBeginning) {
    disablePrevButton.value = true;
  } else {
    disablePrevButton.value = false;
  }

  if (swiperInstance.isEnd) {
    disableNextButton.value = true;
  }
};

const blogs = ref([]);
const route = useRoute();
const foo = ref(false);

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
