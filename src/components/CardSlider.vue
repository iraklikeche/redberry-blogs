<template>
  <div>
    <div v-if="isSingleCardPage" class="pb-20">
      <div class="mt-12 mb-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
          <div class="flex justify-center items-center gap-4">
            <button
              @click="slideToPrev"
              :disabled="disablePrevButton"
              class="rotate-180 bg-[#e4e3eb] transition-colors rounded-full hover:bg-[#512be7] active:bg-[#4721dd] disabled:bg-[#e4e3eb] disabled:hover:bg-[#e4e3eb] disabled:active:bg-[#e4e3eb]"
              :class="[disablePrevButton ? 'bg-[#e4e3eb]' : 'bg-[#5d37f3]']"
            >
              <img :src="arrowSlider" class="py-3 px-4" />
            </button>
            <button
              @click="slideToNext"
              :disabled="disableNextButton"
              class="bg-[#e4e3eb] transition-colors rounded-full hover:bg-[#512be7] active:bg-[#4721dd] disabled:bg-[#e4e3eb] disabled:hover:bg-[#e4e3eb] disabled:active:bg-[#e4e3eb]"
              :class="[disableNextButton ? 'bg-[#e4e3eb]' : 'bg-[#5d37f3]']"
            >
              <img :src="arrowSlider" class="py-3 px-4" />
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
import arrowSlider from "../assets/images/arrow-slider.png";

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
  } else {
    disableNextButton.value = false;
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
