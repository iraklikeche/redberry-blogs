<template>
  <button @click="swiper.slidePrev()">Previous</button>
  <button @click="swiper.slideNext()">Next</button>
</template>

<script setup>
import { useSwiper } from "swiper/vue";

const swiper = useSwiper();
</script>
