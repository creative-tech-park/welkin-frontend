<template>
  <div
    class="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg text-center my-10"
  >
    <h2 class="text-3xl font-bold text-gray-800 mb-8">Our Clients Say</h2>

    <!-- Testimonial Slider Section -->
    <div class="relative">
      <div v-if="homeStore.testimonials.length > 0" class="testimonial">
        <!-- Customer Image with Border (wrapped in transition) -->
        <div class="flex justify-center mb-6">
          <img
            :src="homeStore.currentTestimonial.image_url"
            alt="Customer Image"
            class="w-48 h-48 object-cover rounded-full border-4 border-green-500"
            :key="homeStore.currentTestimonial.image_url"
          />
        </div>

        <!-- Customer Message -->
        <p class="text-lg text-gray-600 italic mb-4">
          "{{ homeStore.currentTestimonial.message }}"
        </p>

        <!-- Customer Name -->
        <h3 class="text-xl font-semibold">
          {{ homeStore.currentTestimonial.name }}
        </h3>
      </div>

      <!-- Navigation Buttons -->
      <div class="absolute top-1/2 left-0 transform -translate-y-1/2">
        <button
          @click="homeStore.prevTestimonial"
          class="bg-green-700 hover:bg-green-500 text-white p-3 rounded-full"
        >
          &#x276E;
        </button>
      </div>
      <div class="absolute top-1/2 right-0 transform -translate-y-1/2">
        <button
          @click="homeStore.nextTestimonial"
          class="bg-green-700 hover:bg-green-500 text-white p-3 rounded-full"
        >
          &#x276F;
        </button>
      </div>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center mt-6 space-x-2">
      <span
        v-for="(testimonial, index) in homeStore.testimonials"
        :key="index"
        @click="homeStore.setCurrentTestimonial(index)"
        :class="{
          'bg-green-500': homeStore.currentTestimonialIndex === index,
          'bg-gray-400': homeStore.currentTestimonialIndex !== index,
        }"
        class="w-3 h-3 rounded-full cursor-pointer"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useHomeStore } from "@/stores/homeStore";

const homeStore = useHomeStore();

// Autoplay function
let autoplayInterval;

onMounted(() => {
  homeStore.fetchData(); // Fetch testimonials when component mounts
  autoplayInterval = setInterval(() => {
    if (homeStore.testimonials.length > 0) {
      homeStore.nextTestimonial();
    }
  }, 4000); // 4 seconds interval
});

onUnmounted(() => {
  clearInterval(autoplayInterval); // Clear interval when component unmounts
});
</script>

<style scoped>
/* Opacity transition */
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: opacity 0.5s ease;
}
.opacity-fade-enter,
.opacity-fade-leave-to {
  opacity: 0;
}
</style>
