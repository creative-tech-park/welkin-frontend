<template>
  <AppLayout>
    <section class="container mx-auto">
      <OrderStep />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 py-10">
        <div class="col-span-1 lg:col-span-2 font-playfair">
          <div class="flex justify-between mb-8 items-center">
            <h2 class="text-2xl font-semibold text-primary">Checkout</h2>
            <RouterLink
              :to="{ name: 'AddAddresses', query: { redirect: '/checkout' } }"
              class="flex items-center justify-center px-6 py-2 rounded-lg transition duration-300 ease-in-out text-green-500 hover:text-green-600 transform hover:scale-105"
            >
              <i class="fa fa-plus text-sm text-green me-2" />
              <p class="text-md text-green">Add New Address</p>
            </RouterLink>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <label
              v-for="address in myAddresses?.addresses"
              :key="address.id"
              :for="`input-for-${address.id}`"
              :class="[
                'h-full border-2 p-5 rounded-lg shadow-md transition duration-300 ease-in-out',
                deliveryAddress?.id === address.id
                  ? 'border-green-700 bg-green-50'
                  : 'border-gray-300 bg-white',
              ]"
            >
              <input
                type="radio"
                class="hidden"
                name="select-address"
                @change="setDeliveryAddress(address)"
                :id="`input-for-${address.id}`"
              />
              <p class="text-lg font-semibold text-secondary">Address</p>
              <div class="text-roboto text-md font-normal py-2 text-gray-700">
                <div class="font-bold">{{ address?.order_area?.name }}</div>
                <div class="text-gray-600">{{ address?.phone }}</div>
                <div class="text-gray-600">{{ address?.address }}</div>
                <p class="text-gray-500">
                  Delivery Charge: Tk.
                  {{ address?.order_area?.delevery_charge }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div class="col-span-1 lg:col-span-1 font-playfair mt-6 lg:mt-16">
          <div class="p-6 px-6 bg-white shadow-lg rounded-lg">
            <ul>
              <li
                class="flex items-center justify-between text-md text-gray-600"
              >
                <p>Sub Total</p>
                <p>Tk. {{ cartStore?.getCartTotalPrice }}</p>
              </li>
              <li
                class="flex items-center justify-between text-md text-gray-600"
              >
                <p>Delivery Charge</p>
                <p>Tk. {{ deliveryAddress?.order_area?.delevery_charge }}</p>
              </li>
              <li
                class="flex items-center justify-between text-xl font-semibold py-3 border-t border-gray-300 mt-2"
              >
                <p>Grand Total</p>
                <p>
                  Tk.
                  {{
                    parseInt(
                      deliveryAddress?.order_area?.delevery_charge ?? 0
                    ) + parseInt(cartStore?.getCartTotalPrice)
                  }}
                </p>
              </li>
            </ul>
            <button
              @click="payment"
              class="mt-2 text-xl text-center bg-green-500 text-white hover:bg-green-600 active:bg-green-700 transition duration-300 w-full py-2 rounded-lg shadow-md"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import { onMounted, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import { useCartStore } from "@/stores/useCartStore.js";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import OrderStep from "@/components/OrderStep.vue";
const toast = useToast();
const { sendRequest, loading, error } = useAxios();
const router = useRouter();
const cartStore = useCartStore();
cartStore.initCart();

const deliveryAddress = ref(null);
const setDeliveryAddress = (address) => (deliveryAddress.value = address);

const payment = () => {
  if (deliveryAddress.value) {
    router.push({
      name: "Payment",
      query: {
        addressId: deliveryAddress.value?.id,
      },
    });
  } else {
    toast.error("Please Select Your Delivery Address...");
  }
};

const myAddresses = ref([]);
const getMyAddresses = async () => {
  const data = await sendRequest({
    url: "/v1/my-shipping-address",
    method: "GET",
  });
  myAddresses.value = data?.data;
  // Automatically select the first address if available
  if (myAddresses.value.addresses.length > 0) {
    deliveryAddress.value = myAddresses.value.addresses[0];
  }
};

onMounted(async () => await getMyAddresses());
</script>

<style scoped></style>
