<script setup>
import {RouterLink, useRouter} from 'vue-router';
import {useCartStore} from "@/stores/useCartStore.js";
import {useToast} from "vue-toastification";
import {inject, onMounted, ref} from "vue";
const cartStore = useCartStore()
const toast = useToast();
cartStore.initCart();
const route = useRouter()
const props = defineProps({product: Object, isLoading:false})

const qty = ref(1)
const up = () =>{
  qty.value += 1;
}
const selectPrice = ref(JSON.parse(props.product?.variant)[0])
const down = () =>{
  if(qty.value > 1) qty.value -= 1;
}
const addToCart = () => {
  cartStore.addToCart({
    id: props?.product?.id,
    title: props?.product?.title,
    price: selectPrice.value.price,
    variant: selectPrice.value,
    thumbnail: props?.product?.thumbnail,
    buyQty:qty.value
  })
  qty.value = 1;
  toast.success('Added To Cart... !')
}

const changePrice = (event) => selectPrice.value = JSON.parse(event.target.value)
</script>


<template>
  <div class="flex gap-3 overflow-hidden">
    <RouterLink :to="{name:'SingleProducts', params:{id:product?.id}}" class="w-[40%] overflow-hidden">
      <img class="image-transition" :src="product?.thumbnail" alt="null"/>
    </RouterLink>
    <div>
      <RouterLink :to="{name:'SingleProducts', params:{id:product?.id}}">
        <h2 class="font-semibold">{{ product?.title }}</h2>
        <p class="font-bold text-lg">Tk. {{ selectPrice.price }}</p>
      </RouterLink>
      <div class="flex items-center gap-1 lg:gap-4 w-full justify-between pt-6">
        <div class="w-[45%]" v-if="JSON.parse(props.product?.variant)?.length > 1">
          <select class="border-gray-200 w-full px-5 py-1 rounded-md  font-semibold" @change="changePrice($event)">
            <option value="null" disabled>Select variant</option>
            <option :value="JSON.stringify(item)" v-for="item in JSON.parse(product?.variant)">{{ item?.weight }}</option>
          </select>
        </div>

        <div class="flex items-center gap-2"  v-else>
          <button @click="down"  class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-7 h-7 font-bold text-lg">-</button>
          <span class="font-bold text-sm">{{ qty }}</span>
          <button @click="up" class="bg-gray-200 hover:bg-gray-200/70 transition-all ease-in-out rounded-sm w-7 h-7 font-bold text-lg">+</button>
        </div>


        <div class="max-w-max">
          <button @click="addToCart" class="max-w-max border-gray-200 hover:bg-hover-500 hover:border-transparent font-semibold hover:text-white transition-all ease-in-out duration-300 border-2 px-2 lg:px-5 py-1 rounded-md">
            Add Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>