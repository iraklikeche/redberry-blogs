import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useFormStore = defineStore("formStore", () => {
  const georgianLettersRegex = /^[\u10A0-\u10FF\s]+$/;
  let loadData = JSON.parse(localStorage.getItem("form"));

  const form = ref({
    author: loadData ? loadData.author : "",
    title: loadData ? loadData.title : "",
    description: loadData ? loadData.description : "",
    email: loadData ? loadData.email : "",
    publish_date: loadData ? loadData.publish_date : "",
    categories: loadData ? loadData.categories : [],
    image: loadData ? loadData.image : "",
  });

  const isFieldValid = ref({
    author: () => {
      return (
        form.value.author.length > 4 &&
        form.value.author.trim().split(/\s+/).length > 1 &&
        georgianLettersRegex.test(form.value.author)
      );
    },
    title: () => {
      return form.value.title.length >= 2;
    },
    description: () => {
      return form.value.description.length >= 2;
    },
    email: () => {
      const emailValue = form.value.email;
      return emailValue === "" || /^[^\s@]+@redberry\.ge$/.test(emailValue);
    },
    publish_date: () => {
      return form.value.publish_date;
    },
    categories: () => {
      return form.value.categories.length > 0;
    },
    image: () => {
      return form.value.image;
    },
    all: () => {
      return (
        isFieldValid.value.author() &&
        isFieldValid.value.title() &&
        isFieldValid.value.description() &&
        isFieldValid.value.publish_date() &&
        isFieldValid.value.categories() &&
        isFieldValid.value.image() &&
        isFieldValid.value.email()
      );
    },
  });

  function detect() {
    form.value = {
      author: "",
      title: "",
      description: "",
      email: "",
      publish_date: "",
      categories: [],
      image: "",
    };
  }

  return { form, isFieldValid, detect };
});
