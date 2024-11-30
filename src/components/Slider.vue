<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import {Autoplay, Pagination, Navigation, EffectFade} from 'swiper/modules';
import Icon from "@/components/Icon.vue";

const modules = [Autoplay, Pagination, Navigation, EffectFade];

const props = defineProps({
  sliders: Array
})

</script>

<template>
  <Swiper
      :autopaly="{
        delay: 5000,
        disableOnInteraction: true,
      }"
      :effect="'fade'"
      :loop="true"
      :speed=50
      :mousewheel="{
        forceToAxis: true
      }"
      :navigation="{
        nextEl: '.next-button',
        prevEl: '.prev-button',
      }"
      :modules="modules"
      :grabCursor="true"
      class="mySwiper"
  >
    <SwiperSlide>
      <div class="relative w-full h-full">
        <img src="https://breadandbeyondbd.com/Ecom/Slider/0mcdfRya.png"
             class="w-full h-full object-cover" alt="">
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="relative w-full h-full">
        <img src="https://breadandbeyondbd.com/Ecom/Slider/cxmwLs84.png"
             class="w-full h-full object-cover" alt="">
      </div>
    </SwiperSlide>
    <div class="button cursor-pointer next-button">
      <Icon name="material-symbols-light:arrow-right-alt" class="text-secondary-600 w-24 h-24"/>
    </div>
    <div class="button cursor-pointer prev-button">
      <Icon name="material-symbols-light:arrow-left-alt" class="text-secondary-600 w-24 h-24"/>
    </div>
  </Swiper>
</template>


<style scoped>
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

.prev-button {
  left: 5rem;
  top: 30%
}

.next-button {
  right: 5rem;
  top: 30%
}
</style>

<!--
<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
    background: #000;
    &-slide {
        height: 100vh !important;
        color: #fff;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0, 0.6);
            z-index: 99;
        }
        img {
            transform: scale(1);
            transition: all ease-in-out 5s !important;
        }
        .content {
            position: absolute;
            top: 70%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            z-index: 999;
        }
        &-active {
            img {
                transform: scale(1.2);
                transition: all ease-in-out 5s !important;
            }
            .content {
                top: 50%;
                transition: all 2s !important;
                opacity: 1;
            }
        }
    }
}


.swiper-button-prev, .swiper-button-next{
    width:30px !important;
    height: 30px !important;
    border: 1px solid #fff !important;
    border-radius: 999px;
    &::after {
        content: unset !important;
    }
}

.swiper-button-prev svg, .swiper-button-next svg {
    width: 20px !important;
    height: 20px !important;
}
</style>
-->
