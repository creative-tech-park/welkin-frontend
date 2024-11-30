<template>
  <router-view :key="routeKey"></router-view>
  <WaChat />
</template>

<script setup>
import { computed, onMounted, ref, provide } from "vue";
import { useRoute } from "vue-router";
import WaChat from "./components/WaChat.vue";

import useAxios from "@/composables/useAxios.js";
// Use useRoute to access the current route object
const route = useRoute();

// Compute a unique key based on the route path and query parameters
const routeKey = computed(() => route.path + "-" + JSON.stringify(route.query));

const headerSettings = ref(null);
provide("settings", headerSettings);
const businessLocation = ref(null);
provide("locations", businessLocation);
const categories = ref([]);
provide("categories", categories);
const parentCats = ref([]);
provide("parentCats", parentCats);

const { sendRequest, loading, error } = useAxios();
onMounted(async () => {
  const response = await sendRequest({
    url: "/v1/get-settings?name=profile,social,hero,counter,header,footer",
    method: "GET",
  });

  headerSettings.value = response.data;
  const bLocations = await sendRequest({
    url: "/v1/business-locations",
    method: "GET",
  });
  businessLocation.value = bLocations.data;

  const cat = await sendRequest({
    url: "/v1/categories",
    method: "GET",
  });
  categories.value = cat.data?.cats;
  parentCats.value = cat.data?.pCats;
});
</script>
