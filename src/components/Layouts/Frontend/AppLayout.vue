<script setup>

import Header from "@/components/Layouts/Frontend/Header.vue";
import Footer from "@/components/Layouts/Frontend/Footer.vue";
import PreLoader from "@/components/PreLoader.vue";
import { onMounted, ref} from 'vue';

const show = ref(true)
onMounted(()=>{
    setTimeout(()=>{
        show.value = false
    }, 2500)
})

</script>

<template>
<!--    <PreLoader v-if="show"/>-->
    <div class="">
      <Header/>
        <main class="mt-16 lg:mt-0">
            <slot />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<style scoped>

</style>
