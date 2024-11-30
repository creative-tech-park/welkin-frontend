import { defineStore } from 'pinia';
import useAxios from '@/composables/useAxios';

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    testimonials: [],
    services: [],
    currentTestimonialIndex: 0,
  }),
  getters: {
    currentTestimonial: (state) => state.testimonials[state.currentTestimonialIndex],
  },
  actions: {
    async fetchTestimonials() {
      const { sendRequest } = useAxios();
      try {
        const response = await sendRequest({
          url: '/v1/testimonials',
          method: 'GET',
        });
        this.testimonials = response.data;
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    },
    nextTestimonial() {
      this.currentTestimonialIndex =
        (this.currentTestimonialIndex + 1) % this.testimonials.length;
    },
    prevTestimonial() {
      this.currentTestimonialIndex =
        (this.currentTestimonialIndex - 1 + this.testimonials.length) %
        this.testimonials.length;
    },
    setCurrentTestimonial(index) {
      this.currentTestimonialIndex = index;
    },
  },
});
