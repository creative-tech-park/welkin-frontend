<template>
  <AppLayout>
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-screen">
        <!-- Sidebar Section -->
        <div
          class="lg:col-span-4 bg-gradient-to-br from-primary-500 to-primary-700 py-12 px-10 rounded-xl shadow-xl"
        >
          <div class="space-y-8 text-white">
            <div>
              <p class="font-bold text-2xl mb-4">Office Address</p>
              <div class="flex items-start gap-3">
                <Icon
                  name="material-symbols:location-on-outline-rounded"
                  class="w-6 h-6"
                />
                <p>{{ settings?.profile?.address }}</p>
              </div>
            </div>

            <div>
              <p class="font-bold text-2xl mb-4">Phone</p>
              <div class="flex items-start gap-3">
                <Icon name="solar:phone-rounded-outline" class="w-6 h-6" />
                <p>{{ settings?.profile?.phone }}</p>
              </div>
            </div>

            <div>
              <p class="font-bold text-2xl mb-4">Whatsapp</p>
              <div class="flex items-start gap-3">
                <Icon name="ri:whatsapp-line" class="w-6 h-6" />
                <p>{{ settings?.profile?.whatsapp }}</p>
              </div>
            </div>

            <div>
              <p class="font-bold text-2xl mb-4">Support</p>
              <div class="flex items-start gap-3">
                <Icon
                  name="material-symbols:alternate-email-rounded"
                  class="w-6 h-6"
                />
                <p>{{ settings?.profile?.email }}</p>
              </div>
            </div>

            <div>
              <p class="font-bold text-2xl mb-4">Available At</p>
              <div class="flex items-start gap-3">
                <Icon
                  name="material-symbols:alarm-add-outline"
                  class="w-6 h-6"
                />
                <p>10AM – 10PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Form Section -->
        <div class="lg:col-span-8 bg-white p-12 rounded-xl shadow-xl">
          <h2 class="text-4xl font-bold mb-10 text-gray-800">Drop Us a Line</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <textarea
              v-model="formData.message"
              rows="5"
              :disabled="loading"
              placeholder="Your message *"
              class="w-full p-4 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
            ></textarea>
            <span
              class="text-red-500"
              v-if="error?.response?.data?.errors?.message"
            >
              {{ error?.response?.data?.errors?.message[0] }}
            </span>

            <input
              type="text"
              v-model="formData.name"
              :disabled="loading"
              placeholder="Name *"
              class="w-full p-4 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
            />
            <span
              class="text-red-500"
              v-if="error?.response?.data?.errors?.name"
            >
              {{ error?.response?.data?.errors?.name[0] }}
            </span>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  v-model="formData.phone"
                  :disabled="loading"
                  placeholder="Phone *"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
                />
                <span
                  class="text-red-500"
                  v-if="error?.response?.data?.errors?.phone"
                >
                  {{ error?.response?.data?.errors?.phone[0] }}
                </span>
              </div>
              <div>
                <input
                  type="text"
                  v-model="formData.email"
                  :disabled="loading"
                  placeholder="Email *"
                  class="w-full p-4 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
                />
                <span
                  class="text-red-500"
                  v-if="error?.response?.data?.errors?.email"
                >
                  {{ error?.response?.data?.errors?.email[0] }}
                </span>
              </div>
            </div>

            <div class="mt-6">
              <LoadingButton
                :isLoading="loading"
                class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-8 rounded-lg shadow-md hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>

      <div class="my-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5217861203023!2d90.37344277410212!3d23.80003768687123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c751b64b3aed%3A0x3a37005e5a9c5c2e!2sMirpur%20kazipara!5e0!3m2!1sen!2sbd!4v1727183230186!5m2!1sen!2sbd"
          width="100%"
          height="450"
          class="rounded-lg shadow-lg"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "@/components/Layouts/Frontend/AppLayout.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import { inject, ref } from "vue";
import useAxios from "@/composables/useAxios.js";
import { useToast } from "vue-toastification";

const settings = inject("settings");
const toast = useToast();
const { sendRequest, error, loading } = useAxios();
const formData = ref({
  message: null,
  name: null,
  phone: null,
  email: null,
});

const submitForm = async () => {
  const res = await sendRequest({
    url: "/v1/create-message",
    method: "POST",
    data: formData.value,
  });
  formData.value = {};
  toast.success("Your queries is submitted...");
};
</script>

<style scoped></style>
