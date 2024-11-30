import {createRouter, createWebHistory} from 'vue-router'
import auth from "@/middleware/auth.ts"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/frontend/Index.vue')
        },
        {
            path: '/all-products',
            name: 'AllProducts',
            component: () => import('@/pages/frontend/AllProducts/Index.vue')
        },
        {
            path: '/contact',
            name: 'Contact',
            component: () => import('@/pages/frontend/Contact.vue')
        },
        {
            path: '/single-product/:id',
            name: 'SingleProducts',
            component: () => import('@/pages/frontend/SingleProduct.vue')
        },
        
        {
            path: '/single-page/:id',
            name: 'SinglePage',
            component: () => import('@/pages/frontend/SinglePage.vue')
        },
        {
            path: '/add-cart',
            name: 'AddToCart',
            component: () => import('@/pages/frontend/AddToCart.vue')
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: () => import('@/pages/frontend/Checkout.vue')
        },
        {
            path: '/payment',
            name: 'Payment',
            component: () => import('@/pages/frontend/Payment.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Admin/Auth/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/pages/Admin/Auth/Register.vue')
        },

        //  ====== Customer Dashboard  =====

        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('@/pages/Admin/Index.vue')
        },
        {
            path: '/dashboard/address',
            name: 'Addresses',
            component: () => import('@/pages/Admin/Address/Index.vue')
        },
        {
            path: '/dashboard/add-address',
            name: 'AddAddresses',
            component: () => import('@/pages/Admin/Address/Add.vue')
        },
        {
            path: '/dashboard/edit-address/:id',
            name: 'EditAddresses',
            component: () => import('@/pages/Admin/Address/Add.vue')
        },
        {
            path: '/dashboard/order',
            name: 'Order',
            component: () => import('@/pages/Admin/Order/Index.vue')
        },
        {
            path: '/dashboard/custom-cake-orders',
            name: 'CustomCakeOrders',
            component: () => import('@/pages/Admin/Order/CustomCake.vue')
        },
        {
            path: '/dashboard/order/:id',
            name: 'SingleOrder',
            component: () => import('@/pages/Admin/Order/Show.vue')
        },
        {
            path: '/custom-cake',
            name: 'CustomCake',
            component: () => import('@/pages/frontend/CustomCake/Index.vue')
        },
        {
            path: '/user-custom-cake/:id',
            name: 'UserCustomCake',
            component: () => import('@/pages/frontend/CustomCake/UserCustomCake.vue')
        },
        {
            path: '/single-custom-cake/:id',
            name: 'SingleCustomCake',
            component: () => import('@/pages/frontend/CustomCake/Single.vue')
        },
        {
            path: '/guest-payment',
            name: 'GuestPayment',
            component: () => import('@/pages/frontend/Payment/Guest.vue')
        },
     
       
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {top: 0}; // This will scroll to the top of the page
        }
    },
})

router.beforeEach(auth)
export default router
