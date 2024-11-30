<template>
  <AppLayout>

    <section class="container mx-auto">
      <OrderStep />
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12 font-playfair mb-8"
      >
        <!-- Payment Methods Section -->
        <div class="flex flex-col">
          <h2 class="text-xl text-secondary mb-0">Select Payment Method</h2>
          <div
            class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
<!--            <div-->
<!--              class="border my-6 rounded-lg h-36 flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"-->
<!--              :class="-->
<!--                order.paymentMethod === 'cod'-->
<!--                  ? 'bg-green-500 text-white'-->
<!--                  : 'bg-gray-200'-->
<!--              "-->
<!--              @click="order.paymentMethod = 'cod'"-->
<!--            >-->
<!--              <svg-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                class="mx-auto mt-5"-->
<!--                width="32"-->
<!--                height="32"-->
<!--                viewBox="0 0 16 16"-->
<!--              >-->
<!--                <g fill="#fff">-->
<!--                  <path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M11 15a4 4 0 1 0 0-8a4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0a5 5 0 0 1 10 0"-->
<!--                  />-->
<!--                  <path-->
<!--                    d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207c0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158c0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522c0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569c0 .339-.257.571-.709.614v-1.195z"-->
<!--                  />-->
<!--                  <path-->
<!--                    d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"-->
<!--                  />-->
<!--                  <path-->
<!--                    d="M9.998 5.083L10 5a2 2 0 1 0-3.132 1.65a6 6 0 0 1 3.13-1.567"-->
<!--                  />-->
<!--                </g>-->
<!--              </svg>-->
<!--              <p class="text-sm font-normal py-4">Cash On Delivery</p>-->
<!--            </div>-->
            <div
              class="border flex flex-col items-center justify-center my-6 rounded-lg h-36  transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              :class="
                order.paymentMethod === 'SslCommerz'
                  ? 'bg-green-500 '
                  : 'bg-white'
              "
              @click="order.paymentMethod = 'SslCommerz'"
            >
              <img src="/ssl.png" class="w-full h-10 object-cover">
              <p class="text-sm font-normal py-2">SslCommerz</p>
            </div>
          </div>
        </div>

        <!-- Order Summary Section -->
        <div
          class="flex flex-col lg:flex-row items-end justify-end lg:mt-0 mb-5"
        >
          <div class="w-full lg:w-2/3">
            <div
              class="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h3 class="text-lg font-bold text-gray-800 mb-4">
                Order Summary
              </h3>
              <ul class="space-y-3">
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
                  <p>Tk. {{ deliveryDeails?.order_area?.delevery_charge }}</p>
                </li>
                <li
                  class="flex items-center justify-between text-xl font-semibold text-gray-900 py-3 border-t border-gray-300 mt-2"
                >
                  <p>Grand Total</p>
                  <p>
                    Tk.
                    {{
                      parseInt(
                        deliveryDeails?.order_area?.delevery_charge ?? 0
                      ) + parseInt(cartStore?.getCartTotalPrice)
                    }}
                  </p>
                </li>
              </ul>
              <LoadingButton
                @click="makeSSLPayment"
                :isLoading="loading"
                class="mt-1 w-full bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg py-2 transition duration-150"
              >
                Confirm Order
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import useAxios from "@/composables/useAxios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import LoadingButton from "@/components/LoadingButton.vue";
import OrderStep from "@/components/OrderStep.vue";
const toast = useToast();
const cartStore = useCartStore();
cartStore.initCart();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const { loading, sendRequest} = useAxios();

const deliveryDeails = ref(null);

const order = ref({
  addressId: route.query.addressId,
  orders: cartStore.getCartItems,
  paymentMethod: null,
  orderTotal: cartStore.getCartTotalPrice,
});

const makeSSLPayment = async () => {
  try {
    if (!order.value.paymentMethod) {
      toast.error("Please Select Your Payment Method...");
    }
    const res = await sendRequest({
      url: "/v1/save-order",
      method: "POST",
      data: order.value,
    });
    if (res.data.status === "success" && res.data.data) {
      window.open(res.data.data, "_blank");
    } else {
      console.error("Failed to initiate payment:", res);
    }
  } catch (error) {
    console.error("Error while making payment:", error);
  }
};
const makePayment = async () => {
  const token = await authStore.getToken();
  if (!order.value.paymentMethod) {
    toast.error("Please Select Your Payment Method...");
  } else {
    const savedOrder = await sendRequest({
      url: "/v1/save-order",
      method: "POST",
      data: order.value,
    });

    cartStore.clearCart();
    if (savedOrder?.data && savedOrder.data?.type === "stripe_payment") {
      window.open(savedOrder.data?.data);
    } else {
      return router.push({ name: "Order" });
    }
  }
};

onMounted(async () => {
  if (route.query.addressId) {
    const data = await sendRequest({
      method: "get",
      url: `/v1/single-shipping-address/${route.query.addressId}`,
    });
    deliveryDeails.value = data?.data;
  } else {
    toast.error("Address Id Not Valid...");
    await router.push({ name: "Checkout", query: { invalidAddressId: true } });
  }
});
</script>
