<template>
  <div class="bg-white p-3 px-0">
    <!-- <h2 class="text-lg text-green-800 font-semibold p-4 text-secondary capitalize">
      {{ category?.name }}
    </h2> -->
    <swiper
      :breakpoints="{
        '320': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }"
      :navigation="false"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="product in category.products">
        <ProductCard :product="product" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
const modules = [EffectFade, Navigation, Pagination, Autoplay];

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  category: {
    type: [Array, Object],
    required: true,
  },
});

onMounted(() => {
  console.log("Category:", props.category);
});
</script>
