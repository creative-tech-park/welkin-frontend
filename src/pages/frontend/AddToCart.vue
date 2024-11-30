<template>
  <AppLayout>
    <section class="container mx-auto">
      <OrderStep />
      <div class="flex flex-wrap p-8 px-0">
        <div class="w-full lg:w-2/3 font-playfair">
          <h2 class="text-2xl font-bold text-primary py-5">
            Cart - <span class="text-lg">({{ cartStore.getCartLength }})</span>
          </h2>01790148906
          <div
            class="flex flex-col lg:flex-row lg:gap-4"
            v-for="item in cartStore.cart"
            :key="item.id"
          >
            <div class="w-full lg:w-1/4">
              <div class="w-full h-auto py-4 pt-0">
                <img
                  class="w-40 object-cover rounded-lg"
                  :src="item?.thumbnail"
                  alt=""
                />
              </div>
            </div>

            <div class="w-full lg:w-3/4 px-5">
              <div class="flex flex-col lg:flex-row justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-primary pb-1 pt-0">
                    {{ item?.title }}
                  </h2>
                  <p class="font-normal text-md pt-0">
                    Price: Tk. {{ item?.price }}
                  </p>
                  <p class="font-normal text-[15px] pb-3 text-gray-700">
                    Quantity: {{ item?.buyQty }}
                  </p>
                </div>
                <div
                    class="w-20 lg:w-32 h-8 lg:h-10 border border-gray-400 flex items-center">
                  <button
                      @click="cartStore.decrementQty(item.id)"
                      class="text-black w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center">
                    <Icon name="ic:baseline-minus" />
                  </button>
                  <input
                      type="text"
                      class="w-8 lg:w-10 h-8 lg:h-10 border border-gray-400 text-center"
                      :value="item.buyQty"
                      readonly />
                  <button
                      @click="cartStore.incrementQty(item.id)"
                      class="text-black w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center">
                    <Icon name="material-symbols:add" />
                  </button>
                </div>

                <div class="flex items-center gap-6 text-gray-500 lg:pr-16">
                  <p class="font-normal text-black text-md">
                    Tk. {{ parseInt(item?.price) * parseInt(item?.buyQty) }}
                  </p>
                  <button
                    class="flex gap-2 items-center justify-center"
                    @click="cartStore.removeFromCart(item)"
                  >
                    <span class="font-normal text-md text-red-400">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/3 font-playfair pt-10">
          <div class="bg-white shadow-lg rounded-lg p-6 m-2">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              Cart Summary
            </h2>
            <ul class="space-y-4">
              <li
                class="flex items-center justify-between text-xl "
              >
                <span class="text-gray-600">Sub Total</span>
                <span class="text-gray-800"
                  >Tk {{ cartStore.getCartTotalPrice }}</span
                >
              </li>
            </ul>

            <div class="mt-6">
              <RouterLink
                to="/checkout"
                class="text-xl text-center bg-green-500 text-white hover:bg-green-600 transition duration-200 rounded-md py-2 w-full block"
              >
                Process to Checkout
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import { useCartStore } from "@/stores/useCartStore.js";
import { useAuthStore } from "@/stores/useAuthStore";
import {useRoute} from 'vue-router';
import OrderStep from "@/components/OrderStep.vue";

// Get user from useAuthStore
const authStore = useAuthStore();
const route = useRoute();
const cartStore = useCartStore();
cartStore.initCart();
</script>

<style scoped></style>
