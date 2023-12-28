<template>
  <div class="flex flex-col" v-if="isPublishDatePassed">
    <div
      v-bind:style="{ backgroundImage: 'url(' + blog.image + ')' }"
      class="cardImageHolder"
    >
      <!-- <img :src="blog.image" class="rounded-xl w-full h-[328px]" /> -->
    </div>
    <p class="font-extrabold mt-4 mb-2">{{ blog.author }}</p>
    <p class="text-xs mb-4">{{ blog.publish_date }}</p>
    <p class="font-bold text-xl line-clamp-2">
      {{ blog.title }}
    </p>
    <ul class="my-2 flex gap-4 gap-y-2 flex-wrap">
      <li
        v-for="category in blog.categories"
        :key="category.id"
        class="text-xs rounded-[30px] tracking-wider py-1.5 px-4 flex-wrap font-medium"
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

    <RouterLink
      :to="{ name: 'singleCard', params: { id: blog.id } }"
      class="text-[#5D37F3] text-sm font-medium"
    >
      სრულად ნახვა
    </RouterLink>
  </div>
</template>

<script setup>
const props = defineProps(["blog"]);
import { computed } from "vue";

const isPublishDatePassed = computed(() => {
  const publishDate = new Date(props.blog.publish_date);
  const currentDate = new Date();
  console.log("current Date::", currentDate, "Publish Date:", publishDate);
  return publishDate <= currentDate;
});
</script>

<style scoped>
.cardImageHolder {
  width: 100%;
  /* height: 328px; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
  aspect-ratio: auto 16/9;
}
</style>
