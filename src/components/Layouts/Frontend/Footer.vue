<script setup>
import { inject } from "vue";

const settings = inject("settings");
</script>

<template>
  <footer
    class="bg-[url('https://www.nicdarkthemes.com/themes/cake-bakery/wp/demo/bakery-wordpress-theme/wp-content/uploads/sites/5/2023/10/parallax-02.jpg')] relative bg-cover bg-center bg-no-repeat min-h-[55rem] lg:min-h-[24rem] h-full"
  >
    <span
      class="absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-primary-800/80 backdrop-blur-xl"
    ></span>

    <div class="container relative mx-auto z-10 top-12 lg:top-14 h-full">
      <div
        class="grid grid-cols-2 md:grid-cols-5 gap-10 border-b border-b-primary-800/80 pb-10 lg:pb-10"
      >
        <div class="col-span-2">
          <div>
            <img
              class="w-16 h-auto object-cover hover:scale-125 transition-all ease-in-out duration-500"
              src="@/assets/images/logo.png"
              alt=""
            />
            <p class="text-secondary-100 mt-5">
              {{ settings?.profile?.footer_cntent }}
            </p>
          </div>
        </div>
        <div class="col-span-1" v-for="item in settings?.footer">
          <h2 class="font-semibold text-lg text-secondary-100">
            {{ item?.column }}
          </h2>
          <ul class="flex flex-col gap-3 mt-5">
            <li
              :key="page.id"
              v-for="page in item?.pages"
              class="font-normal text-xs text-secondary-500 hover:text-secondary-200 transition-all ease-in-out duration-150 capitalize"
            >
              <RouterLink
                style="font-size: 15px"
                :to="{ name: 'SinglePage', params: { id: page.id } }"
                >{{ page?.title }}</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="col-span-1">
          <h2 class="font-semibold text-lg text-secondary-100 mb-4">
            Contact Us
          </h2>
          <ul>
            <li
              style="font-size: 15px"
              class="mb-2 font-normal text-xs text-secondary-500 hover:text-secondary-200 transition-all ease-in-out duration-150 capitalize"
            >
              <!-- <span style="font-size: 13px">Address:</span> <br /> -->
              {{ settings?.profile?.address }}
            </li>
            <li
              style="font-size: 15px"
              class="font-normal text-xs text-secondary-500 hover:text-secondary-200 transition-all ease-in-out duration-150 mb-2"
            >
              <!-- <span style="font-size: 13px">Email:</span> <br /> -->

              {{ settings?.profile?.email }}
            </li>
            <li
              style="font-size: 15px"
              class="mb-2 font-normal text-xs text-secondary-500 hover:text-secondary-200 transition-all ease-in-out duration-150 capitalize"
            >
              <!-- Phone: -->
               {{ settings?.profile?.phone }}
            </li>
            <!-- <li
              style="font-size: 15px"
              class="font-normal text-xs text-secondary-500 hover:text-secondary-200 transition-all ease-in-out duration-150 capitalize"
            >
              Whatsapp: 
              {{ settings?.profile?.whatsapp }}
            </li> -->
          </ul>
        </div>
      </div>

      <div
        class="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 lg:items-center"
      >
        <img style="width: 350px;" src="@/assets/images/ssl-footer.webp" alt="" />
        <p class="text-secondary-200">
          © {{ new Date()?.getFullYear() }} All Rights Reserved By Welkinpastry.
        </p>
        <p class="text-md text-white">
          <a class="text-secondary-300" href="https://creativetechpark.com/"
            >Web Development Company</a
          >
          Creative Tech Park.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
