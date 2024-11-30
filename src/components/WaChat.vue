<template>
    <div class="fixed bottom-24 right-10 z-10">
      <a :href="`https://wa.me/${settings?.profile?.whatsapp}`" target="_blank">
        <img 
          class="wa-chat w-12 h-12 transition-transform duration-200 hover:scale-110" 
          src="/wa.png"
          alt="What's App chat" 
        />
      </a>
    </div>
  </template>
  

<script setup>
import {inject} from "vue";
const settings = inject("settings");
</script>

<style></style>
