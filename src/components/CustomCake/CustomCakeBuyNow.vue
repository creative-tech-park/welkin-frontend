<template>
  <!-- Modal for Order Success -->
  <div
    v-if="customCakeStore.orderSuccess"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg transform transition-all scale-95"
    >
      <!-- Success Checkmark Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-green-500 text-white rounded-full p-6">
          <svg
            class="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7 12a5 5 0 1010 0 5 5 0 00-10 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Success Message -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h2>
        <p class="text-gray-600 text-lg">
          Thank you for your order. Your items will be processed and shipped
          soon.
        </p>
      </div>

      <!-- Close Button -->
      <div class="text-center mt-8">
        <button
          @click="customCakeStore.closeOrderSuccess"
          class="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="customCakeStore.isModalOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md flex flex-col"
    >
      <!-- Modal Header -->
      <h3 class="text-2xl font-semibold mb-4 text-center">Buy Now</h3>
      <form @submit.prevent="customCakeStore.submitForm">
        <!-- Full Name -->
        <div class="mb-4">
          <label for="full_name" class="block text-gray-800 mb-1"
            >Full Name:</label
          >
          <input
            type="text"
            v-model="customCakeStore.fullName"
            id="full_name"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <!-- Phone Number -->
        <div class="mb-4">
          <label for="phone_number" class="block text-gray-800 mb-1"
            >Phone Number:</label
          >
          <input
            type="tel"
            v-model="customCakeStore.phoneNumber"
            id="phone_number"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <!-- Address -->
        <div class="mb-4">
          <label for="address" class="block text-gray-800 mb-1">Address:</label>
          <input
            type="text"
            v-model="customCakeStore.address"
            id="address"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <!-- Delivery Location -->
        <div class="mb-4">
          <label class="block text-gray-800 mb-1">Delivery Location:</label>
          <div
            class="flex justify-between border border-gray-300 rounded-lg overflow-hidden"
          >
            <div
              class="flex-1 cursor-pointer p-2 text-center transition"
              :class="{
                'bg-green-700 text-white':
                  customCakeStore.deliveryLocation === 'inside',
              }"
              @click="customCakeStore.deliveryLocation = 'inside'"
            >
              <input
                type="radio"
                id="inside-dhaka"
                value="inside"
                v-model="customCakeStore.deliveryLocation"
                class="hidden"
              />
              <label
                for="inside-dhaka"
                :class="{
                  'text-white': customCakeStore.deliveryLocation === 'inside',
                }"
                class="text-gray-700"
                >Inside Dhaka</label
              >
            </div>
          </div>
        </div>

        <!-- Delivery Date -->
        <div class="mb-4">
          <h4 class="text-xl font-semibold mb-1">Delivery Date:</h4>
          <input
            type="date"
            v-model="customCakeStore.deliveryDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end mt-4">
          <button
            @click="customCakeStore.closeModal"
            class="mr-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!isFormValid"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCustomCakeStore } from "@/stores/customCakeStore.js";
import { computed } from "vue";

export default {
  setup() {
    const customCakeStore = useCustomCakeStore();
    const deliveryLocation = ref("inside"); // Default location

    const isFormValid = computed(() => {
      return (
        customCakeStore.fullName &&
        customCakeStore.phoneNumber &&
        customCakeStore.address &&
        customCakeStore.deliveryDate
      );
    });

    return { customCakeStore, deliveryLocation, isFormValid };
  },
};
</script>

<style scoped>
.fixed {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.border {
  border-width: 2px;
}

.cursor-pointer {
  cursor: pointer;
}

.p-4 {
  padding: 16px;
}
</style>
