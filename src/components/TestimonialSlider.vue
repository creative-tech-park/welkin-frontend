<template>
  <swiper
      :navigation="true"
      :modules="modules"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      :loop="true"
      class="mySwiper">
    {{ reviews }}
    <swiper-slide v-for="review in reviews?.data">
      <div class="flex flex-col  items-center justify-center lg:px-28">
        <h3 class="text-white text-md lg:text-xl font-roboto font-normal tracking-wider text-center italic">
          "{{ review?.message }}"
        </h3>
        <div class="flex gap-10 items-center justify-center pt-5">
          <div>
            <img class="lg:w-24 lg:h-24 w-16 h-16 rounded-full lg:my-8"
                 :src="review?.profile_image" alt="">
          </div>
          <div>
            <h3 class="font-roboto font-medium text-md text-white">{{ review?.name }}</h3>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import {onMounted, ref} from 'vue';
const {sendRequest, loading, error} = useAxios();
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import {Navigation, Autoplay} from 'swiper/modules';
import useAxios from "@/composables/useAxios.js";

// Define the Swiper modules
const modules = ref([Navigation, Autoplay]);

const reviews = ref([])
onMounted(async () => {
  const data = await sendRequest({
    url: '/v1/all-reviews'
  })
  reviews.value = data.data

})

</script>
<style scoped>

</style>
