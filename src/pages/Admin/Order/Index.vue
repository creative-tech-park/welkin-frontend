<script setup>
import { onMounted, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import moment from "moment";
import LoadingButton from "@/components/LoadingButton.vue";

const { sendRequest, loading, error } = useAxios();
const orders = ref([]);

const getAllOrders = async () => {
  const data = await sendRequest({
    url: "/v1/get-customer-order",
  });
  orders.value = data.data;
  console.log(data.data.data);
};

onMounted(async () => {
  await getAllOrders();
});
</script>
<template>
  <DashboardLayout>
    <section class="px-4">
      <div class="bg-white p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon
              name="material-symbols:shopping-cart-outline-sharp"
              class="text-3xl text-secondary"
            />
            <h3 class="text-secondary text-3xl font-semibold">Orders</h3>
          </div>
        </div>
      </div>
    </section>
    <LoadingButton v-if="loading" :isLoading="loading"> Loading</LoadingButton>

    <div class="mx-5 bg-white">
      <div class="relative overflow-x-auto">
        <table
          v-if="!loading && orders.data?.length"
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-white uppercase bg-primary-800 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="p-3">Id</th>
              <th scope="col" class="p-3">Product Name</th>
              <th scope="col" class="p-3">Total</th>
              <th scope="col" class="p-3">Order Status</th>
              <th scope="col" class="p-3">Total Product</th>
              <th scope="col" class="p-3">Payment Status</th>
              <th scope="col" class="p-3">Payment Method</th>
              <th scope="col" class="p-3">Order date</th>
              <th scope="col" class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="order.id"
              v-for="order in orders.data"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th class="flex items-center p-3">
                <span
                  >#INV-{{
                    order.id + moment(order.created_at)?.format("DDMMYYYY")
                  }}</span
                >
              </th>
              <th
                scope="row"
                class="p-3 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div>
                  <div class="text-base font-semibold">
                    <div
                      v-for="(detail, index) in order?.order_details"
                      :key="index"
                    >
                      {{ detail.product.title }}
                      <p>Quantity: {{detail?.quantity}}</p>
                    </div>
                  </div>
                </div>
              </th>
              <td class="p-3">
                <div class="flex items-center">
                  <p>Tk. {{ order?.grand_total }}</p>
                </div>
              </td>
              <td class="p-3">
                <div class="flex justify-center">
                  <p
                    class="rounded border border-yellow-600 bg-yellow-100 capitalize text-yellow-600 text-xs font-medium px-3 py-1 text-center"
                  >
                    {{ order?.order_status }}
                  </p>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center justify-center">
                  <p>{{ order?.order_details_count }}</p>
                </div>
              </td>
              <td class="p-3">
                <div class="flex justify-center">
                  <p
                    class="rounded border border-green-700 bg-green-200 capitalize text-green-700 text-xs font-semibold px-3 py-1 text-center"
                  >
                    {{ order?.payment_status }}
                  </p>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center justify-center uppercase">
                  <p>{{ order?.payment_method }}</p>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <p>{{ new Date(order?.created_at)?.toDateString() }}</p>
                </div>
              </td>

              <td class="p-3">
                <div class="flex items-center gap-2">
                  <RouterLink
                    :to="{ name: 'SingleOrder', params: { id: order?.id } }"
                    class="w-8 h-8 rounded-md flex items-center justify-center bg-green-400/10 border border-green-900"
                  >
                    <Icon
                      name="material-symbols:visibility-outline-rounded"
                      class="text-xl text-green-900"
                    />
                  </RouterLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="!loading && !orders.data?.length"
      class="flex items-center justify-center mt-20"
    >
      <p class="font-semibold text-lg">Not Queries Found</p>
    </div>
  </DashboardLayout>
</template>
