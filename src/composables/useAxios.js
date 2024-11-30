import {ref} from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    "baseURL" : import.meta.env.VITE_APP_URL,
    "withCredentials" : true,
    "xsrfHeaderName" : "X-XSRF-TOKEN",
    "Accept" : "application/json",
    "Content-Type" : "multipart/form-data"
});


export default function useAxios() {
    const loading = ref(false);
    const error = ref(null);

    const getAuthStore = async () => {
        const {useAuthStore} = await import('@/stores/useAuthStore.js');
        return useAuthStore();
    }
    // must be pass an vue ref for custom loading
    const sendRequest = async (config, globalLoading = loading) => {
        globalLoading.value = true;
        try {
            const authStore = await getAuthStore();
            return await axiosInstance({
                ...config,
                headers: {
                    Authorization: `Bearer ${authStore?.user?.token}`
                }
            });
        } catch (err) {
            error.value = err;
            throw err;
        } finally {
            globalLoading.value = false;
        }
    };

    return {
        loading,
        error,
        sendRequest,
    };
}
