<template>
  <nav class="flex justify-between px-20 py-6">
    <img :src="logo" class="w-[150px] h-6" />
    <button class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm">
      შესვლა
    </button>
  </nav>

  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full justify-center p-4 text-center items-center sp-0"
      >
        <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5"></div>
          <div class="bg-gray-50 px-8 py-3 pb-8">
            <div class="flex items-center justify-center mb-4">
              <h2 class="text-2xl font-extrabold">შესვლა</h2>
            </div>
            <div class="flex flex-col gap-2 mb-6">
              <label class="font-bold text-sm">ელ-ფოსტა</label>
              <input
                type="text"
                placeholder="Example@redberry.ge"
                class="py-2 rounded-xl px-4 bg-[#e4e3eb] focus:border-[#5d37f3] focus:outline-none border-2"
              />
            </div>
            <button
              type="button"
              class="bg-[#5D37F3] py-2 w-full text-white rounded-lg"
            >
              შესვლა
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import logo from "../assets/images/logo.png";

const isLogged = ref(false);
</script>
