<script setup>
import { onMounted, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import LoadingButton from "@/components/LoadingButton.vue";

const { sendRequest, loading } = useAxios();
const data = ref([]);

const getData = async () => {
  const response = await sendRequest({
    url: "/v1/custom-cake-orders",
  });
  data.value = response.data;
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <DashboardLayout>
    <section class="px-4">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon
              name="material-symbols:shopping-cart-outline-sharp"
              class="text-3xl text-secondary"
            />
            <h3 class="text-secondary text-3xl font-semibold">
              Custom Cake Orders
            </h3>
          </div>
        </div>
      </div>
    </section>
    <LoadingButton v-if="loading" :isLoading="loading">Loading</LoadingButton>

    <div class="mx-5 bg-white rounded-lg shadow-md my-4">
      <div class="relative overflow-x-auto">
        <table
          v-if="!loading && data?.length"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-white uppercase bg-primary-800 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="p-3">Id</th>
              <th scope="col" class="p-3">Cake Name</th>
              <th scope="col" class="p-3">Flavor</th>
              <th scope="col" class="p-3">Message</th>
              <th scope="col" class="p-3">Photo</th>
              <th scope="col" class="p-3">Weight</th>
              <th scope="col" class="p-3">Location</th>
              <th scope="col" class="p-3">Delivery Date</th>
            </tr>
          </thead>
          <tbody class="text-black">
            <tr
              v-for="order in data"
              :key="order.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-3">{{ order.id }}</td>
              <td class="p-3">{{ order.custom_cake.name }}</td>
              <td class="p-3">{{ order.custom_cake_flavor.name }}</td>
              <td class="p-3">{{ order.message_on_cake }}</td>
              <td class="p-3">
                <img
                  v-if="order.photo_on_cake_url"
                  :src="order.photo_on_cake_url"
                  alt="Cake Photo"
                  class="w-20 h-20 object-cover rounded"
                />
              </td>
              <td class="p-3">{{ order.weight }}</td>
              <td class="p-3 capitalize">
                {{ order.delivery_location }} Dhake
              </td>

              <td class="p-3">
                {{
                  new Date(order.delivery_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="!loading && !data?.length"
      class="flex items-center justify-center mt-20"
    >
      <p class="font-semibold text-lg">No Queries Found</p>
    </div>
  </DashboardLayout>
</template>
