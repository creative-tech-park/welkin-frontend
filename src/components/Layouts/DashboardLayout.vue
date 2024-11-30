<script setup lang="ts">
import SideBar from '@/components/Layouts/SideBar.vue';
</script>
<template>

  <AppLayout>
    <div class="bg-primary-500 relative w-full min-h-screen h-full flex mt-20 lg:mt-0 lg:pt-0">
      <aside class="hidden lg:block lg:w-80 bottom-0 min-h-screen h-full bg-primary-500">
        <SideBar />
      </aside>
      <main class="lg:block w-full min-h-screen h-full bg-slate-100 lg:p-4 pb-10">
        <div class="pb-1">
          <slot />
        </div>
      </main>
    </div>
  </AppLayout>
</template>
 