import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: []
    }),

    actions: {
        addToCart(product) {
            const index = this.cart.findIndex((item) => item.id === product.id);
            if (index > -1) {
                // Update existing product in the cart
                this.cart[index] = { ...this.cart[index], ...product };
            } else {
                // Add new product with default buyQty if not provided
                this.cart.push({ ...product, buyQty: product.buyQty || 1 });
            }
            this.setInLocalStorage();
        },
        removeFromCart(item) {
            const index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index, 1);
                this.setInLocalStorage();
            }
            toast.success("Removed From Cart...");
        },
        incrementQty(id) {
            const index = this.cart.findIndex((item) => item.id === id);
            if (index > -1) {
                this.cart[index].buyQty++;
                this.setInLocalStorage();
                toast.success("Quantity increased.");
            } else {
                toast.error("Product not found in cart.");
            }
        },
        decrementQty(id) {
            const index = this.cart.findIndex((item) => item.id === id);
            if (index > -1) {
                if (this.cart[index].buyQty > 1) {
                    this.cart[index].buyQty--;
                    this.setInLocalStorage();
                    toast.success("Quantity decreased.");
                } else {
                    toast.warning("Quantity cannot be less than 1.");
                }
            } else {
                toast.error("Product not found in cart.");
            }
        },
        setInLocalStorage() {
            localStorage.setItem(
                import.meta.env.VITE_APP_PREFIX + "cart",
                JSON.stringify(this.cart)
            );
        },
        initCart() {
            const storedCart = localStorage.getItem(
                import.meta.env.VITE_APP_PREFIX + "cart"
            );
            if (storedCart) {
                this.cart = JSON.parse(storedCart);
            }
        },
        clearCart() {
            this.cart = [];
            localStorage.removeItem(import.meta.env.VITE_APP_PREFIX + "cart");
            this.initCart();
        }
    },

    getters: {
        getCartLength() {
            return this.cart.length;
        },
        getCartItems() {
            return this.cart;
        },
        getCartTotalPrice() {
            return this.cart.reduce((total, item) => total + item.price * item.buyQty, 0);
        }
    }
});