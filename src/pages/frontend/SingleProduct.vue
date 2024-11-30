<template>
  <AppLayout>
    <div class="container mx-auto my-20 mt-10">
      <!-- Modal -->
      <Cake360 />
      <div
        v-if="loading"
        class="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-pulse"
      >
        <div class="col-span-1">
          <div class="w-full h-80 bg-gray-300 rounded"></div>
          <!-- Placeholder for Gallery -->
        </div>
        <!-- Right side placeholder (Product Details) -->
        <div class="col-span-1">
          <div class="w-3/4 h-8 bg-gray-300 rounded mb-4"></div>
          <!-- Placeholder for Title -->
          <div class="w-1/2 h-8 bg-gray-300 rounded mb-4"></div>
          <!-- Placeholder for Price -->
          <div class="w-full h-20 bg-gray-300 rounded mb-6"></div>
          <!-- Placeholder for About -->
          <div class="px-10 flex gap-5 mt-16">
            <div class="w-16 h-10 bg-gray-300 rounded"></div>
            <!-- Placeholder for Quantity Input -->
            <div class="w-56 h-12 bg-gray-300 rounded"></div>
            <!-- Placeholder for Add to Cart Button -->
          </div>
          <div class="my-12 px-10">
            <div class="w-24 h-6 bg-gray-300 rounded mb-4"></div>
            <!-- Placeholder for "Share Via" -->
            <div class="flex justify-center lg:justify-start gap-4 pt-5">
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Social Icon -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Social Icon -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Social Icon -->
            </div>
            <div class="w-40 h-6 bg-gray-300 rounded mb-4 mt-8"></div>
            <!-- Placeholder for Customer Review -->
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Star Rating -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Star Rating -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Star Rating -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Star Rating -->
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <!-- Placeholder for Star Rating -->
              <div class="w-20 h-6 bg-gray-300 rounded ml-2"></div>
              <!-- Placeholder for Ratings Text -->
            </div>
          </div>
          <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
          <!-- Placeholder for Category/Tags -->
        </div>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="col-span-1 h-full">
          <div>
            <Gallary
              :video_url="productDetails?.product?.video_url"
              :images="getImages"
            />
          </div>
        </div>
        <div class="col-span-1">
          <div class="pl-10">
            <h2 class="font-playfair font-bold text-2xl uppercase lg:text-3xl">
              {{ productDetails?.product?.title }}
            </h2>
            <div class="flex items-center">
              <h1 class="font-bold text-2xl my-7">
                Tk. {{ selectPrice?.price }}
              </h1>
              <button
                @click="customCakeStore.openVTSModal"
                class="ml-4 px-4 py-2 border border-primary-500 text-primary-500 rounded hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                View 360
              </button>
            </div>

            <div
              class="w-1/2"
              v-if="JSON.parse(productDetails?.product?.variant)?.length > 1"
            >
              <p class="mb-1">Select Variant</p>
              <select
                class="border-gray-200 focus:border-primary-500 w-full px-5 py-2 rounded-md font-semibold"
                @change="changePrice($event)"
              >
                <option value="null" disabled>Select variant</option>
                <option
                  :value="JSON.stringify(item)"
                  v-for="item in JSON.parse(productDetails?.product?.variant)"
                  :key="item.id"
                >
                  {{ item?.weight }}
                </option>
              </select>
            </div>
            <div class="mt-5">
              <label class="block" for="message">Message</label>
              <input
                id="message"
                v-model="message"
                class="px-4 mt-1 py-3 disabled:bg-gray-300 w-3/4 border-primary-500 border-2 focus:ring-0 focus:outline-none rounded-lg"
                placeholder="Enter your cake message"
              />
            </div>

            <div class="flex gap-5 py-7 border-y mt-10">
              <div class="flex items-center justify-between w-full gap-4">
                <div class="flex items-center gap-3">
                  <button
                    @click="down"
                    class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-10 h-10 font-bold text-lg"
                  >
                    -
                  </button>
                  <span class="font-bold text-sm"> {{ qty }}</span>
                  <button
                    @click="up"
                    class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-10 h-10 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="addToCart"
                  class="hover:bg-primary-500 w-full bg-hover-500 font-semibold text-white transition-all ease-in-out duration-300 border-2 px-8 py-2 rounded-md"
                >
                  Add Cart
                </button>
              </div>
            </div>

            <!--            <div class="my-12 px-10">
              <p class="font-playfair font-medium text-lg text-secondary">share Via</p>
              <ul class="text-primary">
                <li class="flex justify-center lg:justify-start gap-4 pt-5">
                  <Icon name="mdi:twitter" class=" text-lg hover:border-2 hover:border-secondary hover:rounded-full"/>
                  <Icon name="gg:facebook" class=" text-lg hover:border-2 hover:border-secondary hover:rounded-full"/>
                  <Icon name="bi:whatsapp" class=" text-lg hover:border-2 hover:border-secondary hover:rounded-full"/>
                </li>
              </ul>
              <p class="font-playfair font-medium text-lg text-secondary py-3">Customer Review</p>
              <div class="flex items-center">
                <Icon name="material-symbols:star-rounded" class=" text-2xl text-red-500"/>
                <Icon name="material-symbols:star-rounded" class=" text-2xl text-red-500"/>
                <Icon name="material-symbols:star-rounded" class=" text-2xl text-red-500"/>
                <Icon name="material-symbols:star-rounded" class=" text-2xl text-red-500"/>
                <Icon name="material-symbols:star-rounded" class=" text-2xl text-red-500"/>
                <p class="font-roboto text-sm font-normal tracking-wide text-gray-500">( 1 ) Ratings</p>
              </div>
            </div>-->
            <!--            <p class="font-roboto text-sm font-normal pl-10 tracking-wide text-gray-500">Category Shop Tag Product</p>-->
          </div>
        </div>
      </div>
      <div>
        <h2
          class="font-playfair font-medium text-green-800 text-2xl lg:text-4xl p-10 px-0 pt-20 tracking-widest"
        >
          Description
        </h2>
        <p>{{ productDetails?.product?.about }}</p>
        <h2
          class="font-playfair font-medium text-2xl text-green-800 lg:text-4xl p-10 pl-0 tracking-widest"
        >
          Related products
        </h2>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 pb-20">
          <div
            :key="product.id"
            v-for="product in productDetails?.products.slice(0, 4)"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import Gallary from "@/components/Gallary.vue";
import ProductCard from "@/components/ProductCard.vue";
import Cake360 from "@/components/CustomCake/Cake360.vue";

import useAxios from "@/composables/useAxios.js";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/useCartStore.js";
import { useCustomCakeStore } from "@/stores/customCakeStore.js";

import { useToast } from "vue-toastification";

const route = useRoute();
const cartStore = useCartStore();
const customCakeStore = useCustomCakeStore();
const toast = useToast();
const isModalVisible = ref(false);
cartStore.initCart();

const { sendRequest, loading, error } = useAxios();
const message = ref(null);
const productDetails = ref([]);
const selectPrice = ref();
const getSingleProduct = async () => {
  const data = await sendRequest({
    url: `/v1/product/${route?.params?.id}`,
  });
  productDetails.value = data.data;
  // console.log(data.data.product.video_url);

  selectPrice.value = JSON.parse(data.data?.product?.variant)[0];
};

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const qty = ref(1);
const up = () => {
  qty.value += 1;
};
const down = () => {
  if (qty.value > 1) qty.value -= 1;
};

const addToCart = () => {
  cartStore.addToCart({
    id: productDetails.value?.product?.id,
    title: productDetails.value?.product?.title,
    price: selectPrice.value.price,
    variant: selectPrice.value,
    thumbnail: productDetails.value?.product?.thumbnail,
    message: message.value,
    buyQty: qty.value,
  });
  qty.value = 1;
  toast.success("Added To Cart... !");
};

const changePrice = (event) =>
  (selectPrice.value = JSON.parse(event.target.value));

const qtyCheck = (event) => {
  if (event.target.value < 1) {
    toast.warning("Min Quantity 1");
    buyQty.value = 1;
  }
};

onMounted(async () => {
  await getSingleProduct();
});

const getImages = computed(() => {
  let images = [];

  images = productDetails?.value?.product?.images?.map(
    (item) => item?.image_url
  );

  images.push(productDetails?.value?.product?.thumbnail);

  return images;
});
</script>

<style lang="scss" scoped></style>
