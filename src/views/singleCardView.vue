<template>
  <Navbar />
  <div class="px-20">
    <div class="grid grid-cols-[25%,75%] justify-center">
      <div>
        <img :src="arrowLeft" class="cursor-pointer" @click="goBack" />
      </div>
      <div class="grid grid-cols-1 max-w-2xl">
        <img src="https://picsum.photos/720/330" class="rounded-lg" />
        <p class="text-xs font-extrabold mt-8 mb-2">ავტორი</p>
        <p class="text-xs mb-4 text-[#85858D]">
          11.11.11 &#x2022; email@redberry.ge
        </p>
        <p class="font-bold text-3xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
          nisi!
        </p>
        <p class="my-6">CATEGORIES,CATEGORIES1,CATEGORIES2</p>
        <p class="mb-4 text-[#404049]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quia,
          eaque dolorem quos sit tempore unde hic tenetur saepe, neque et rem
          nobis, debitis dolorum quidem? Tempore corporis eveniet quod modi,
          tempora dolores consectetur ipsum obcaecati officiis commodi
          temporibus suscipit veniam animi optio. Fugit velit voluptates,
          reprehenderit iure dolorum qui deleniti amet molestias voluptate
          assumenda veritatis dolore saepe non sequi aliquid quidem. Impedit
          voluptatibus amet corporis a, error ad quas placeat necessitatibus
          odio vero! Dolores, ratione, aliquid dolorem reiciendis laboriosam
          veniam perspiciatis deserunt unde vel perferendis ea at fuga sunt a
          mollitia, ab veritatis expedita quod optio itaque debitis facilis
          voluptatibus. Tempore, mollitia odio natus officiis vitae molestias
          nulla iure perspiciatis delectus necessitatibus reiciendis aliquam
          aspernatur est beatae quidem error hic. At quas id eligendi
          perferendis ea, suscipit dignissimos reprehenderit. Illum obcaecati,
          esse officiis, quae temporibus, dolores ducimus provident odit nisi ea
          a quibusdam odio neque dignissimos? Provident nemo nostrum blanditiis
          molestiae tenetur consequatur nisi velit dicta corrupti cupiditate?
          Voluptatibus, rerum. Reiciendis dignissimos assumenda adipisci facere
          quisquam modi, necessitatibus autem minus qui pariatur dicta, ipsa
          aliquid alias laborum, corrupti optio quidem maiores officia tempora
          quas voluptas perferendis repellat! Cum autem repudiandae omnis et
          esse. Earum pariatur eligendi labore qui ea.
        </p>
      </div>
    </div>
    <div class="mt-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black">მსგავსი სტატიები</h2>
        <div>
          <button>1</button>
          <button>2</button>
        </div>
      </div>
      <Card />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import arrowLeft from "../assets/images/Arrow-left.png";

const router = useRouter();

const goBack = () => {
  // Use router.go(-1) to navigate back one step in the history.
  router.go(-1);
};

const goToHomePage = () => {
  // Use the router.push method to navigate to the home page
  router.push({ name: "home" });
};
</script>
