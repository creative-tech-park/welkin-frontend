<template>
  <DashboardLayout>
    <button @click="printInvoice('printable-area')"
            class="inline-flex  gap-3 items-center justify-center font-semibold px-3 py-2 bg-green-500 rounded-lg text-white">
      <Icon name="solar:download-minimalistic-bold-duotone" class="text-lg text-white"/>
      <span>Download Invoice</span>
    </button>
    <div class="mx-auto w-full lg:w-[70%]">
      <div class="w-full p-6 bg-white rounded shadow-sm my-6" id="printable-area">
        <div class="grid grid-cols-2 items-center"  >
          <div>
            <img class="w-32 h-auto p-2" src="@/assets/images/logo.png" alt="">
          </div>
          <div class="text-right">
            <p>
              {{ settings?.profile?.name }}
            </p>
            <p class="text-gray-500 text-sm">
              {{ settings?.profile?.email }}
            </p>
            <p class="text-gray-500 text-sm mt-1">
             {{ settings?.profile?.phone }}
            </p>
          </div>
        </div>

        <!-- Client info -->
        <div class="grid grid-cols-2 items-center mt-8">
          <div>
            <p class="font-bold text-gray-800">
              Bill to :
            </p>
            <p class="text-gray-500">
              Name: {{ order?.customer?.name }}
              <br/>
            Address: {{ order?.address?.address }}
            </p>
            <p class="text-gray-500">
              Phone Number: {{ order?.customer?.phone }}, {{ order?.address?.phone  }}
            </p>
          </div>

          <div class="text-right">
            <span>#INV-{{ order.id + moment(order.created_at)?.format('DDMMYYYY')}}</span>

            <p>
              Order date: <span class="text-gray-500">{{ moment(order?.created_at).format('DD/MM/YYYY') }}</span>
              <br/>
              Invoice date:<span class="text-gray-500">{{ moment().format('DD/MM/YYYY') }}</span>
            </p>
            <p class="mt-3">Order Status: <span class="px-3 py-1 bg-primary-500/90 text-white font-semibold text-sm rounded-lg capitalize">{{ order?.order_status }}</span></p>
            <p class="mt-3">Payment Status: <span class="px-3 py-1 bg-orange-400 text-white font-semibold text-sm rounded-lg capitalize">{{ order?.payment_status }}</span></p>
          </div>
        </div>
        <!-- Invoice Items -->
        <div class="-mx-4 mt-8 flow-root sm:mx-0">
          <table class="min-w-full">
            <colgroup>
              <col class="w-full sm:w-1/2">
              <col class="sm:w-1/6">
              <col class="sm:w-1/6">
              <col class="sm:w-1/6">
            </colgroup>
            <thead class="border-b border-gray-300 text-gray-900">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
              <th scope="col" class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                Quantity
              </th>
              <th scope="col" class="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                Price
              </th>
              <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-b border-gray-200" v-for="details in order?.order_details">
              <td class="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="font-medium text-gray-900">{{ details?.product?.title }}</div>
                <div class="mt-1 truncate text-gray-500" v-if="JSON.parse(details?.product_variant)?.weight">
                  Variant: {{ JSON.parse(details?.product_variant)?.weight }}
                </div>
                <div class="mt-2" v-if="JSON.parse(details?.product_variant)?.message">
                  Message: {{ JSON.parse(details?.product_variant)?.message }}
                </div>
              </td>
              <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">{{ details?.quantity }}</td>
              <td class="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">Tk. {{ details?.product?.price }}</td>
              <td class="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">Tk. {{ (details?.quantity) * (details?.product?.price) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th scope="row" colspan="3"
                  class="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">
                Subtotal
              </th>
              <th scope="row" class="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
              <td class="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">Tk. {{ order?.sub_total }}</td>
            </tr>
            <tr>
              <th scope="row" colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Delivery Charge
              </th>
              <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Delivery Charge</th>
              <td class="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">Tk. {{ order?.address?.order_area?.delevery_charge }}</td>
            </tr>

            <tr>
              <th scope="row" colspan="3"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total
              </th>
              <th scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
              <td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Tk. {{ parseInt(order?.address?.order_area?.delevery_charge) + parseInt(order?.sub_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div>
            <img class="w-20 h-20" src="@/assets/images/welkinqrcode.png" />
            <p class="text-base font-normal">Whatsapp</p>
          </div>
        </div>

        <!--  Footer  -->
        <div class="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
          This is computer generated invoice no signature required
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from "@/components/Layouts/DashboardLayout.vue";
import {computed, inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import useAxios from "@/composables/useAxios.js";
import moment from "moment";
const order = ref({})
const { sendRequest, error, loading } = useAxios();
const settings = inject('settings')
const getOrder = async () => {
  const route = useRoute();
  const data = await sendRequest({
    url: `/v1/order-detail/${route.params?.id}`
  })
  order.value = data.data
}

onMounted( async () => {
  await getOrder()
})

const today = computed(()=>{
  const date = new Date()
  return date.getDate() +'/'+ date.getMonth()+'/'+date.getFullYear()
})


const printInvoice = (areaID) =>{
  var printContent = document.getElementById(areaID).innerHTML;
  var originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
}
</script>