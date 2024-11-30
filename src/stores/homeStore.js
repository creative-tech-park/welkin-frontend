import { defineStore } from 'pinia';
import useAxios from '@/composables/useAxios';

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    testimonials: [],
    services: [],
    sliders: [],
    featuredCategoryProducts:[],
    currentTestimonialIndex: 0,
    currentCat: null,
  }),
  getters: {
    currentTestimonial: (state) => state.testimonials[state.currentTestimonialIndex],
  },
  actions: {
    async fetchData() {
      const { sendRequest } = useAxios();
      try {
        const response = await sendRequest({
          url: '/v1/homedata',
          method: 'GET',
        });
        this.testimonials = response.data.testimonials;
        this.services = response.data.services;
        this.sliders = response.data.sliders;
        this.featuredCategoryProducts = response.data.featuredCategoryProducts;
        this.currentCat = "cat-item-" + response.data.featuredCategoryProducts[0]?.id;
      } catch (error) {
        console.error('Error fetching data:', error);
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
