<template>
  <AppLayout>
    <div class="container mx-auto py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Side: Guest Payment Form -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Guest Payment</h2>

          <form @submit.prevent="submitForm">
            <!-- Full Name -->
            <div class="mb-4">
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700"
                >Full Name</label
              >
              <input
                type="text"
                id="fullName"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Name"
                v-model="fullName"
                required
              />
            </div>

            <!-- Phone Number -->
            <div class="mb-4">
              <label
                for="phoneNumber"
                class="block text-sm font-medium text-gray-700"
                >Phone Number</label
              >
              <input
                type="tel"
                id="phoneNumber"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Phone Number"
                v-model="phoneNumber"
                required
              />
            </div>

            <!-- Address -->
            <div class="mb-4">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
                >Address</label
              >
              <textarea
                id="address"
                rows="3"
                class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Address"
                v-model="address"
                required
              ></textarea>
            </div>

            <!-- Delivery Location -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700"
                >Delivery Location</label
              >
              <div
                class="flex justify-between border border-gray-300 rounded-lg overflow-hidden"
              >
                <div
                  v-for="area in orderAreas"
                  :key="area.id"
                  class="flex-1 cursor-pointer p-2 text-center transition"
                  :class="{
                    'bg-green-700 text-white': deliveryLocation === area.name,
                  }"
                  @click="deliveryLocation = area.name"
                >
                  <input
                    type="radio"
                    :id="area.name"
                    :value="area.name"
                    v-model="deliveryLocation"
                    class="hidden"
                  />
                  <label
                    :for="area.name"
                    class="text-gray-700"
                    :class="{ 'text-white': deliveryLocation === area.name }"
                  >
                    {{ area.name }}
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Right Side: Payment Method and Order Summary -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <!-- Payment Method Section -->
          <h2 class="text-2xl font-semibold mb-4">Payment Method</h2>
          <div class="mb-4">
            <div class="border border-gray-300 rounded-lg p-4">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  value="cod"
                  v-model="paymentMethod"
                  class="mr-2"
                />
                <label for="cod" class="text-gray-700 font-medium"
                  >Cash on Delivery</label
                >
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <h2 class="text-2xl font-semibold mb-4">Order Summary</h2>
          <div class="space-y-4">
            <!-- Subtotal -->
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium">Subtotal</span>
              <span class="text-lg">tk {{ cartStore?.getCartTotalPrice }}</span>
            </div>

            <!-- Delivery Charge -->
            <div class="flex justify-between items-center">
              <span class="text-lg font-medium">Delivery Charge</span>
              <span class="text-lg">tk {{ getDeliveryCharge }}</span>
            </div>

            <!-- Total -->
            <div
              class="flex justify-between items-center font-semibold text-xl"
            >
              <span>Total</span>
              <span>tk {{ getTotal }}</span>
            </div>
          </div>

          <!-- Confirm Order Button -->
          <div class="pt-4 w-full">
            <button
              class="w-full sm:w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700"
              type="submit"
              @click="submitForm"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>

      <!-- Modal for Order Success -->
      <div
        v-if="orderSuccess"
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

          <!-- Order Information -->
          <div class="bg-gray-100 p-4 rounded-lg mt-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Order Summary
            </h3>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal:</span>
              <span>tk {{ cartStore?.getCartTotalPrice }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Delivery Charge:</span>
              <span>tk {{ getDeliveryCharge }}</span>
            </div>
            <div class="flex justify-between font-semibold text-gray-800">
              <span>Total:</span>
              <span>tk {{ getTotal }}</span>
            </div>
          </div>

          <!-- Close Button -->
          <div class="text-center mt-8">
            <button
              @click="orderSuccess = false"
              class="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import useAxios from "@/composables/useAxios.js";
import { useCartStore } from "@/stores/useCartStore";
import { useToast } from "vue-toastification";
const orderSuccess = ref(false);

const toast = useToast();

const fullName = ref("");
const phoneNumber = ref("");
const address = ref("");
const deliveryLocation = ref("Inside Dhaka"); // Default location
const paymentMethod = ref("cod"); // Default payment method
const selectedAreaId = ref(null); // To store selected area ID

const cartStore = useCartStore();
cartStore.initCart();

const { sendRequest } = useAxios();

const orderAreas = ref([]);

// Function to fetch order areas
const getOrderAreas = async () => {
  const data = await sendRequest({
    url: "/v1/order-areas",
    method: "GET",
  });
  orderAreas.value = data?.data;
};

// Fetch order areas on component mount
onMounted(async () => {
  await getOrderAreas();
  // isModalVisible.value = true;
});

// Computed property for delivery charge
const getDeliveryCharge = computed(() => {
  const area = orderAreas.value.find(
    (area) => area.name === deliveryLocation.value
  );
  return area ? area.delevery_charge : 0;
});

// Computed property for total
const getTotal = computed(() => {
  const subtotal = parseFloat(cartStore?.getCartTotalPrice) || 0;
  const deliveryCharge = parseFloat(getDeliveryCharge.value) || 0;
  return (subtotal + deliveryCharge).toFixed(2);
});

// Submit form function
const submitForm = async () => {
  const selectedArea = orderAreas.value.find(
    (area) => area.name === deliveryLocation.value
  );

  if (selectedArea) {
    selectedAreaId.value = selectedArea.id; // Set the selected area ID

    // Create the orderData object
    const orderData = {
      fullName: fullName.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      deliveryLocation: selectedArea.name,
      areaId: selectedAreaId.value,
      paymentMethod: paymentMethod.value,
      totalAmount: getTotal.value, // Include the total amount
    };

    try {
      const response = await sendRequest({
        url: "/v1/buy-now-order",
        method: "POST",
        data: orderData,
      });

      if (response.data.success) {
        toast.success("Your Order has been Placed..!");

        // Clear the order fields after placing the order
        fullName.value = "";
        phoneNumber.value = "";
        address.value = "";
        deliveryLocation.value = "Inside Dhaka"; // Reset to default
        paymentMethod.value = "cod"; // Reset to default
        selectedAreaId.value = null; // Reset selected area ID
        cartStore.clearCart();

        orderSuccess.value = true;
      } else {
        alert("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something Went Wrong");
    }
  } else {
    console.error("No delivery location selected");
  }
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
/* Add any additional custom styles here */
</style>
