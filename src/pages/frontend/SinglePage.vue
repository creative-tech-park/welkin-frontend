<template>
  <AppLayout>
    <div class="w-full">
      <div class="container mx-auto min-h-screen h-full bg-gray-50 shadow-md p-6 my-10">
        <h1 class="font-bold text-3xl">{{ pageDetails?.title }}</h1>
        <div class="mt-10 px-6 allImages overflow-hidden">
          <div v-html="pageDetails?.content"/>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import useAxios from "@/composables/useAxios.js";
import { onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const { sendRequest, loading, error } = useAxios();
const pageDetails = ref([])
const getSInglePage = async () => {
  const data = await sendRequest({
    url: `/v1/pages/${route?.params?.id}`
  })
  pageDetails.value = data.data
}



onMounted(async () => {
  await getSInglePage();
})

</script>

<style lang="scss" scoped>
.allImages img {
  max-width: 100%; /* Ensures the image doesn't overflow its container */
  height: auto;    /* Maintains the aspect ratio */
  width: auto;     /* Optional: Set width to auto if you want to maintain original image width */
  max-height: 500px; /* Example: Limit the height to a maximum value */
}
</style>