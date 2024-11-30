<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { inject, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SearchArea from "@/components/SearchArea.vue";

const toggleNav = ref(false);
const cartStore = useCartStore();
const authStore = useAuthStore();

const route = useRoute();
const settings = inject("settings");
const locations = inject("locations");
const categories = inject("categories");
const parentCats = inject("parentCats");

// Reactive variable to control subcategories visibility
const showSubcategories = ref(false);

// Function to toggle subcategories visibility
const toggleSubcategories = () => {
  showSubcategories.value = !showSubcategories.value;
};
</script>

<template>
  <!--  phone nav bar-->

  <nav
    class="lg:hidden lg:px-5 px-1 z-50 fixed top-0 left-0 right-0 w-full bg-white shadow-xl"
  >
    <!--        menu & logo  -->
    <div class="flex items-center justify-between">
      <div>
        <RouterLink to="/" class="">
          <img
            class="w-16 h-auto p-2"
            src="@/assets/images/logo.png"
            alt="Logo"
          />
        </RouterLink>
      </div>

      <div>
        <!--            menu bar-->
        <div class="flex items-center gap-3">
          <RouterLink
            :to="{ name: 'AddToCart' }"
            class="gap-3 group cursor-pointer flex items-center cart-button"
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

          <div class="elegance-hamburger-menu" @click="toggleNav = !toggleNav">
            <div
              class="elegance-hamburger-menu__btn"
              :class="{ 'elegance-hamburger-menu__btn--active': toggleNav }"
            >
              <span></span>
            </div>
          </div>
        </div>

        <div
          :class="{
            'translate-x-0': toggleNav,
            'translate-x-full': !toggleNav,
            'bg-white': !authStore.isLoggedIn,
            'bg-primary-500': authStore.isLoggedIn,
          }"
          class="fixed w-full top-0 right-0 bottom-0 h-full z-50 lg:hidden transition-all ease-in-out duration-500 border-2 border-gray-100 overflow-y-scroll"
        >
          <div class="flex justify-between py-4 px-3 border-b">
            <button @click="toggleNav = false">
              <Icon
                name="material-symbols:close-small"
                class="text-4xl"
                :class="authStore.isLoggedIn ? 'text-white' : 'text-secondary'"
              />
            </button>

            <RouterLink
              to="/login"
              v-if="!authStore.isLoggedIn"
              class="flex gap-1 text-lg text-primary font-medium"
            >
              Login
              <Icon
                name="mdi:account-arrow-right-outline"
                class="text-2xl text-secondary"
              />
            </RouterLink>
          </div>

          <div class="bg-primary-500" v-if="authStore?.isLoggedIn">
            <ul class="flex flex-col gap-5 p-5">
              <li>
                <RouterLink to="/dashboard" class="flex items-center gap-2">
                  <div
                    class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="ic:twotone-dashboard-customize"
                      size="20"
                      class="text-white"
                    />
                  </div>
                  <p class="text-white">Dashboard</p>
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  :to="{ name: 'Addresses' }"
                  class="flex items-center gap-2"
                >
                  <div
                    class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="carbon:category-new-each"
                      size="20"
                      class="text-white"
                    />
                  </div>
                  <p class="text-white">Address</p>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/dashboard/order"
                  class="flex items-center gap-2"
                >
                  <div
                    class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="material-symbols:shopping-cart-outline-sharp"
                      size="20"
                      class="text-white"
                    />
                  </div>
                  <p class="text-white">Order</p>
                </RouterLink>
              </li>

              <li>
                <button
                  @click="authStore.logout()"
                  class="flex items-center gap-2"
                >
                  <div
                    class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
                  >
                    <Icon
                      name="ri:logout-circle-line"
                      size="20"
                      class="text-white"
                    />
                  </div>
                  <p class="text-white">Logout</p>
                </button>
              </li>
            </ul>
          </div>

          <div v-else class="px-4 py-3 text-gray-600">
            <div class="h-7 bg-primary-500">
              <div class="col-span-8 flex items-center h-full border-e px-1">
                <marquee class="text-white text-xs">
                  {{ settings?.profile?.footer_cntent }}
                </marquee>
              </div>
            </div>

            <div class="mt-5 relative">
              <SearchArea></SearchArea>
              <!--              <div class="w-full h-10 relative">-->
              <!--                <input class="border-2 h-full p-4 border-hover-500 rounded-md w-full font-normal text-xs placeholder-gray-400 focus:border-hover-500 focus:outline-none outline-none" placeholder="Search: Cakes, Cookies, Biscuits..."/>-->
              <!--                <RouterLink class="absolute px-5 py-1 bg-primary-500 rounded-md top-1 right-1 text-white" to="/">Search</RouterLink>-->
              <!--              </div>-->
            </div>

            <div class="mt-5">
              <h1 class="border-b font-bold text-lg">Menus</h1>
              <ul class="flex flex-col gap-2 mt-5">
                <li class="font-bold text-sm text-primary-300">
                  <RouterLink to="/">Home</RouterLink>
                </li>

                <!-- Categories with a click event -->
                <li
                  class="font-bold text-sm cursor-pointer"
                  @click="toggleSubcategories"
                >
                  Categories
                </li>

                <!-- Static subcategories displayed when "Categories" is clicked -->
                <ul
                  :key="category"
                  v-for="category in parentCats"
                  v-show="showSubcategories"
                  class="ml-4 flex flex-col gap-2"
                >
                  <li class="text-sm">
                    <RouterLink
                      :to="`/all-products?category=${category?.id}`"
                      class="flex items-center gap-1 group/item"
                    >
                      {{ category.name }}
                    </RouterLink>
                  </li>
                </ul>

                <!-- Dynamic pages from settings -->
                <li
                  class="font-bold text-sm"
                  v-for="item in settings?.header?.pages"
                  :key="item.id"
                >
                  <RouterLink
                    :to="{ name: 'SinglePage', params: { id: item.id } }"
                  >
                    {{ item?.title }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!--  phone nav bar end-->
</template>
