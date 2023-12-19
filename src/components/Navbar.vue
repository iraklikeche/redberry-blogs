<template>
  <nav class="flex justify-between px-20 py-6">
    <img :src="logo" class="w-[150px] h-6" />
    <button
      class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm"
      @click="openModal"
    >
      შესვლა
    </button>
  </nav>

  <div
    class="relative z-10"
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
            <div class="flex items-center justify-center mb-4">
              <h2 class="text-2xl font-extrabold">შესვლა</h2>
            </div>
            <div class="flex flex-col gap-2 mb-6">
              <label class="font-bold text-sm">ელ-ფოსტა</label>
              <input
                type="text"
                placeholder="Example@redberry.ge"
                v-model="email"
                required
                class="py-2 rounded-xl px-4 bg-[#e4e3eb] focus:border-[#5d37f3] focus:outline-none border-2"
              />
              <p v-if="errorMessage" class="text-[#ea1919] text-xs">
                ელ-ფოსტა არ მოიძებნა
              </p>
            </div>
            <button
              type="button"
              @click="login"
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
import close from "../assets/images/close.png";
import axios from "axios";

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

const isLogged = ref(false);
const modal = ref(false);
const email = ref("");
const errorMessage = ref(false);

const openModal = () => {
  modal.value = true;
  console.log(modal.value);
};

const closeModal = () => {
  modal.value = false;
};

const login = async () => {
  try {
    // Simple email validation
    if (!email.value.endsWith("@redberry.ge")) {
      console.log("Error: Invalid email format");
      return;
    }

    const response = await axios.post(
      "https://api.blog.redberryinternship.ge/api/login",
      {
        email: email.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response here
    console.log("Response:", response.data);
    console.log(response);
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};
</script>
