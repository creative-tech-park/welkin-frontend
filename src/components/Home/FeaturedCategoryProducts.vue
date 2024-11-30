<template>
  <div class="container mx-auto mt-20">
    <div class="border-b flex items-center w-full justify-center">
      <ul class="flex items-center gap-10">
        <li
          v-for="(item, index) in homeStore.featuredCategoryProducts"
          :key="index"
          @click="homeStore.currentCat = 'cat-item-' + item?.id"
          :class="
            homeStore.currentCat === 'cat-item-' + item?.id
              ? 'border-hover-500 text-green-900'
              : 'border-white text-gray-600'
          "
          class="text-sm lg:text-2xl font-bold cursor-pointer capitalize border-b-4 pb-5 hover:border-hover-500 transition-all ease-in-out duration-100"
        >
          {{ item?.name }}
        </li>
      </ul>
    </div>

    <div>
      <transition-group name="fade" tag="div">
        <div v-for="item in homeStore.featuredCategoryProducts" :key="item.id">
          <transition name="fade">
            <ProductSlider
              v-if="homeStore.currentCat === 'cat-item-' + item?.id"
              :category="item"
              :data="homeStore.currentCat"
            />
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/homeStore";
import ProductSlider from "@/components/ProductSlider.vue";

const homeStore = useHomeStore();
</script>

<style></style>
