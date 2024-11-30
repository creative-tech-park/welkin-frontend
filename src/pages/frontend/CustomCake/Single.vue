<template>
  <AppLayout>
    <div class="mx-auto py-12 container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Cake Image -->
        <div>
          <div class="flex justify-center items-center relative w-[280px] h-[200px] lg:w-[580px] lg:h-[500px] mx-auto">
            <div
              v-if="loading"
              class=" bg-gray-300 rounded-lg shadow-md animate-pulse"
            ></div>
            <img
              v-else
              :src="productDetails.image_url"
              alt="Placeholder Image"
              class="w-full h-full lg:w-[580px] lg:h-[500px] object-cover rounded-lg shadow-md"
            />
            <div
              v-if="uploadedImage"
              class="absolute inset-0 flex justify-center items-center"
            >
              <div
                :class="[
                  isSquare ? 'rounded-none ' : 'rounded-full left-1/2 top-[28px] lg:top-[91px] -translate-x-1/2',
                  'overflow-hidden absolute ',
                ]"
                :style="{
                  width: isSquare ? '92%' : '57%',
                  height: isSquare ? '20%' : '47%',
                  position: 'absolute',
                  top: isSquare ? '33%' : '',
                  left: isSquare ? '5%' : '',
                }"
              >
                <img
                  :src="uploadedImage"
                  alt="Uploaded Image"
                  :class="[isSquare ? 'object-fill' : 'object-cover']"
                  class="w-full h-full uploaded-image"
                  :style="
                    isSquare
                      ? 'clip-path: polygon(15% 2%, 81% 0%, 91% 100%, 4% 100%)'
                      : ''
                  "
                />
                <div
                  class="stretch-corner left-corner"
                  :style="{
                    width: isSquare ? '50%' : '100%',
                    height: isSquare ? '50%' : '100%',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    background: 'inherit',
                  }"
                ></div>
                <div
                  class="stretch-corner right-corner"
                  :style="{
                    width: isSquare ? '50%' : '100%',
                    height: isSquare ? '50%' : '100%',
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    background: 'inherit',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Form Elements -->
        <div class="bg-white p-8 py-3 rounded-lg shadow-md">
          <div v-if="loading" class="space-y-4">
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          <div v-else>
            <h2 class="text-3xl font-semibold text-gray-800 mb-4">
              {{ productDetails.name }}
            </h2>

            <!-- Flavor Dropdown -->
            <div class="mb-4">
              <label for="flavor" class="block text-gray-700 font-semibold mb-2"
                >Flavor:</label
              >
              <select
                id="flavor"
                v-model="customCakeStore.flavorId"
                class="w-full px-4 py-2 border rounded-lg"
              >
                <option
                  v-for="(item, index) in flavors"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
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
                v-model="customCakeStore.weight"
                class="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter weight in kg"
              />
            </div>

            <!-- Photo Upload -->
            <div class="mb-4 mt-4">
              <label for="photo" class="block text-gray-700 font-semibold mb-2"
                >Upload Photo:</label
              >
              <input
                type="file"
                id="photo"
                @change="handleImageUpload"
                class="w-2/4 px-4 py-2 border rounded-lg"
              />
            </div>

            <!-- Photo Upload -->
            <!-- <div class="mb-4 mt-4">
              <label for="photo" class="block text-gray-700 font-semibold mb-2"
                >Upload Custom Cake Images:</label
              >
              <input
                type="file"
                id="photo"
                multiple
                @change="handleMultipleImageUpload"
                class="w-2/4 px-4 py-2 border rounded-lg"
              />
            </div> -->

            <!-- Message on Cake -->
            <div class="mb-4">
              <label
                for="message"
                class="block text-gray-700 font-semibold mb-2"
                >Message on Cake:</label
              >
              <input
                type="text"
                id="message"
                v-model="customCakeStore.message"
                class="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter message"
              />
            </div>

            <!-- Buy Now Button -->
            <button
              @click="customCakeStore.openModal"
              :disabled="!isFormValid"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
            >
              Request Now
            </button>
          </div>
        </div>
      </div>
    </div>

    <CustomCakeDetails />
    <CustomCakeBuyNow />
  </AppLayout>
</template>

<script setup>
import CustomCakeDetails from "@/components/CustomCake/CustomCakeDetails.vue";
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import { onMounted, ref, computed } from "vue";
import useAxios from "@/composables/useAxios.js";
import { useRoute } from "vue-router";
import { useCustomCakeStore } from "@/stores/customCakeStore.js";
import CustomCakeBuyNow from "@/components/CustomCake/CustomCakeBuyNow.vue";

const { sendRequest, loading, error } = useAxios();
const route = useRoute();
const customCakeStore = useCustomCakeStore();
const uploadedImages = ref([]);

const productDetails = ref([]);
const flavors = ref([]);
const uploadedImage = ref(null); // Store the uploaded image

const isSquare = computed(() => {
  return productDetails.value.name?.toLowerCase().includes("square");
});

const getSingleProduct = async () => {
  const data = await sendRequest({
    url: `/v1/custom-cake/show/${route?.params?.id}`,
  });
  productDetails.value = data.data.data;
  flavors.value = data.data.flavors;
  customCakeStore.customCakeId = data.data.data.id;
};

const isFormValid = computed(() => {
  return (
    customCakeStore.weight &&
    (uploadedImage.value || customCakeStore.customCakeImages.length > 0) &&
    customCakeStore.message
  );
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  customCakeStore.userImage = file; // Store the uploaded image in the store

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage.value = e.target.result; // Set uploaded image as base64
    };
    reader.readAsDataURL(file);
  }
};

const handleMultipleImageUpload = (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
    customCakeStore.customCakeImages.push(file);
  }
};
onMounted(async () => {
  await getSingleProduct();
});
</script>

<style scoped>
img {
  display: block;
}

.rounded-full {
  border-radius: 50%;
}

.overflow-hidden {
  overflow: hidden;
}
.uploaded-image {
  filter: blur(0.9px);
}

/* Add animation pulse for skeleton */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.stretch-corner {
  z-index: 1;
  transition: all 0.3s;
}

.left-corner {
  transform: skewY(20deg); /* Adjust skew to your needs */
}

.right-corner {
  transform: skewY(-80deg); /* Adjust skew to your needs */
}
</style>
