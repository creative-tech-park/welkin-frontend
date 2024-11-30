<template>
  <div class="ps-1">
    <!-- Swiper Gallery -->
    <Swiper
      :style="{
        '--swiper-navigation-color': '#000',
        '--swiper-pagination-color': '#000',
      }"
      :loop="true"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2 object-cover rounded-lg"
    >
      <SwiperSlide
        class="max-h-[22rem] w-full object-cover"
        v-for="img in images"
        :key="img"
      >
        <InnerImageZoom
          class="w-full h-full object-cover rounded-lg"
          :src="img"
          zoomType="hover"
        />
      </SwiperSlide>

      <!-- Video as a slide -->
      <SwiperSlide class="rounded-lg">
        <div class="relative w-full h-full">
          <img
            src="https://img.youtube.com/vi/2A3XAcStlh0/hqdefault.jpg"
            alt="Video Thumbnail"
            class="w-full h-full object-cover rounded-lg cursor-pointer"
            @click="openModal"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
            @click="openModal"
          >
            <span class="text-white text-lg">Play Video</span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

  

    <!-- Thumbnail Swiper -->
    <Swiper
      @swiper="setThumbsSwiper"
      :loop="true"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper mt-5 rounded-lg object-cover"
    >
      <!-- Video thumbnail slide -->
      <SwiperSlide class="rounded-lg">
        <div class="relative w-full h-full">
          <img
            src="https://img.youtube.com/vi/2A3XAcStlh0/hqdefault.jpg"
            alt="Video Thumbnail"
            class="w-full h-full object-cover rounded-lg cursor-pointer"
            @click="openModal"
          />
          <div
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
            @click="openModal"
          >
            <span class="text-white text-lg">Play Video</span>
          </div>
        </div>
      </SwiperSlide>

      <!-- Image thumbnails -->
      <SwiperSlide class="rounded-lg" v-for="img in images" :key="img">
        <img
          :src="img"
          alt="img"
          class="rounded-lg object-cover"
          style="border-radius: 5px; height: 100px"
        />
      </SwiperSlide>
    </Swiper>

    <!-- Video Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
    >
      <div class="relative w-11/12 md:w-3/4 lg:w-2/3">
        <button
          class="absolute top-0 right-0 p-2 text-white"
          @click="closeModal"
        >
          X
        </button>
        <iframe
          width="100%"
          height="520px"
          :src="video_url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";

import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const modules = [FreeMode, Navigation, Thumbs];
const thumbsSwiper = ref(null);
const isModalOpen = ref(false); // Modal visibility state

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// Opens the modal
const openModal = () => {
  isModalOpen.value = true;
};

// Closes the modal
const closeModal = () => {
  isModalOpen.value = false;
};

defineProps({
  images: {
    type: Array,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add any additional styles you need for your modal here */
</style>
