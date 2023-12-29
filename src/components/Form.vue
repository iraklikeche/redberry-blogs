<template>
  <SuccessfullyAdded v-if="success" @modalClosed="closeSuccess" />
  <form class="max-w-[600px] pb-8" @submit.prevent="submitForm">
    <label class="font-bold">ატვირთე ფოტო</label>
    <div
      v-if="!form.image"
      class="image-container relative mt-2 border-dashed border border-[#85858d] rounded-xl py-12 flex flex-col items-center justify-center"
    >
      <img :src="addIcon" class="mb-4" />
      <div>
        <input
          type="file"
          @change="displaySelectedFile"
          class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer border-[#85858d]"
        />
        <p class="mt-2">
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
      class="bg-[#f2f2fa] py-4 px-4 rounded-xl flex justify-between items-center mt-2"
    >
      <div class="flex gap-2">
        <img :src="imageIcon" />

        <p>
          {{ selectedFileName }}
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
            v-model="form.author"
            @input="typingAuthor = true"
            type="text"
            placeholder="შეიყვანეთ ავტორი"
            class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full outline-[#5d37f3] border outline-[1.5px]"
            :class="{
              'border-[#ea1919] border': !isFieldValid.author() && typingAuthor,
              'border-[#14d81c] border': isFieldValid.author() && typingAuthor,
            }"
          />
          <ul
            class="text-[#85858d] text-xs mt-2 pl-4 list-disc flex flex-col gap-1"
          >
            <li
              :class="{
                'text-green-500': typingAuthor && form.author.length >= 4,
                'text-red-500': typingAuthor && form.author.length < 4,
              }"
            >
              მინიმუმ 4 სიმბოლო
            </li>
            <li
              :class="{
                'text-green-500':
                  typingAuthor && form.author.trim().split(/\s+/).length >= 2,
                'text-red-500':
                  typingAuthor && form.author.trim().split(/\s+/).length < 2,
              }"
            >
              მინიმუმ 2 სიტყვა
            </li>
            <li
              :class="{
                'text-green-500': typingAuthor && isGeorgianLetters,
                'text-red-500': typingAuthor && !isGeorgianLetters,
              }"
            >
              მხოლოდ ქართული ასოები
            </li>
          </ul>
        </div>
      </div>
      <div>
        <label class="font-bold">სათაური *</label>
        <div class="mt-1">
          <input
            v-model="form.title"
            type="text"
            @input="typingTitle = true"
            placeholder="შეიყვანეთ სათაური"
            class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full outline-[#5d37f3] border outline-[1.5px]"
            :class="{
              'border-[#ea1919] border': !isFieldValid.title() & typingTitle,
              'border-[#14d81c] border': isFieldValid.title() & typingTitle,
            }"
          />
          <ul class="text-[#85858d] text-xs mt-2">
            <li
              :class="{
                'text-green-500': typingTitle && form.title.length >= 2,
                'text-red-500': typingTitle && form.title.length < 2,
              }"
            >
              მინიმუმ 2 სიმბოლო
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- *************************** DESCRIPTION **************************************** -->
    <div class="mt-6">
      <label class="font-bold">აღწერა *</label>
      <textarea
        v-model="form.description"
        :class="{
          'border-[#ea1919] border': !isFieldValid.description() & typingDesc,
          'border-[#14d81c] border': isFieldValid.description() & typingDesc,
        }"
        class="bg-[#e4e3eb] mt-1 w-full py-2 px-4 rounded-xl resize-none outline-[#5d37f3] border outline-[1.5px]"
        @input="typingDesc = true"
        rows="5"
        placeholder="შეიყვანეთ აღწერა"
      ></textarea>
      <p
        class="text-[#85858d] text-xs mt-1"
        :class="{
          'text-green-500': typingDesc && form.description.length >= 2,
          'text-red-500': typingDesc && form.description.length < 2,
        }"
      >
        მინიმუმ 2 სიმბოლო
      </p>
    </div>

    <!-- *************************** DATE/CATEGORY/EMAIL ***************************** -->

    <div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-5">
      <div class="relative">
        <label class="font-bold">გამოქვეყნების თარიღი *</label>
        <input
          v-model="form.publish_date"
          @input="userSelectedDate = true"
          type="date"
          placeholder="Select a date"
          value="2023-01-01"
          class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full mt-1 outline-[#5d37f3] border outline-[1.5px]"
          :class="{
            'border-[#14d81c] border':
              userSelectedDate && !isFieldValid.publish_date(),
          }"
        />
      </div>
      <div class="relative">
        <label class="font-bold">კატეგორია *</label>

        <div
          class="custom-dropdown"
          @blur="handleBlur"
          @click="toggleDropdown"
          tabindex="0"
        >
          <div
            class="selected-option bg-[#e4e3eb] px-2 py-[8px] rounded-xl w-full mt-1 border-2 cursor-pointer text-[#85858d] whitespace-nowrap overflow-hidden"
            :class="{
              'border-[#14d81c] border-1':
                form.categories.length > 0 && !isFocused,
            }"
            :style="{
              background: form.categories
                ? form.categories.background_color
                : '#e4e3eb',
              color: form.categories ? form.categories.text_color : '#85858d',
              borderColor: isFocused ? ' #5d37f3' : '',
            }"
          >
            <span
              v-for="selectedCat in form.categories"
              :key="selectedCat.id"
              class="text-xs rounded-[30px] tracking-wider py-2 px-4 pr-2 font-medium cursor-pointer mr-2 last:mr-0 relative z-10"
              :style="{
                background: selectedCat.background_color,
                color: selectedCat.text_color,
              }"
            >
              {{ selectedCat.title }}
              <span
                @click="($event) => removeSelectedCategory($event, selectedCat)"
                class="inline-block align-middle"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.17188 10.8284L10.8287 5.17151"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8287 10.8285L5.17188 5.17163"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </span>

            <span v-if="form.categories.length === 0"> აირჩიეთ კატეგორია </span>
          </div>

          <div
            v-show="isDropdownOpen"
            class="absolute z-10 overflow-y-scroll w-full flex flex-wrap gap-[10px] rounded-xl gap-y-2 shadow-2xl shadow-black h-[144px] mt-2 py-2 px-4 bg-white"
          >
            <div
              v-for="category in categoryData"
              :key="category.id"
              class="text-xs rounded-[30px] tracking-wider py-2 px-4 font-medium border cursor-pointer"
              :style="{
                color: category.text_color,
                background: category.background_color,
              }"
              @click="selectCategory(category)"
            >
              {{ category.title }}
            </div>
          </div>
        </div>
        <div
          class="absolute top-[39%] right-[-2px] translate-x-[-10%] translate-y-[20%] pointer-events-none z-20 overflow-hidden"
        >
          <img
            :src="arrowDown"
            class="cursor-pointer bg-[#e4e3eb] p-1.5 rounded-r-[5px]"
          />
        </div>
      </div>
      <!-- ***************** EMAIL ********************* -->

      <div class="mt-2">
        <label class="font-bold">ელ-ფოსტა</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="example@redberry.ge"
          @input="typingEmail = true"
          class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full mt-1 outline-[#5d37f3] border outline-[1.5px]"
          :class="{
            'border-[#ea1919] border': !isFieldValid.email() && typingEmail,
            'border-[#14d81c] border': isFieldValid.email() && typingEmail,
          }"
        />
        <ul v-if="typingEmail && !isFieldValid.email()">
          <li class="flex gap-2 mt-2">
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
            <p class="text-[#ea1919] text-xs">
              მეილი უნდა მთავრდებოდეს @redberry.ge-ით
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="mt-10 flex items-end justify-end">
      <button
        class="bg-[#5D37F3] py-2 w-[284px] text-white rounded-lg"
        :class="{
          'opacity-50': !isFormValidRef,
        }"
        :disabled="!isFormValidRef"
      >
        გამოქვეყნება
      </button>
    </div>
  </form>
</template>

<script setup>
import addIcon from "../assets/images/folder-add.png";
import imageIcon from "../assets/images/gallery.png";
import arrowDown from "../assets/images/arrow-down.png";
import { ref, onMounted, computed, watchEffect, watch } from "vue";
import axios from "axios";
import { fetchData } from "../components/getCategory.js";
import SuccessfullyAdded from "@/components/SuccessfullyAdded.vue";
import { storeToRefs } from "pinia";
import { useFormStore } from "../stores/formStore.js";
const store = useFormStore();
const { detect } = store;
const { form, isFieldValid } = storeToRefs(store);

watch(
  store,
  () => {
    localStorage.setItem("form", JSON.stringify(form.value));
  },
  { deep: true }
);

const postRequestURL = "https://api.blog.redberryinternship.ge/api/blogs";
const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

const success = ref(false);
const closeSuccess = () => {
  success.value = false;
};

// ******************* VALIDATIONS ******************************

const isFocused = ref(false);
const selectedFileName = ref(null);

const typingAuthor = ref(false);
const typingTitle = ref(false);
const typingDesc = ref(false);
const typingEmail = ref(false);

const userSelectedDate = ref(false);
const userSelectedCategories = ref(false);

const isDropdownOpen = ref(false);

const resetForm = () => {
  localStorage.removeItem("form");
  detect();
};

const isFormValidRef = computed(() => {
  return isFieldValid.value.all();
});

// ********************************************** CATEGORIES DROPDOWN **********************************************

const toggleDropdown = () => {
  isFocused.value = true;
  isDropdownOpen.value = !isDropdownOpen.value;
  userSelectedCategories.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  isDropdownOpen.value = false;
  userSelectedCategories.value = false;
};

const selectCategory = (category) => {
  if (
    !form.value.categories.some((selectedCat) => selectedCat.id === category.id)
  ) {
    form.value.categories.push(category);
  }
  isDropdownOpen.value = false;
};

const removeSelectedCategory = (event, selectedCat) => {
  event.stopPropagation();
  form.value.categories = form.value.categories.filter(
    (cat) => cat.id !== selectedCat.id
  );
};

// ************************ VALIDATIONS ***************************

const isGeorgianLetters = computed(() => {
  const georgianLettersRegex = /^[\u10A0-\u10FF\s]+$/;
  return typingAuthor && georgianLettersRegex.test(form.value.author);
});

const submitForm = async () => {
  const sendRequest = { ...form.value };
  sendRequest.categories = JSON.stringify(
    sendRequest.categories.map((el) => el.id)
  );
  sendRequest.image = convertBack();

  try {
    const response = await axios.post(postRequestURL, sendRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 204) {
      // Handle the success case here
      success.value = true;
      resetForm();
    } else {
      console.error("Failed to submit blog post:", response.data);
    }
  } catch (error) {
    console.error("Error submitting blog post:", error);
    try {
      const errorResponse = error.response;
      if (errorResponse && errorResponse.data && errorResponse.data.errors) {
        console.error("Validation Errors:", errorResponse.data.errors);
      }
    } catch (error) {
      console.error("Error handling validation errors:", error);
    }
    // Log specific validation errors from the API response
  }
};

// ***************GET CATEGORIES**********************

const categoryData = ref([]);

onMounted(async () => {
  try {
    categoryData.value = await fetchData();
  } catch (error) {
    console.error("Error in component:", error);
  }
});

// *************************************************

const displaySelectedFile = async (event) => {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    selectedFileName.value = fileInput.files[0].name;
    let file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        form.value.image = base64String;
      };
    }
  }
  localStorage.setItem("fileName", JSON.stringify(selectedFileName.value));
};

const b64toBlob = (b64Data) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: "image/png" });
};

const convertBack = () => {
  if (JSON.parse(localStorage.getItem("form"))) {
    const base64Data = JSON.parse(localStorage.getItem("form")).image.split(
      ","
    )[1];
    const blob = b64toBlob(base64Data);
    const file = new File([blob], "converted_image.png", { type: "image/png" });
    return file;
  }
};

const removePhoto = () => {
  form.value.image = null;
};

if (JSON.parse(localStorage.getItem("fileName"))) {
  selectedFileName.value = JSON.parse(localStorage.getItem("fileName"));
}
</script>
