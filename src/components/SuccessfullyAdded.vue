<template>
  <div
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-if="modal"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full justify-center p-4 text-center items-center sp-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg"
        >
          <img
            :src="close"
            class="absolute top-[5%] right-[5%] cursor-pointer"
            @click="closeModal"
          />

          <div class="bg-gray-50 px-8 py-12">
            <div
              class="flex items-center justify-center mb-10 flex-col gap-4 pt-8"
            >
              <img :src="success" />
              <h2 class="font-extrabold text-xl">
                ჩანაწერი წარმატებით დაემატა
              </h2>
            </div>

            <button
              type="button"
              @click="goToHomePage"
              class="bg-[#5D37F3] py-2 w-full text-white rounded-lg"
            >
              მთავარ გვერდზე დაბრუნება
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import success from "../assets/images/tick-circle.png";
import close from "../assets/images/close.png";
import { useRouter } from "vue-router";

const emit = defineEmits(["modalClosed"]);

const modal = ref(true);

const closeModal = () => {
  modal.value = false;
  // Emit an event to notify the parent component
  // that the modal is closed
  emit("modalClosed");
};

const router = useRouter();

const goToHomePage = () => {
  // Use the router.push method to navigate to the home page
  router.push({ name: "home" });
};
</script>
