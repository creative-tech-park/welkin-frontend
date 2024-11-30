<template>
  <div class="container mx-auto py-12">
    <div class="text-center mb-5">
      <h1 class="text-2xl lg:text-4xl font-bold text-gray-800">Our Services</h1>
      <p class="text-gray-600 mt-2 lg:mt-4 text-sm lg:text-lg">
        Discover what we offer to make your celebrations unforgettable!
      </p>
    </div>

    <div class="container mx-auto lg:p-8">
      <!-- Tabs Navigation -->
      <div class="flex justify-center space-x-4 mb-6">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="{
            'bg-green-800 text-white': activeTab === index,
            'bg-green-100 text-gray-700': activeTab !== index,
          }"
          class="px-3 lg:px-6 w-100 text-sm lg:text-lg py-2 rounded-lg shadow-md font-regular transition-all duration-300 ease-in-out"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tabs Content -->
      <div class="bg-white lg:p-6 rounded-lg shadow-lg">
        <!-- Cakes by Occasion Tab -->
        <div v-if="activeTab === 0">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="occasion in cakeOccasions"
              :key="occasion"
              class="relative"
            >
              <div
                class="p-2 lg:p-4 text-sm lg:text-lg text-gray-700 hover:text-primary transition-all duration-300"
              >
                {{ occasion }}
              </div>
              <!-- Visual Separator -->
              <div
                class="absolute left-0 right-0 bottom-0 h-1 bg-gray-200"
              ></div>
            </div>
          </div>
        </div>

        <!-- Home Delivery Tab -->
        <div v-if="activeTab === 1">
          <h2 class="text-3xl font-bold text-primary mb-4">Home Delivery</h2>
          <p class="text-gray-700">
            Get fresh cakes delivered right to your door! Our home delivery
            service ensures that you receive your cake fresh and on time for
            your celebration.
          </p>
        </div>

        <!-- Menu Planning Tab -->
        <div v-if="activeTab === 2">
          <h2 class="text-3xl font-bold text-primary mb-4">Menu Planning</h2>
          <p class="text-gray-700">
            Let us help you plan your event's dessert menu. From cakes to
            cupcakes and other sweet treats, we will customize everything
            according to your taste and preference.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/homeStore";

const homeStore = useHomeStore();

import { ref } from "vue";

// Tabs data
const tabs = [
  { label: "Cakes by Occasion" },
  { label: "Home Delivery" },
  { label: "Menu Planning" },
];

const cakeOccasions = [
  "Birthday Cakes",
  "Anniversary Cakes",
  "Baby Shower Cakes",
  "Bridal Shower Cakes",
  "Children's Cakes",
  "Engagement Cakes",
  "Graduation Cakes",
  "Wedding Cakes",
];

// Active tab state
const activeTab = ref(0);
</script>

<style scoped></style>
