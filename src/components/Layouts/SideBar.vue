<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { inject } from "vue";
const props = defineProps({
  text: {
    type: Boolean,
    default: true,
  },
});
const authStore = useAuthStore();
</script>

<template>
  <div class="mx-auto">
    <div>
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
          <RouterLink to="/dashboard/order" class="flex items-center gap-2">
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
          <RouterLink to="/dashboard/custom-cake-orders" class="flex items-center gap-2">
            <div
              class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
            >
              <Icon
                name="material-symbols:shopping-cart-outline-sharp"
                size="20"
                class="text-white"
              />
            </div>
            <p class="text-white">Custom Cake Orders</p>
          </RouterLink>
        </li>

        <li>
          <button @click="authStore.logout()" class="flex items-center gap-2">
            <div
              class="w-10 h-10 bg-slate-400/50 border border-gray-100/50 rounded-full flex items-center justify-center"
            >
              <Icon name="ri:logout-circle-line" size="20" class="text-white" />
            </div>
            <p class="text-white">Logout</p>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
