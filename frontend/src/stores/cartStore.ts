import { create } from "zustand";
import { MenuStore } from '../types/interfaces'
import { ItemType } from "../types/interfaces";

const useMenuStore = create<MenuStore>((set, get) => ({
    cart: [],
    setCart: (newCart) => {
        const validCart = newCart.filter((item) => item.qty > 0);
        set({ cart: validCart });
    },
    addToCart: (item: ItemType) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(cartItem => cartItem.sk === item.sk);
        if (existingItemIndex > -1) {
            // Om varan redan finns i cart, öka dess kvantitet
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex].qty = Math.max(0, updatedCart[existingItemIndex].qty + 1); // Förhindra negativa värden
            set({ cart: updatedCart });
        } else {
            // Lägg till ny vara med kvantitet 1
            const updatedCart = [...currentCart, { ...item, qty: 1 }];
            set({ cart: updatedCart });
            console.log('Cart after adding item:', updatedCart);
        }
    },
    removeFromCart: (sk: string) => {
        const currentCart = get().cart;
        const updatedCart = currentCart.filter(item => item.sk !== sk);
        set({ cart: updatedCart });
    },
    clearCart: () => set({ cart: [] }),
    totalQuantity: () => get().cart.reduce((total, item) => total + item.qty, 0),
    totalPrice: () => get().cart.reduce((total, item) => total + item.price * item.qty, 0),
    order: null,
    setOrder: (name: string, phone: string, email: string, paymentMethod: string) => {
        const cart = get().cart;
        if (cart.length > 0) {
            set({
                order: {
                    items: cart.map(item => ({ ...item })),
                    customerDetails: { name, phone, email, paymentMethod },
                    isApproved: false
                }
            });
        }
    },
    approveOrder: () => {
        const currentOrder = get().order;
        if (currentOrder) {
            set({
                order: {
                    ...currentOrder,
                    isApproved: true
                }
            });
        }
    },
    paymentMethod: "",
    setPaymentMethod: (method: string) => set({ paymentMethod: method }),
    kitchenOrders: [],
    addKitchenOrder: (order) =>
        set((state) => ({ kitchenOrders: [...state.kitchenOrders, order] })),
}));

export default useMenuStore;

// Författare Lisa
// setup Store. Cart, Quantity, Price, Order, kitchenOrders och ApproveOrder