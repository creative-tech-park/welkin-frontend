<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <ul class="flex items-center gap-1 lg:gap-3 pt-5">
    <li
        class="uppercase text-xs lg:text-lg"
        :class="{'text-green-500' : route.path === '/add-cart'}">

      1. Shopping Cart
    </li>
    <li
        class="uppercase text-xs lg:text-lg"
        :class="{'text-green-500' : route.path === '/checkout'}">
      2. Checkout
    </li>
    <li
        class="uppercase text-xs lg:text-lg"
        :class="{'text-green-500' : route.path === '/payment'}">
      3. Complete Order
    </li>
  </ul>
</template>