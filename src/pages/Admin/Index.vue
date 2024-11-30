<script setup>
import useAxios from "@/composables/useAxios.js";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
const { user } = useAuthStore();
const { sendRequest, loading, error } = useAxios();
const dashboardData = ref([]);
const getMyAddresses = async () => {
  const data = await sendRequest({
    url: "/v1/dashboard-data",
    method: "GET",
  });
  dashboardData.value = data?.data;
};

onMounted(async () => {
  await getMyAddresses();
});
</script>
<template>
  <DashboardLayout>
    <div
      class="py-8 px-6 flex flex-col gap-2 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-lg shadow-md"
    >
      <h1 class="font-semibold text-3xl">Hello {{ user?.name }}</h1>
      <h2 class=" text-lg">WELCOME TO YOUR DASHBOARD</h2>
      <p class="mt-2 text-sm text-white/80">
        Here you can manage your purchases, orders, and account settings.
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <!-- Total Purchase Card -->
      <div
        class="col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
      >
        <div class="flex items-center justify-between mb-4">
          <p class="text-2xl font-bold text-gray-800">Total Purchase</p>
          <div class="bg-green-500 text-white rounded-full p-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15v-2h2v2h-2zm0-10h2v6h-2V7z"
              />
            </svg>
          </div>
        </div>
        <p class="text-lg font-semibold text-gray-600">
          Tk. {{ dashboardData?.total_purchases }}
        </p>
      </div>

      <!-- Total Orders Card -->
      <div
        class="col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
      >
        <div class="flex items-center justify-between mb-4">
          <p class="text-2xl font-bold text-gray-800">Total Orders</p>
          <div class="bg-blue-500 text-white rounded-full p-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15v-2h2v2h-2zm0-10h2v6h-2V7z"
              />
            </svg>
          </div>
        </div>
        <p class="text-lg font-semibold text-gray-600">
          {{ dashboardData?.total_order }}
        </p>
      </div>

      <!-- Pending Orders Card -->
      <div
        class="col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:scale-105"
      >
        <div class="flex items-center justify-between mb-4">
          <p class="text-2xl font-bold text-gray-800">Pending Orders</p>
          <div class="bg-yellow-500 text-white rounded-full p-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15v-2h2v2h-2zm0-10h2v6h-2V7z"
              />
            </svg>
          </div>
        </div>
        <p class="text-lg font-semibold text-gray-600">
          {{ dashboardData?.pending_orders }}
        </p>
      </div>
    </div>
  </DashboardLayout>
</template>
