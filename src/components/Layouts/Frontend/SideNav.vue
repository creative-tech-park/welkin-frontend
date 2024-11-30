<script setup>
import {defineProps, defineEmits, ref, inject, onMounted} from "vue";
import {onClickOutside} from '@vueuse/core'
import useAxios from "@/composables/useAxios.js";
import {useRoute} from "vue-router";
const route = useRoute();
const props = defineProps({
  isOpen: Boolean,
});


const emit = defineEmits(["modal-close"]);
const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

const settings = inject('settings')
const locations = inject('locations')
const categories = inject('categories')

</script>

<template>
  <div class="fixed top-0  bottom-0 right-0  h-screen z-50 bg-black/60  transition-all ease-in-out duration-700"
       :class="{'w-full opacity-100 ': isOpen, 'w-0 opacity-0': !isOpen}"></div>

  <div
      class=" w-[450px] transition-all ease-in-out duration-1000 h-screen fixed z-50 bg-gray-50 top-0 left-0 bottom-0 overflow-y-scroll hidden lg:block"
      :class="{'translate-x-0': isOpen, '-translate-x-[450px]': !isOpen}" ref="target">
    <div class="flex justify-end p-5">
      <button @click.stop="emit('modal-close')">
        <Icon name="material-symbols:close" class=" text-5xl text-primary hover:text-secondary p-1"/>
      </button>
    </div>

    <div class="px-8 py-5 text-gray-600 ">
      <h2 class="tracking-widest font-playfair font-extrabold text-2xl">Top Category</h2>
      <ul class="py-5 px-4 font-playfair leading-loose font-semibold text-md tracking-widest">
        <li class=" uppercase hover:text-secondary" v-for="item in categories">
          <RouterLink :to="{name:'AllProducts', query:{...route.params, category:item?.id}}">
            {{ item?.name }}
          </RouterLink>
        </li>
      </ul>

      <h2 class="tracking-widest font-playfair font-extrabold text-2xl">Our Branch</h2>
      <ul class="py-5 px-4 font-playfair leading-relaxed font-medium text-md tracking-wider">
        <li v-for="(item) in locations">{{ item?.name }} - {{ item?.address }}</li>
      </ul>

      <h2 class="tracking-widest font-playfair font-extrabold text-2xl">Contact Us</h2>
      <ul class="pt-4 px-4 font-playfair leading-relaxed font-medium text-md tracking-wider">
        <li class="font-roboto text-sm ">Support:- {{ settings?.profile?.phone }}</li>
        <li class="font-roboto text-sm ">Whatsapp:- {{ settings?.profile?.whatsapp }}</li>
      </ul>

      <ul class="flex items-center gap-2 p-5">
        <li v-if="settings?.social?.instagram">
          <a :href="settings?.social?.instagram"
             class="w-8 h-8 flex items-center justify-center  text-white bg-primary-500 hover:bg-secondary-500 p-1">
            <Icon name="mdi:twitter" class=" text-2xl"/>
          </a>
        </li>
        <li v-if="settings?.social?.facebook">
          <a :href="settings?.social?.facebook"
             class="w-8 h-8 flex items-center justify-center text-white bg-primary-500 hover:bg-secondary-500 p-1">
            <Icon name="gg:facebook" class=" text-2xl"/>
          </a>
        </li>
        <li v-if="settings?.profile?.whatsapp">
          <a :href="`https://wa.me/${settings?.profile?.whatsapp}`"
             class="w-8 h-8 flex items-center justify-center text-white bg-primary-500 hover:bg-secondary-500 p-1">
            <Icon name="mingcute:whatsapp-line" class=" text-2xl"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>