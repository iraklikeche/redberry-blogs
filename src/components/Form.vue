<template>
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
            v-model="authorName"
            @input="typingAuthor = true"
            type="text"
            placeholder="შეიყვანეთ ავტორი"
            class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full outline-[#5d37f3] border outline-[1.5px]"
            :class="{
              'border-[#ea1919] border': isInputInvalid & typingAuthor,
              'border-[#14d81c] border': !isInputInvalid & typingAuthor,
            }"
          />
          <ul
            class="text-[#85858d] text-xs mt-2 pl-4 list-disc flex flex-col gap-1"
          >
            <li
              :class="{
                'text-green-500': typingAuthor && authorName.length >= 4,
                'text-red-500': typingAuthor && authorName.length < 4,
              }"
            >
              მინიმუმ 4 სიმბოლო
            </li>
            <li
              :class="{
                'text-green-500':
                  typingAuthor && authorName.trim().split(/\s+/).length >= 2,
                'text-red-500':
                  typingAuthor && authorName.trim().split(/\s+/).length < 2,
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
            v-model="title"
            type="text"
            @input="typingTitle = true"
            placeholder="შეიყვანეთ სათაური"
            class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full outline-[#5d37f3] border outline-[1.5px]"
            :class="{
              'border-[#ea1919] border': isTitleInvalid & typingTitle,
              'border-[#14d81c] border': !isTitleInvalid & typingTitle,
            }"
          />
          <ul class="text-[#85858d] text-xs mt-2">
            <li
              :class="{
                'text-green-500': typingTitle && title.length >= 2,
                'text-red-500': typingTitle && title.length < 2,
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
        v-model="description"
        :class="{
          'border-[#ea1919] border': isDescInvalid & typingDesc,
          'border-[#14d81c] border': !isDescInvalid & typingDesc,
        }"
        class="bg-[#e4e3eb] mt-1 w-full py-2 px-4 rounded-xl resize-none outline-[#5d37f3] border outline-[1.5px]"
        @input="typingDesc = true"
        rows="5"
        placeholder="შეიყვანეთ აღწერა"
      ></textarea>
      <p
        class="text-[#85858d] text-xs mt-1"
        :class="{
          'text-green-500': typingDesc && description.length >= 2,
          'text-red-500': typingDesc && description.length < 2,
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
          v-model="selectedDate"
          @input="userSelectedDate = true"
          type="date"
          placeholder="Select a date"
          value="2023-01-01"
          class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full mt-1 outline-[#5d37f3] border outline-[1.5px]"
          :class="{
            'border-[#14d81c] border': userSelectedDate && selectedDate,
          }"
        />
      </div>
      <div class="relative">
        <label class="font-bold">კატეგორია *</label>

        <select
          name="category"
          v-model="selectedCategory"
          @change="userSelectedCategory = true"
          class="bg-[#e4e3eb] px-4 py-[9px] rounded-xl w-full mt-1 cursor-pointer outline-[#5d37f3] border outline-[1.5px]"
          :class="{
            'border-[#14d81c]': userSelectedCategory && selectedCategory,
          }"
        >
          <option value="" disabled selected>აირჩიეთ კატეგორია</option>
          <option
            v-for="category in categoryData"
            :key="category.id"
            :style="{
              color: category.text_color,
              background: category.background_color,
            }"
          >
            {{ category.title }}
          </option>
        </select>
        <img
          :src="arrowDown"
          class="cursor-pointer absolute top-[50%] right-[10px] translate-x-[-10%] translate-y-[20%] pointer-events-none"
        />
      </div>
      <!-- ***************** EMAIL ********************* -->

      <div>
        <label class="font-bold">ელ-ფოსტა</label>
        <input
          v-model="email"
          type="email"
          placeholder="example@redberry.ge"
          @input="typingEmail = true"
          class="bg-[#e4e3eb] px-4 py-2 rounded-xl w-full mt-1 outline-[#5d37f3] border outline-[1.5px]"
          :class="{
            'border-[#ea1919] border': isEmailInvalid && typingEmail,
            'border-[#14d81c] border': !isEmailInvalid && typingEmail,
          }"
        />
        <ul v-if="typingEmail && isEmailInvalid">
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
    <div class="mt-6 flex items-end justify-end">
      <button
        class="bg-[#5D37F3] py-2 w-[284px] text-white rounded-lg"
        :class="{
          'opacity-50': isFormInvalid,
        }"
        :disabled="isFormInvalid"
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { fetchData } from "../components/getCategory.js";

const postRequestURL = "https://api.blog.redberryinternship.ge/api/blogs";
const token =
  "937af957925b8398c6c5e8b103b3578aa1e4edb43b00db8b3acd2e841d0d140d";

// ******************* VALIDATIONS ******************************
const selectedFile = ref(null);

const authorName = ref("");
const typingAuthor = ref(false);

const title = ref("");
const typingTitle = ref(false);

const description = ref("");
const typingDesc = ref(false);

const email = ref("");
const typingEmail = ref(false);

const selectedDate = ref("");
const userSelectedDate = ref(false);

const selectedCategory = ref("");
const userSelectedCategory = ref(false);

const isGeorgianLetters = computed(() => {
  const georgianLettersRegex = /^[\u10A0-\u10FF\s]+$/;
  return typingAuthor && georgianLettersRegex.test(authorName.value);
});

// **************************AUTHOR**************************

const isInputInvalid = computed(() => {
  const georgianLettersRegex = /^[\u10A0-\u10FF\s]+$/;
  const words = authorName.value.trim().split(/\s+/);
  return (
    authorName.value.length < 4 ||
    words.length < 2 ||
    !georgianLettersRegex.test(authorName.value)
  );
});

// ************************ TITLE **************************
const isTitleInvalid = computed(() => {
  return typingTitle && title.value.length < 2;
});

// ************************ Description **************************
const isDescInvalid = computed(() => {
  return typingDesc && description.value.length < 2;
});

// ************************ EMAIL **************************
const isEmailInvalid = computed(() => {
  return typingEmail && email.value.indexOf("@redberry.ge") <= 0;
});

const isFormInvalid = computed(() => {
  return (
    !selectedFile.value ||
    isInputInvalid.value ||
    isTitleInvalid.value ||
    isDescInvalid.value ||
    !userSelectedDate.value ||
    !userSelectedCategory.value
    // Add other validations as needed
  );
});

// ******************************** POST REQUEST ***************************

// SUBMISSION
const submitForm = async () => {
  console.log(1);
  if (!isFormInvalid.value) {
    try {
      const formData = new FormData();
      formData.append("author", authorName.value);
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("email", email.value);
      formData.append("publish_date", selectedDate.value);
      formData.append("categories", selectedCategory.value);
      formData.append("image", selectedFile.value);

      const response = await axios.post(postRequestURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Blog post submitted successfully!");
        // Handle the success case here
      } else {
        console.error("Failed to submit blog post:", response.data);
        // Handle the error case, show an error message to the user, etc.
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  } else {
    console.log("Form is invalid. Please check the input values.");
  }
};

// *************************************************************************

const categoryData = ref([]);

onMounted(async () => {
  try {
    categoryData.value = await fetchData();
  } catch (error) {
    console.error("Error in component:", error);
  }
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
</script>
