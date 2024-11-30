<template>
  <AppLayout>
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-3 gap-8">
        <!-- Skeleton Loader or Cake Cards -->
        <div
          v-if="loading"
          v-for="n in 3"
          :key="n"
          class="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
        >
          <!-- Skeleton Image -->
          <div class="w-full h-64 bg-gray-200"></div>
          <!-- Skeleton Content -->
          <div class="p-6">
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Actual Cake Cards -->
        <div
          v-else
          v-for="(item, index) in cakes"
        
          :key="index"
          class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <img
            :src="item.image_url"
            alt="Placeholder Image"
            class="w-full h-64 object-cover"
          />
          <div class="p-6 flex flex-col">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              {{ item.name }}
            </h2>
            <RouterLink :to="getRoute(item)">
              <button
                class="bg-primary-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
              >
                Order Now
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { RouterLink } from "vue-router";
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import { onMounted, ref } from "vue";
import useAxios from "@/composables/useAxios";

const cakes = ref([]);
const { loading, sendRequest } = useAxios();

const getData = async () => {
  try {
    const response = await sendRequest({
      url: "/v1/custom-cakes",
      method: "GET",
    });
    cakes.value = response.data; // Update state with fetched cakes
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// Function to determine the route based on the item type
const getRoute = (item) => {
  return item.type === "custom_cake"
    ? { name: "UserCustomCake", params: { id: item.id } }
    : { name: "SingleCustomCake", params: { id: item.id } };
};

onMounted(() => {
  getData(); // Fetch cakes when component mounts
});
</script>

<style lang="scss" scoped></style>
