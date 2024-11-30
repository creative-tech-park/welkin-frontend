<template>
  <AppLayout>
    <section>
      <div class="flex justify-between px-5 py-2 text-primary text-lg font-semibold font-playfair lg:hidden
                        transition-all ease-in-out duration-1000">
        <h2>All products</h2>
        <button @click="filter = !filter">
          <Icon name="material-symbols:filter-alt-outline" class="text-secondary text-2xl"/>
        </button>
      </div>

      <div class="container flex">
        <div
            class="custom-scroll fixed z-10 top-0 left-0 bottom-0 w-52 lg:relative lg:w-3/12 lg:block lg:translate-x-0 overflow-scroll  bg-white transition-all ease-in-out duration-700"
            :class="{'translate-x-0' : filter, '-translate-x-60' : !filter}">
          <div class="border-r px-5 py-12 w-full">
            <div>
              <ul>
                <li>
                  <div
                      class="group flex items-center gap-3 py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300 cursor-pointer relative"
                      @click="isCetagoryLinks = !isCetagoryLinks">
                    <span
                        class="font-playfair tracking-widest  group-hover:text-secondary text-lg font-medium transition-all ease-in-out duration-300">Cetagory</span>
                    <div class="absolute top-1/2 -translate-y-1/2 right-2 transition-all  ease-in-out duration-300"
                         :class="{'rotate-90 ' : isCetagoryLinks}">
                      <Icon name="ic:twotone-keyboard-arrow-right" size="20"
                            class="group-hover:text-secondary  transition-all ease-in-out duration-300"/>
                    </div>
                  </div>

                  <div class="overflow-hidden">
                    <ul class="cetagory-links flex flex-col gap-3 text-sm font-playfair pl-8 py-4"
                        :class="{'cetagory-links--active' : isCetagoryLinks}">
                      <li class="category-filter" v-for="item in categories">
                        <RouterLink :to="{name:'AllProducts', query:{...route.params, category:item?.id}}" class="flex items-center gap-2">
                          <span class="border-2 border-secondary w-5 h-5 rounded-full flex items-center justify-center ">
                              <span class="icon w-3 h-3 rounded-full block"></span>
                          </span>
                          <p>{{ item?.name }}</p>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-9/12 ">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mt-5">
            <ProductPreLoader v-if="loading" v-for="i in 12"/>
            <div class="col-span-1 py-4 lg:px-3" v-for="item in products?.data">
              <ProductCard :product="item"/>
            </div>
          </div>

          <div class="flex items-center justify-center gap-5 mb-12">
            <button @click="getProducts(products.prev_page_url)"
                    class="bg-primary-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
              <Icon name="mdi:arrow-left" class=" text-2xl"/>
              <span>Preview</span>
            </button>
            <button @click="getProducts(products.next_page_url)"
                    class="bg-primary-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
              <span>Next</span>
              <Icon name="mdi:arrow-right" class=" text-2xl"/>
            </button>
          </div>
        </div>
      </div>
    </section>

  </AppLayout>
</template>
<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import ProductCard from "@/components/ProductCard.vue";
import {inject, onMounted, ref, watch} from 'vue';
import useAxios from "@/composables/useAxios.js";
import {useRoute} from "vue-router";
import ProductPreLoader from "@/components/ProductPreLoader.vue";

const isCetagoryLinks = ref(true);
const filter = ref(false);
const route = useRoute();
const {sendRequest, loading, error} = useAxios()

const locations = inject('locations')
const products = ref([])
const getProducts = async (url) => {

  const productRes = await sendRequest({
    url: url ?? '/v1/filter-products',
    params: {...route?.query},
    method: 'GET'
  })

  products.value = productRes.data
}
const categories = ref([])
const getCategories = async (url) => {
  const catRes = await sendRequest({
    url: url ?? '/v1/all-categories',
    method: 'GET'
  })

  categories.value = catRes.data
}


onMounted(async () => {
  await getProducts()
  await getCategories()
})


</script>