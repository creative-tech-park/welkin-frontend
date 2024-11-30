<template>
  <AppLayout>
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-2 gap-8">
        <!-- Left Column: Cake Image -->
        <div>
          <div class="flex justify-center items-center relative p-3">
            <!-- Placeholder image if no image is uploaded -->
            <div
              v-if="!uploadedImages.length"
              class="w-full h-[400px] bg-gray-300 rounded-lg shadow-md"
            ></div>

            <!-- Preview uploaded images -->
            <div v-else class="w-full grid grid-cols-2 gap-4">
              <div
                v-for="(image, index) in uploadedImages"
                :key="index"
                class="w-full h-[200px]"
              >
                <img
                  :src="image"
                  alt="Uploaded Image"
                  class="w-full h-full rounded-lg shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Form Elements -->
        <div class="p-8 pt-0 rounded-lg">
          <div v-if="loading" class="space-y-4">
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div class="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          <div v-else class="py-5">
            <h2 class="text-3xl font-semibold text-gray-800 mb-4">
              {{ productDetails.name }}
            </h2>

            <div class="flex gap-5">
              <!-- Flavor Dropdown -->
              <div class="mb-4 w-full">
                <label
                  for="flavor"
                  class="block text-gray-700 font-semibold mb-2"
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
              <div class="mb-4 w-full">
                <label
                  for="weight"
                  class="block text-gray-700 font-semibold mb-2"
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
            </div>

            <!-- Photo Upload -->
            <div class="mb-4">
              <label for="photo" class="block text-gray-700 font-semibold mb-2"
                >Upload Images:</label
              >
              <input
                type="file"
                id="photo"
                multiple
                @change="handleMultipleImageUpload"
                class="w-2/4 px-4 py-2 border rounded-lg"
              />
            </div>

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

const handleMultipleImageUpload = (event) => {
  const files = event.target.files;
  uploadedImages.value = []; // Clear previously uploaded images

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      uploadedImages.value.push(e.target.result); // Push each image preview
    };
    reader.readAsDataURL(file);
    customCakeStore.customCakeImages.push(file); // Push the image file to the store
  }
};
onMounted(async () => {
  await getSingleProduct();
});
</script>

<style scoped></style>
