import { defineStore } from 'pinia';
import useAxios from '@/composables/useAxios';
import { useToast } from 'vue-toastification';

const {loading, sendRequest} = useAxios();
const toast = useToast();
import { useAuthStore } from '@/stores/useAuthStore';


export const useCustomCakeStore = defineStore('customCake', {
  state: () => ({
    isModalOpen: false,
    isViewTSModalOpen: false,
    customCakeId: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    flavorId: 1,
    weight: '',
    message: '',
    deliveryLocation: 'inside',
    deliveryDate: '',
    userImage: null,
    customCakeImages:[],
    orderSuccess:false

  }),
  actions: {
    openVTSModal(){
      this.isViewTSModalOpen = true;
    },
    closeVTSModal(){
      this.isViewTSModalOpen = false;
    },
    closeOrderSuccess(){
      this.orderSuccess = false;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.fullName = '';
      this.customCakeId = '';
      this.phoneNumber = '';
      this.address = '';
      this.flavorId = null;
      this.weight = '';
      this.message = '';
      this.deliveryLocation = 'inside';
      this.deliveryDate = '';
      this.userImage = null;
      this.customCakeImages = [];
    },
    async submitForm() {
      // Create the order object with the necessary state data
      const orderData = new FormData();
      orderData.append('custom_cake_id', this.customCakeId);
      orderData.append('full_name', this.fullName);
      orderData.append('phone_number', this.phoneNumber);
      orderData.append('address', this.address);
      orderData.append('custom_cake_flavor_id', this.flavorId);
      orderData.append('weight', this.weight);
      orderData.append('message_on_cake', this.message);
      orderData.append('delivery_location', this.deliveryLocation);
      orderData.append('delivery_date', this.deliveryDate);
      orderData.append("photo_on_cake", this.userImage);

      this.customCakeImages.forEach((image, index)=>{
        orderData.append(`custom_cake_images[${index}]`, image);
      })

        // Get user from useAuthStore
        const authStore = useAuthStore();
        const user = authStore.user;
  
        // Alert user ID if user is available
        if (user) {
          orderData.append("user_id", user.id);
        }

      try {
        const response = await sendRequest({
          url: "/v1/save-custom-cake-order",
          method: "POST",
          data: orderData,
        });
    
        if (response.data.success) {
          toast.success('Your Order has been Placed..!');
        } else {
          alert("Something Went Wrong");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Something Went Wrong");
      }
    
      this.closeModal();
      this.orderSuccess = true;

    },
    
  },
});
