<template>
  <AppLayout>
    <!-- Cake Order Section -->
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-2 gap-8">
        <!-- Left Column: Placeholder Image -->
        <div class="flex justify-center items-center">
          <img
            src="/square-cake.jpg"
            alt="Placeholder Image"
            class="w-full h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        <!-- Right Column: Form Elements -->
        <div class="bg-white p-8 py-3 rounded-lg shadow-md">
          <!-- Title -->
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">
            Round Photo Cake
          </h2>

          <!-- Price -->
          <p class="text-3xl font-medium text-green-600 mb-4">TK: 50</p>

          <!-- Flavor Dropdown -->
          <div class="mb-4">
            <label for="flavor" class="block text-gray-700 font-semibold mb-2"
              >Flavor:</label
            >
            <select
              id="flavor"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
            >
              <option value="chocolate">Chocolate</option>
              <option value="vanilla">Vanilla</option>
              <option value="strawberry">Strawberry</option>
              <option value="red_velvet">Red Velvet</option>
            </select>
          </div>

          <!-- Weight Input -->
          <div class="mb-4">
            <label for="weight" class="block text-gray-700 font-semibold mb-2"
              >Weight (kg):</label
            >
            <input
              type="number"
              id="weight"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
              placeholder="Enter weight in kg"
            />
          </div>

          <!-- Photo Upload -->
          <div class="mb-4">
            <label for="photo" class="block text-gray-700 font-semibold mb-2"
              >Upload Photo:</label
            >
            <input
              type="file"
              id="photo"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
            />
          </div>

          <!-- Message on Cake -->
          <div class="mb-4">
            <label for="message" class="block text-gray-700 font-semibold mb-2"
              >Message on Cake:</label
            >
            <input
              type="text"
              id="message"
              class="w-full px-4 py-2 border rounded-lg focus:ring focus:border-blue-300"
              placeholder="Enter message"
            />
          </div>

          <!-- Buy Now Button -->
          <button
            class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring focus:ring-green-300 transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>

    <CustomCakeDetails />
  </AppLayout>
</template>

<script setup>
import CustomCakeDetails from "@/components/CustomCake/CustomCakeDetails.vue";
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
</script>

<style lang="scss" scoped></style>
