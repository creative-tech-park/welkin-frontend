<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useCartStore } from "@/stores/useCartStore.js";
import { useToast } from "vue-toastification";
import { inject, onMounted, ref } from "vue";
const cartStore = useCartStore();
const toast = useToast();
cartStore.initCart();
const route = useRouter();
const props = defineProps({ product: Object, isLoading: false });

const qty = ref(1);
const up = () => {
  qty.value += 1;
};
const selectPrice = ref(JSON.parse(props.product?.variant)[0]);
const down = () => {
  if (qty.value > 1) qty.value -= 1;
};
const addToCart = () => {
  cartStore.addToCart({
    id: props?.product?.id,
    title: props?.product?.title,
    price: selectPrice.value.price,
    variant: selectPrice.value,
    thumbnail: props?.product?.thumbnail,
    buyQty: qty.value,
  });
  qty.value = 1;
  toast.success("Added To Cart... !");
};

const changePrice = (event) =>
  (selectPrice.value = JSON.parse(event.target.value));
</script>

<template>
  <div>
    <div class="flex flex-col rounded-t-xl overflow-hidden shadow-gray-400">
      <RouterLink
        :to="{ name: 'SingleProducts', params: { id: product?.id } }"
        class="overflow-hidden"
      >
        <img
          class="rounded-t-lg w-full h-60 md:mb-0 mb-2 md:h-48 object-cover image-transition"
          :src="product?.thumbnail"
          alt=""
        />
      </RouterLink>
      <div class="bg-white rounded-xl lg:p-3">
        <RouterLink
          :to="{ name: 'SingleProducts', params: { id: product?.id } }"
          class="flex items-center flex-col pt-1 lg:pt-6"
        >
          <h2
            class="font-normal text-center text-sm md:text-lg text-gray-900 capitalize"
          >
            {{ product?.title }}
          </h2>
          <h3 class="font-bold text-xs md:text-lg text-primary mb-2 md:mb-0">
            Tk. {{ selectPrice?.price }}
          </h3>
        </RouterLink>

        <div
          class="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between pt-1 lg:pt-6"
        >
          <div
            class="w-full md:w-1/2"
            v-if="JSON.parse(props.product?.variant)?.length > 1"
          >
            <select
              class="border-gray-200 focus:border-primary-500 w-full lg:px-5 py-1 rounded-md font-semibold"
              @change="changePrice($event)"
            >
              <option value="null" disabled>Select variant</option>
              <option
                :value="JSON.stringify(item)"
                v-for="item in JSON.parse(product?.variant)"
              >
                {{ item?.weight }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-3" v-else>
            <button
              @click="down"
              class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-7 h-7 font-bold text-lg"
            >
              -
            </button>
            <span class="font-bold text-sm"> {{ qty }}</span>
            <button
              @click="up"
              class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-7 h-7 font-bold text-lg"
            >
              +
            </button>
          </div>

          <button
            @click="addToCart"
            class="w-full md:w-auto border-gray-200 hover:bg-hover-500 hover:border-transparent font-semibold hover:text-white transition-all ease-in-out duration-300 border-2 px-5 py-1 rounded-md"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
