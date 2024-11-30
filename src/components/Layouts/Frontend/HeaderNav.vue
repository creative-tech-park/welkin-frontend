<template>
  <nav class="flex py-0 justify-between">
    <ul class="flex flex-wrap items-center font-medium text-sm">
      <li class="p-4 lg:px-5 lg:ps-1">
        <RouterLink
          to="/"
          class="font-bold hover:text-primary-300"
          :class="$route.name === 'Home' ? 'text-primary-300' : ''"
          href="#"
          >Home
        </RouterLink>
      </li>

      <!--      <li class="p-4 lg:px-5" v-for="page in settings?.header?.pages">
              <RouterLink  :to="{name: 'SinglePage', params:{id:page.id}}" class="font-bold hover:text-primary-300">
                {{ page?.title }}
              </RouterLink>
            </li>-->

      <li
        class="p-4 lg:px-5 relative flex items-center space-x-1 group transition-all ease-in-out duration-500"
      >
        <a class="text-slate-800 font-bold hover:text-slate-900" href="#0"
          >Menu</a
        >
        <button class="shrink-0 p-1">
          <span class="sr-only">Show submenu for "Flyout Menu"</span>
          <svg
            class="w-3 h-3 fill-slate-500"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <path d="M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z" />
          </svg>
        </button>
        <!-- 2nd level menu -->
        <div
          class="z-20 hidden p-8 w-full custom-scroll overflow-y-scroll h-full min-h-[50vh] group-hover:block origin-top-right absolute top-full left-1/2 -translate-x-[5rem] min-w-[960px] bg-white border border-slate-200 rounded-lg shadow-xl"
        >
          <div class="flex items-start gap-8">
            <div>
              <p class="text-lg font-semibold mb-3">General Categories</p>
              <ul class="flex flex-col gap-2 ms-2">
                <li v-for="cat in mainCats" :key="cat.id">
                  <RouterLink
                    :to="`/all-products?category=${cat?.id}`"
                    class="flex items-center gap-1 group/item"
                  >
                    {{ cat?.name }}
                    <Icon
                      name="material-symbols:arrow-right-alt"
                      class="text-primary-200 hidden group-hover/item:block transition-all ease-in-out duration-200"
                    />
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-for="item in withChildCats">
              <RouterLink :to="`/all-products?category=${item?.id}`">
                <p class="text-lg font-semibold mb-3">
                  {{ item?.name }}
                </p></RouterLink
              >
              <ul class="flex flex-col gap-2 ms-2">
                <li
                  class=""
                  v-for="cat in item?.children_recursive"
                  :key="cat.id"
                >
                  <RouterLink
                    :to="`/all-products?category=${cat?.id}`"
                    class="flex items-center gap-1 group/item"
                  >
                    {{ cat?.name }}
                    <Icon
                      name="material-symbols:arrow-right-alt"
                      class="text-primary-200 hidden group-hover/item:block transition-all ease-in-out duration-200"
                    />
                  </RouterLink>
                  <ul class="ms-2">
                    <li
                      class="text-xs text-primary-300 hover:text-primary-800"
                      v-for="ccCat in cat?.children_recursive"
                    >
                      <RouterLink :to="`/all-products?category=${ccCat?.id}`">
                        {{ ccCat?.name }}
                      </RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>

      <li class="p-4 lg:px-5">
        <RouterLink to="/custom-cake" class="font-bold hover:text-primary-300"
          >Custom Cake</RouterLink
        >
      </li>
      <!--      <li class="p-4 lg:px-5">
              <RouterLink to="#" class="font-bold hover:text-primary-300" href="#">About Us</RouterLink>
            </li>
            <li class="p-4 lg:px-5">
              <RouterLink to="#" class="font-bold hover:text-primary-300" href="#">Reward Club</RouterLink>
            </li>-->

      <li class="p-4 lg:px-5" v-for="page in settings?.header?.pages">
        <RouterLink
          :to="{ name: 'SinglePage', params: { id: page.id } }"
          class="font-bold hover:text-primary-300"
        >
          {{ page?.title }}
        </RouterLink>
      </li>

      <li class="p-4 lg:px-5">
        <RouterLink
          to="/contact"
          class="text-slate-800 font-bold hover:text-slate-900"
          href="#"
          >Contact</RouterLink
        >
      </li>
    </ul>

    <RouterLink
      :to="{ name: 'AddToCart' }"
      class="hidden gap-3 group cursor-pointer cart-button"
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
  </nav>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/useCartStore.js";
import { computed, inject } from "vue";

const cartStore = useCartStore();
cartStore.initCart();

const settings = inject("settings");
const parentCats = inject("parentCats");

const withChildCats = computed(() =>
  parentCats.value.filter((item) => item.children_recursive?.length > 0)
);
const mainCats = computed(() =>
  parentCats.value.filter((item) => !item.children_recursive?.length)
);
</script>
