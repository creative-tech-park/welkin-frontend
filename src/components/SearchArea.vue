<template>

  <div @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <input
        v-model="searchQuery"
        @focus="showDropdown = true"
        @blur="handleBlur"
        class="border-2 lg:h-full px-2 py-2.5 lg:p-4 border-hover-500 rounded-md w-full font-normal text-xs placeholder-gray-400 focus:border-hover-500 focus:outline-none outline-none"
        placeholder="Search: Cakes, Cookies, Biscuits..."/>
    <RouterLink class="absolute px-5 py-1 bg-primary-500 rounded-md top-1 right-1 text-white" :to="`/all-products?search=${searchQuery}`">Search</RouterLink>
    <Transition name="fade">
      <div id="area"
          v-show="showDropdown"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          class="custom-scroll absolute w-full bg-primary-50/80 backdrop-blur-xl shadow-2xl rounded-md overflow-y-auto p-1 lg:p-5 pb-20 z-50 top-10 h-full min-h-80">
          <div class="w-full h-full">
            <p v-if="items?.length" class="font-semibold my-5 text-sm">Showing {{ items?.length }} results for "{{ searchQuery }}"</p>
            <ul class="flex flex-col gap-4 mb-10" v-if="!loading && items?.length">
              <li class="bg-white px-2 py-1 lg:px-5 lg:py-3 rounded-md last:mb-10" v-for="item in items">
                <RouterLink :to="{name:'SingleProducts', params:{id:item?.id}}" class="flex items-start gap-5">
                  <img class="w-16" :src="item?.thumbnail" alt="">
                  <div>
                    <h2 class="font-bold text-sm lg:text-lg capitalize">{{ item?.title }}</h2>
                    <p class="font-bold">Tk. {{ JSON.parse(item?.variant)[0]?.price }}</p>
                  </div>
                </RouterLink>
              </li>
            </ul>
            <div v-if="loading">
              <ul class="flex flex-col gap-4 mb-10">
                <li class="bg-white px-5 py-3 rounded-md animate-pulse" v-for="i in 10">
                  <div class="flex items-start gap-5">
                    <div class="w-16 h-16 bg-gray-200 rounded-md"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-6 bg-gray-200 rounded-md w-3/4"></div>
                      <div class="h-6 bg-gray-200 rounded-md w-1/2"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="!items.length">
              <p class="font-bold text-lg">No Queries Found</p>
            </div>
          </div>



      </div>

    </Transition>
  </div>


<!--  <div class="position-relative w-50" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <input
        type="text"
        v-model="searchQuery"
        @focus="showDropdown = true"
        @blur="handleBlur"
        class="w-100 border rounded form-control py-1"
        placeholder="Search..."
    />
    <div
        id="area"
        v-show="showDropdown"
        class="position-absolute w-100 bg-white border shadow-sm rounded mt-1 p-2 max-area"
        style="z-index:10"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
    >
      <div>
        <p class="fw-bold">Showing {{ items?.total }} results for Search <span v-if="searchQuery">"{{ searchQuery }}"</span></p>
        <p v-if="loading">Loading.....</p>
      </div>

      <div class="flex items-center justify-center" v-if="!items?.data?.length && !loading">
        <p>No product found</p>
      </div>

      <ul class="flex flex-col gap-2 list-group">
        <li
            class="list-group-item"
            v-for="(item, index) in items?.data"
            :key="index"
        >
          <a :href="`/product/single-product/${item.product.slug}`">
            <div class="d-flex align-items-center gap-2">
              <img style="width:80px; height:auto"
                   :src="item.product.thumbnail"
                   alt="">
              <div>
                <p class="fs-5 fw-bold">{{ item.product?.title }}</p>
                <p>{{ $showPrice(item?.product.discount > 0 ? item?.product.discount : item?.product.price) }}</p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>-->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import useAxios from "@/composables/useAxios.js";
const {sendRequest, loading, error} = useAxios()

const searchQuery = ref('');
const showDropdown = ref(false);
const items = ref([]);
const isClickingInside = ref(false);

const handleBlur = () => {
  setTimeout(() => {
    if (!isClickingInside.value) {
      showDropdown.value = false;
    }
  }, 100); // Delay to allow item click before hiding
};

const handleMouseDown = () => {
  isClickingInside.value = true;
};

const handleMouseUp = () => {
  setTimeout(() => {
    isClickingInside.value = false;
  }, 100);
};

const handleClickOutside = (event) => {
  const area = document.getElementById('area');
  if (area && !area.contains(event.target) && !event.target.matches('input')) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});




watch(searchQuery, async function (val) {
  loading.value = true
  if (val.length) {
    await sendRequest({
      url:'/v1/filter-products',
      method:'GET',
      params: {
        search: val,
        onlyData:true
      }
    }).then(res => {
      items.value = res.data
    } ).catch(e => console.log(e))
  }else{
    loading.value = false
  }
});


</script>

<style scoped>
.max-area{
  max-height: 60vh;
  overflow-x: scroll;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
  transform: translateY(-50%);
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.5s ease;
}



</style>
