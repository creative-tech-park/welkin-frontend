<script setup>
import { onMounted, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import DeleteButton from "@/components/DeleteButton.vue";
import LoadingButton from "@/components/LoadingButton.vue";

const { sendRequest, loading, error } = useAxios();
const myAddresses = ref([]);
const getMyAddresses = async () => {
  const data = await sendRequest({
    url: "/v1/my-shipping-address",
    method: "GET",
  });
  myAddresses.value = data?.data;
};

onMounted(async () => {
  await getMyAddresses();
});
</script>
<template>
  <DashboardLayout>
    <section class="px-4">
      <div class="bg-white p-6 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon
              name="carbon:ibm-data-product-exchange"
              class="text-3xl text-secondary"
            />
            <h3 class="text-secondary text-lg lg:text-2xl font-semibold">
              Address
            </h3>
          </div>
          <div>
            <RouterLink
              :to="{ name: 'AddAddresses' }"
              class="bg-green-500 text-white px-10 py-2 rounded-md shadow hover:bg-green-700 transition duration-200"
            >
              <i class="fa fa-plus"></i> Add Record
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-8">
      <LoadingButton :isLoading="loading" v-if="loading"
        >Loading...</LoadingButton
      >

      <div
        v-if="!loading && myAddresses?.addresses?.length"
        class="px-4 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div
          v-for="item in myAddresses?.addresses"
          :key="item.id"
          class="relative overflow-hidden bg-white shadow-lg dark:bg-gray-800 sm:rounded-lg transition-transform duration-300 transform hover:scale-105"
        >
          <div class="overflow-x-auto p-6">
            <div class="border-b pb-4 mb-4">
              <span class="font-bold text-lg text-gray-800">Address:</span>
              <p class="text-gray-600">{{ item?.address }}</p>
            </div>
            <div class="border-b pb-4 mb-4">
              <span class="font-bold text-lg text-gray-800">Phone:</span>
              <p class="text-gray-600">{{ item?.phone }}</p>
            </div>
            <div class="border-b pb-4 mb-4">
              <span class="font-bold text-lg text-gray-800">Area:</span>
              <p class="text-gray-600">{{ item?.order_area?.name }}</p>
            </div>
            <div>
              <span class="font-bold text-lg text-gray-800"
                >Delivery Charge:</span
              >
              <p class="text-gray-600">
                {{ item?.order_area?.delevery_charge }}
              </p>
            </div>
          </div>
          <div class="flex justify-end items-center gap-2 pb-5 pe-3">
            <RouterLink
              :to="{ name: 'EditAddresses', params: { id: item?.id } }"
              class="px-4 py-2 font-semibold text-white rounded-lg shadow-md bg-green-400 hover:bg-green-500 transition duration-200"
              >Edit</RouterLink
            >

            <DeleteButton
              :path="`/v1/delete-my-shipping-address/${item.id}`"
              @deleted="getMyAddresses()"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >Delete</DeleteButton
            >
          </div>
        </div>
      </div>

      <div
        v-if="!loading && !myAddresses?.addresses?.length"
        class="flex items-center justify-center mt-20"
      >
        <p class="font-semibold text-lg">No Queries Found</p>
      </div>
    </section>
  </DashboardLayout>
</template>
