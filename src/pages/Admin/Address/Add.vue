
<script setup>


import useAxios from "@/composables/useAxios.js";
import {onMounted, ref} from "vue";
import LoadingButton from "@/components/LoadingButton.vue";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
const toast = useToast();
const route = useRoute();
const router = useRouter()

const {sendRequest, error, loading} = useAxios();
const from = ref({
  id:null,
  address:null,
  phone:null,
  shipping_area_id:null,
})

const handelSubmit = async () => {
  const data = await sendRequest({
    url: "/v1/save-shipping-address",
    method: 'POST',
    data: from.value
  })

  toast.success('Action processed ....')
  from.value = {}

  if(route.query?.redirect)await router.push(route.query?.redirect);
}


const orderAreas = ref([])
const getOrderAreas = async () => {
  const data = await sendRequest({
    url:"/v1/order-areas",
    method:'GET'
  })
  orderAreas.value = data?.data
}


const getSingleAddress = async () => {
  const response = await sendRequest({
    url: `/v1/single-shipping-address/${route?.params?.id}`,
    method: 'GET'
  })
  from.value.id = response.data?.id
  from.value.phone = response.data?.phone
  from.value.address = response.data?.address
  from.value.shipping_area_id = response.data?.shipping_area_id
}




onMounted(async () => {
  if(route?.params?.id) await getSingleAddress()
  await getOrderAreas()
})

</script>
<template>
  <DashboardLayout>
    <section class="px-4">
      <div class="bg-white p-4 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="carbon:ibm-data-product-exchange" class="text-3xl text-secondary" />
            <h3 class="text-secondary text-sm lg:text-3xl font-semibold">{{ $route?.params?.id ? 'Edit' : 'Add' }} Address</h3>
          </div>
          <div>
            <RouterLink :to="{name:'Addresses'}" class="bg-secondary-500 text-white  px-3 py-1 lg:px-5 lg:py-2 flex items-center gap-2">
              <Icon name="material-symbols:arrow-back-ios-new" />
              <span>Go Back</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-20 h-full">
      <div class="px-4 w-full lg:w-[70%] min-h-screen h-full mx-auto">
        <form @submit.prevent="handelSubmit" class="h-full bg-white shadow-md dark:bg-gray-800 sm:rounded-lg p-5">

          <div class="flex flex-col w-full">
            <label class="font-semibold text-lg">Phone Number</label>
            <input type="text" min="11" v-model="from.phone" class="mt-2 py-2 w-full border-2 border-primary/30 focus:border-primary rounded-md"/>
          </div>

          <div class="flex flex-col w-full mt-5">
            <label class="font-semibold text-lg">Full Address</label>
            <textarea rows="3" v-model="from.address" class="mt-2 w-full border-2 border-primary/30 focus:border-primary rounded-md"></textarea>
          </div>
          <div class="flex flex-col w-full mt-5">
              <label class="font-semibold text-lg">Select Area</label>
              <Select
                  class="border-1 border-primary/30 focus:border-primary rounded-md"
                  v-model="from.shipping_area_id"
                  :options="orderAreas"
                  :reduce="item => item.id"
                  label="name"
              />
            </div>

          <div>
            <LoadingButton :isLoading="loading">{{ $route?.params?.id ? 'Update' : 'Save' }}</LoadingButton>
          </div>
        </form>

      </div>
    </section>
  </DashboardLayout>
</template>
