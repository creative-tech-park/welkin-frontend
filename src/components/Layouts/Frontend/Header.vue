<script setup>
import MobileNav from "@/components/Layouts/Frontend/MobileNav.vue";
import SideNav from "@/components/Layouts/Frontend/SideNav.vue";
import { inject, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { useCartStore } from "@/stores/useCartStore.js";
import { useAuthStore } from "@/stores/useAuthStore.js";
import useAxios from "@/composables/useAxios.js";
import HeaderNav from "@/components/Layouts/Frontend/HeaderNav.vue";
import SearchArea from "@/components/SearchArea.vue";

const cartStore = useCartStore();
cartStore.initCart();

const authStore = useAuthStore();

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const settings = inject("settings");
const { sendRequest, error, loading } = useAxios();
const pages = ref([]);
const getAllPages = async () => {
  const data = await sendRequest({
    url: "/v1/pages",
    method: "GET",
  });
  pages.value = data.data?.page;
};

onMounted(async () => {
  await getAllPages();
});

window.addEventListener("scroll", function (event) {
  const menu = document.getElementById("menu-header");
  if (window.scrollY > 200) {
    menu?.classList?.add("addClassScroll");
  } else {
    menu?.classList?.remove("addClassScroll");
  }
});
</script>

<template>
  <div class="relative">
    <!--  top app add bar start   -->
    <!-- <div class="hidden lg:flex items-center justify-center h-7 bg-secondary-500">
      <p class="capitalize text-primary-900 text-xs">Ordering made simpler and easier. <RouterLink class="underline" to="/">Visit here</RouterLink></p>
    </div> -->
    <!--  top app add bar end   -->

    <!--  marque bar start   -->
    <div class="h-10 hidden lg:block bg-primary-500">
      <div class="container mx-auto h-full">
        <div class="grid grid-cols-12 items-center h-full">
          <div class="col-span-8 flex items-center h-full border-e px-5">
            <marquee class="text-white text-xs">
              {{ settings?.profile?.footer_cntent }}
            </marquee>
          </div>

          <div class="col-span-4 w-full h-full px-6">
            <ul class="flex gap-3 items-center justify-between h-full w-full">
              <li>
                <ul class="flex gap-2">
                  <li
                    :key="key"
                    class="capitalize text-white hover:text-secondary-200 hover:underline"
                    v-for="(item, key) in settings?.social"
                  >
                    <a target="_blank" :href="item">{{ item ? key : "" }}</a>
                  </li>
                </ul>
              </li>

              <li class="flex items-center text-white gap-1">
                <Icon name="heroicons-outline:user" />
                <div v-if="authStore.isLoggedIn">
                  <RouterLink to="/dashboard" class="text-sm"
                    >Dashboard</RouterLink
                  >
                </div>
                <div v-else class="flex items-center">
                  <RouterLink :to="{ name: 'Login' }" class="text-sm"
                    >Sign in</RouterLink
                  >
                  <span>/</span>
                  <RouterLink :to="{ name: 'Register' }" class="text-sm"
                    >Register</RouterLink
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--  marque bar start   -->
    <!--   search login reg bar start   -->
    <div
      class="container hidden lg:flex items-center justify-between mx-auto py-2"
    >
      <RouterLink to="/">
        <img
          src="@/assets/images/logo.png"
          class="object-contain h-14"
          alt=""
        />
      </RouterLink>
      <SearchArea class="w-[45%] h-10 relative"></SearchArea>
      <div class="flex h-full items-center justify-between gap-4">
        <div
          class="flex gap-3 group cursor-pointer transition-all ease-in-out duration-500"
        >
          <div>
            <Icon
              class="w-12 h-12 group-hover:text-hover-500 text-gray-800 stroke-[1px] transition-all ease-in-out duration-500"
              name="basil:phone-outline"
            />
          </div>
          <div class="group-hover:text-primary/50">
            <p
              class="text-xs group-hover:text-hover-500 text-gray-500 font-normal transition-all ease-in-out duration-500"
            >
              Call us now:
            </p>
            <a href="tel:{{ settings?.profile?.phone }}">
              <p
                class="font-semibold group-hover:text-hover-500 transition-all ease-in-out duration-500"
              >
                {{ settings?.profile?.phone }}
              </p>
            </a>
          </div>
        </div>
        <span class="w-[1px] h-full min-h-6 bg-gray-500"> </span>
        <RouterLink
          :to="{ name: 'AddToCart' }"
          class="flex gap-3 group cursor-pointer"
        >
          <div class="group-hover:text-primary/50">
            <p
              class="text-xs group-hover:text-hover-500 text-gray-500 font-normal transition-all ease-in-out duration-500"
            >
              Shopping Cart:
            </p>
            <p
              class="font-semibold group-hover:text-hover-500 transition-all ease-in-out duration-500"
            >
              Tk. {{ cartStore?.getCartTotalPrice }}
            </p>
          </div>
          <div class="relative">
            <Icon
              name="material-symbols-light:shopping-bag-outline-sharp"
              class="w-12 h-12 group-hover:text-hover-500 text-gray-800 stroke-[1px] transition-all ease-in-out duration-500"
            />
            <span
              class="absolute bg-hover-500 w-5 h-5 rounded-full text-white font-semibold flex items-center justify-center top-2 right-0"
            >
              {{ cartStore?.getCartLength }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
    <!--   search login reg bar start   -->
    <!--  menu bar start  -->
    <div class="header-bg hidden lg:block border-y" id="menu-header">
      <div class="container mx-auto">
        <HeaderNav></HeaderNav>
      </div>
    </div>
    <!--  menu bar start  -->

    <MobileNav />
  </div>
</template>

<style>
.header-bg {
  backdrop-filter: blur(30px);
  background: #ffffffa1;
  position: relative;
  z-index: 11;
  transition: all 1s ease-in-out;
}
.addClassScroll {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 1s ease-in-out;
}
.addClassScroll nav {
  border-top: none !important;
}
.addClassScroll .cart-button {
  display: flex;
}
</style>
