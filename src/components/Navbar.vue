<template>
  <nav class="flex justify-between px-20 py-6">
    <img :src="logo" class="w-[150px] h-6" />
    <button
      class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm"
      @click="openModal"
      v-if="!isLogged"
    >
      შესვლა
    </button>
    <button
      class="bg-[#5D37F3] px-4 py-2 text-white rounded-lg text-sm"
      v-if="isLogged"
    >
      დაამატე ბლოგი
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

          <div class="bg-gray-50 px-8 py-12" v-if="!isLogged">
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
                :class="{
                  invalid: errorMessage,
                }"
              />
              <div class="flex items-center gap-2" v-if="errorMessage">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0002 1.66666C5.41683 1.66666 1.66683 5.41666 1.66683 10C1.66683 14.5833 5.41683 18.3333 10.0002 18.3333C14.5835 18.3333 18.3335 14.5833 18.3335 10C18.3335 5.41666 14.5835 1.66666 10.0002 1.66666Z"
                    fill="#EA1919"
                  />
                  <path
                    d="M10 13.3333L10 9.16666"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.0044 6.66667L9.99691 6.66667"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p class="text-[#ea1919] text-xs">ელ-ფოსტა არ მოიძებნა</p>
              </div>
            </div>
            <button
              type="button"
              @click="login"
              class="bg-[#5D37F3] py-2 w-full text-white rounded-lg"
            >
              შესვლა
            </button>
          </div>

          <div class="bg-gray-50 px-8 py-12" v-if="isLogged">
            <div class="flex items-center justify-center mb-12 flex-col gap-4">
              <img :src="success" />
              <h2 class="font-bold text-xl">წარმატებული ავტორიზაცია</h2>
            </div>

            <button
              type="button"
              @click="closeModal"
              class="bg-[#5D37F3] py-2 w-full text-white rounded-lg"
            >
              კარგი
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import logo from "../assets/images/logo.png";
import close from "../assets/images/close.png";
import axios from "axios";
import success from "../assets/images/tick-circle.png";

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

const TOKEN_KEY = "authToken"; // Key for storing the authentication token

// Check if the user is already logged in on component mount
const initialLoginCheck = () => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    isLogged.value = true;
  }
};

onMounted(initialLoginCheck);

const isLogged = ref(false);
const modal = ref(false);
const email = ref("");
const errorMessage = ref(false);

const openModal = () => {
  modal.value = true;
};

const closeModal = () => {
  modal.value = false;
};

const login = async () => {
  try {
    // Simple email validation
    if (!email.value.endsWith("@redberry.ge")) {
      console.log("Error: Invalid email format");
      errorMessage.value = true;
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
    // Save the token to localStorage
    localStorage.setItem(TOKEN_KEY, token);

    isLogged.value = true;
    console.log(isLogged.value);
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
};
</script>

<style scoped>
input.invalid {
  border-color: #e74c3c;
}
</style>
