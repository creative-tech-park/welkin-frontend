<template>
  <div
    v-if="!props.loadSliders?.length"
    class="w-full h-full min-h-[70vh] bg-gray-400 animate-pulse"
  ></div>
  <swiper
    v-else
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :spaceBetween="30"
    :effect="'fade'"
    :loop="true"
    :navigation="{
      nextEl: '.next-button',
      prevEl: '.prev-button',
    }"
    :modules="modules"
    class="mySwiper h-auto"
  >
    <swiper-slide :key="slider" v-for="slider in props?.loadSliders">
      <img class="object-contain object-top" :src="slider?.image_url" alt="" />
    </swiper-slide>
    <div
      class="button cursor-pointer next-button right-[2rem] top-[30%] lg:right-[5rem] lg:top-[45%]"
    >
      <Icon
        name="material-symbols-light:arrow-right-alt"
        class="text-green-600 w-10 h-10 lg:w-14 lg:h-14"
      />
    </div>
    <div
      class="button cursor-pointer prev-button left-[2rem] top-[30%] lg:left-[5rem] lg:top-[45%]"
    >
      <Icon
        name="material-symbols-light:arrow-left-alt"
        class="text-green-600 w-10 h-10 lg:w-14 lg:h-14"
      />
    </div>
  </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Icon from "@/components/Icon.vue";

// Define props
const props = defineProps({
  loadSliders: {
    type: [Array, Object],
    required: true,
  },
});

// Expose modules
const modules = [Autoplay, EffectFade, Navigation, Pagination];
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
  max-height: 80vh;
  overflow: hidden;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
.mySwiper .button {
  transition: 0.3s all ease-in-out;
}

.mySwiper:hover .next-button {
  transform: scale(1) translateX(80%);
}

.mySwiper:hover .prev-button {
  transform: scale(1) translateX(-80%);
}

.next-button,
.prev-button {
  position: absolute;
  z-index: 1;
  transform: scale(0);
}
</style>
