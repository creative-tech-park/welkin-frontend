import {defineStore} from 'pinia'
import {computed, ref} from "vue"
import useAxios from "@/composables/useAxios";
import {useRouter} from 'vue-router';
import {useToast} from "vue-toastification";

const {loading,error,sendRequest,} = useAxios();
const toast = useToast();
export const useAuthStore = defineStore('auth', ()=>{

    const router = useRouter();
    const user = ref(JSON.parse(localStorage.getItem("user")) ?? null)
    const isLoggedIn = computed(() => !! user.value)

    async function fetchUser(){
        const user = JSON.parse(await getLocalStoreage());
        if(user){
            const data = await sendRequest({
                method: 'get',
                url: "/api/user",
                headers:{
                    "Authorization": `Bearer ${user?.token}`
                }
            })
            if(data?.data){
                user.value = data?.data
            }else{
                await clearLocalStoreage();
            }
        }else{
            await clearLocalStoreage();
        }


    }

    async function login(credential){
        await sendRequest({
            method: 'get',
            url: "/sanctum/csrf-cookie",
        })

        const login = await sendRequest({
            method:"POST",
            url:"/v1/customer/login",
            data:credential
        })

        if(login.data?.message) toast.success(login.data?.message)

        await setLocalStoreage(login.data?.data)
        user.value = login.data?.data
        return login;
    }

    async function signup(signupData){
        const signin = await sendRequest({
            method: "POST",
            url: "/v1/customer/register",
            data: signupData
        });


        if(login.data?.message) toast.success(signin.data?.message)

        await setLocalStoreage(signin.data?.data)
        user.value = signin.data?.data
    }

    async function logout(){
        const res = await sendRequest({
            url:"/api/logout",
            method:"GET"
        })
        if(res.data?.message) toast.success(res.data?.message)
        user.value = null;
        await clearLocalStoreage();
        await router.push({name: "Home"})
    }

    async function setLocalStoreage(user){
        localStorage.setItem('user', JSON.stringify(user));
    }

    async function clearLocalStoreage(){
        user.value = null
        localStorage.removeItem('user');
    }

    async function getLocalStoreage(){
        return localStorage.getItem('user');
    }

    function getToken(){
        return JSON.parse(localStorage.getItem("user"))?.token;
    }

    return {user, login, signup, isLoggedIn, fetchUser, logout, loading, error, getLocalStoreage, clearLocalStoreage, getToken}

})
