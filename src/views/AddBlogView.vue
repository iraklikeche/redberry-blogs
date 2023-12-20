<template>
  <div>
    <div
      class="divide-y flex items-center justify-center flex-col border-b border-[#e4e3eb] py-6"
    >
      <img :src="logo" />
    </div>
    <div class="px-20 grid grid-cols-[25%,75%] items-center py-12">
      <div class="self-start">
        <img :src="arrowLeft" class="cursor-pointer" @click="goBack" />
      </div>
      <div>
        <h2 class="text-3xl font-bold text-left mb-8">ბლოგის დამატება</h2>

        <form class="max-w-[600px]" @submit.prevent="submitForm">
          <label class="font-bold">ატვირთე ფოტო</label>
          <div
            v-if="!selectedFile"
            class="image-container relative mt-2 border-dashed border border-[#85858d] rounded-xl py-12 flex flex-col items-center justify-center"
          >
            <img :src="addIcon" class="mb-4" />
            <div>
              <input
                type="file"
                @change="displaySelectedFile"
                class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p>
                ჩააგდეთ ფაილი აქ ან<span
                  class="py-2 px-1 cursor-pointer border-none font-bold rounded-md underline"
                  for="photo"
                  >აირჩით ფაილი</span
                >
              </p>
            </div>
          </div>
          <div
            v-else
            class="bg-[#f2f2fa] py-4 px-4 rounded-xl w-3/5 flex justify-between items-center mt-2"
          >
            <div class="flex gap-2">
              <img :src="imageIcon" />

              <p>
                {{ selectedFile.name }}
              </p>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="cursor-pointer"
              @click="removePhoto"
            >
              <path
                d="M7.75781 16.2426L16.2431 7.75736"
                stroke="#1A1A1F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.2431 16.2426L7.75781 7.75736"
                stroke="#1A1A1F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <!-- ******************************** Author&Title ********************************** -->
          <div class="grid grid-cols-2 gap-8 mt-4">
            <div>
              <label class="font-bold">ავტორი *</label>
              <div class="mt-1">
                <input
                  type="text"
                  placeholder="შეიყვანეთ ავტორი"
                  class="bg-gray-500 px-4 py-2 rounded-xl w-full"
                />
                <ul
                  class="text-[#85858d] text-xs mt-2 pl-4 list-disc flex flex-col gap-1"
                >
                  <li>მინიმუმ 4 სიმბოლო</li>
                  <li>მინიმუმ 2 სიტყვა</li>
                  <li>მხოლოდ ქართული ასოები</li>
                </ul>
              </div>
            </div>
            <div>
              <label class="font-bold">სათაური *</label>
              <div class="mt-1">
                <input
                  type="text"
                  placeholder="შეიყვანეთ სათაური"
                  class="bg-gray-500 px-4 py-2 rounded-xl w-full"
                />
                <ul class="text-[#85858d] text-xs mt-2">
                  <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- *************************** DESCRIPTION **************************************** -->
          <div class="mt-6">
            <label class="font-bold">აღწერა *</label>
            <textarea
              class="bg-gray-200 mt-1 w-full py-2 px-4 rounded-xl resize-none"
              rows="5"
              placeholder="შეიყვანეთ აღწერა"
            ></textarea>
            <p class="text-[#85858d] text-xs mt-1">მინიმუმ 2 სიმბოლო</p>

            მინიმუმ 4 სიმბოლო
          </div>

          <!-- *************************** DATE/CATEGORY/EMAIL ***************************** -->

          <div class="grid grid-cols-2 gap-8 mt-8">
            <div>
              <label class="font-bold">გამოქვეყნების თარიღი *</label>
              <input
                type="date"
                class="bg-gray-500 px-4 py-2 rounded-xl w-full mt-1"
              />
            </div>
            <div>
              <label class="font-bold">კატეგორია *</label>
              <select
                name="category"
                class="bg-gray-500 px-4 py-[9px] rounded-xl w-full mt-1"
              >
                <option value="" disabled selected>აირჩიეთ კატეგორია</option>
                <option v-for="category in categoryData" :key="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
            <div>
              <label class="font-bold">ელ-ფოსტა *</label>
              <input
                type="email"
                placeholder="example@redberry.ge"
                class="bg-gray-500 px-4 py-2 rounded-xl w-full mt-1"
              />
            </div>
          </div>
          <div class="mt-12 flex items-end justify-end">
            <button
              class="bg-[#5D37F3] py-2 w-[284px] text-white rounded-lg"
              @click="submitForm"
            >
              გამოქვეყნება
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "../assets/images/logo.png";
import arrowLeft from "../assets/images/arrow-left.png";
import addIcon from "../assets/images/folder-add.png";
import imageIcon from "../assets/images/gallery.png";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const apiURL = "https://api.blog.redberryinternship.ge/api/categories";

const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

const selectedFile = ref(null);

const categoryData = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    categoryData.value = response.data.data;
    // console.log(categoryData.value);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

onMounted(() => {
  fetchData();
});

const displaySelectedFile = (event) => {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    selectedFile.value = fileInput.files[0];
  }
};

const removePhoto = () => {
  selectedFile.value = null;
};

const router = useRouter();

const goBack = () => {
  // Use router.go(-1) to navigate back one step in the history.
  router.go(-1);
};

const submitForm = () => {
  console.log(1);
};
</script>

<style scoped></style>
