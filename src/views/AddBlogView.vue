<template>
  <div>
    <div
      class="divide-y flex items-center justify-center flex-col border-b border-[#e4e3eb] py-8"
    >
      <RouterLink :to="{ name: 'home' }">
        <img :src="logo" />
      </RouterLink>
    </div>
    <div class="px-20 grid grid-cols-[30%,70%] items-center py-8">
      <div class="self-start">
        <!-- <img :src="arrowLeft" class="cursor-pointer" @click="goBack" /> -->
        <img
          :src="left"
          class="cursor-pointer bg-[#e4e3eb] rounded-full py-3 px-4 hover:bg-[#d9d8e0] active:bg-[#cfced6] transition-colors"
          @click="goBack"
        />
      </div>
      <div>
        <h2 class="text-3xl font-bold text-left mb-8">ბლოგის დამატება</h2>

        <Form />
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/images/logo.png";
import left from "../assets/images/arrowLeft.png";
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  // Use router.go(-1) to navigate back one step in the history.
  router.go(-1);
};
</script>
