<template>
  <AppLayout>
    <section>
      <div
        class="bg-[url('https://www.nicdarkthemes.com/themes/cake-bakery/wp/demo/bakery-wordpress-theme/wp-content/uploads/sites/5/2023/10/focus-08-1024x683.jpg')] relative bg-cover bg-center bg-no-repeat py-10"
      >
        <span
          class="absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-black/70"
        ></span>
        <div class="relative z-10 flex justify-center font-playfair">
          <div class="container mx-auto bg-white rounded-xl">
            <div class="flex gap-2 p-3">
              <div class="lg:w-1/2 w-full grid place-items-center">
                <div
                  class="w-full max-w-xs mx-auto h-max bg-primary-500/55 rounded-xl shadow-md"
                >
                  <h3 class="text-center text-white font-bold text-2xl py-5">
                    Login
                  </h3>
                  <form @submit.prevent="handleLogin" class="w-full px-8">
                    <div class="text-white w-full">
                      <label for="email" class="block pb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        v-model="loginCredential.email"
                        class="block w-full border-0 py-2 text-primary-900 shadow-sm ring-1 ring-inset focus:outline-none ring-primary placeholder:text-gray-400 px-3 mb-2"
                        placeholder="Your Username"
                      />
                      <small
                        class="text-red-50 block py-2 rounded-lg text-center bg-red-500 w-full"
                        v-if="authStore.error?.response?.data?.errors?.email"
                        >{{
                          authStore.error?.response?.data?.errors?.email[0]
                        }}</small
                      >
                    </div>
                    <div class="text-white">
                      <label for="password" class="block pb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        v-model="loginCredential.password"
                        class="block w-full border-0 py-2 text-primary-900 shadow-sm ring-1 ring-inset focus:outline-none ring-primary placeholder:text-gray-400 px-3 mb-2"
                        placeholder="Your Password"
                      />
                    </div>

                    <div class="text-center py-5">
                      <LoadingButton :isLoading="authStore.loading"
                        >Login</LoadingButton
                      >
                      <!--                      <button class="w-full py-2 bg-secondary-500 hover:bg-white transition-all ease-in-out duration-500 text-white hover:text-secondary font-bold text-center my-2">-->
                      <!--                        Log In-->
                      <!--                      </button>-->
                    </div>
                    <p class="font-normal text-sm p-3 text-center text-white">
                      Don't Have an Account ?

                      <router-link
                        class="flex items-center justify-center hover:text-primary hover:font-bold"
                        :to="{
                          name: 'Register',
                          query: { redirect: $route.query.redirect },
                        }"
                      >
                        Create an Account
                      </router-link>
                    </p>
                  </form>
                </div>
              </div>

              <div class="hidden lg:block w-1/2">
                <div class="w-full h-full rounded-xl">
                  <img
                    class="w-full h-full rounded-xl object-cover"
                    src="https://img.freepik.com/premium-photo/fresh-homemade-bread-isolated-white-background_488220-15877.jpg?w=740"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore.js";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import LoadingButton from "@/components/LoadingButton.vue";
import { loadavg } from "node:os";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

//Login
const loginCredential = ref({
  email: null,
  password: null,
});

const handleLogin = async () => {
  const loginResponse = await authStore.login(loginCredential.value);
  if (loginResponse) {
    toast.success("Login successful!", { autoClose: 1000 });

    await router.push(
      route.query?.redirect ? route.query?.redirect : { name: "Dashboard" }
    );
  }
};
</script>
<style scoped></style>
