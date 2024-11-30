<script setup>
import { inject, onMounted, provide, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import Icon from "@/components/Icon.vue";
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import FaceSlider from "@/components/FaceSlider.vue";
import ProductPreLoader from "@/components/ProductPreLoader.vue";
import CustomerTestimonials from "@/components/CustomerTestimonial.vue";
import CompanyService from "@/components/CompanyService.vue";
import VisitShop from "@/components/Home/VisitShop.vue";
import Support from "@/components/Home/Support.vue";
import FeaturedCategoryProducts from "@/components/Home/FeaturedCategoryProducts.vue";
import { useHomeStore } from "@/stores/homeStore";

const homeStore = useHomeStore();

const { sendRequest, loading, error } = useAxios();
const bestSellingProducts = ref([]);
const productLoading = ref(true);

const getLatestProducts = async () => {
  const data = await sendRequest(
    { url: "/v1/best-selling-product" },
    productLoading
  );
  bestSellingProducts.value = data;
};

onMounted(async () => {
  await getLatestProducts();
});

const settings = inject("settings");
</script>

<template>
  <AppLayout>
    <FaceSlider :loadSliders="homeStore.sliders" />

    <FeaturedCategoryProducts />

    <!--  best selling cakes start  -->
    <div class="container mx-auto">
      <div class="border-b flex justify-between items-center">
        <h2
          class="text-xl text-green-800 font-bold p-4 pl-0 border-b-4 border-primary-500 text-secondary capitalize"
        >
          Best Selling Cakes
        </h2>
        <RouterLink
          to="/all-products"
          class="flex items-center font-semibold capitalize"
        >
          <span>View All</span>
          <Icon name="material-symbols:arrow-right-alt" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-4 gap-5 mt-10" v-if="productLoading">
        <ProductPreLoader :key="i" class="col-span-1" v-for="i in 4" />
      </div>
      <ProductSlider
        v-else
        :category="{ name: null, products: bestSellingProducts.data }"
      />
    </div>

    <VisitShop />
    <CompanyService />
    <Support />
    <CustomerTestimonials />
  </AppLayout>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
