import { create } from "zustand";
import { MenuStore } from '../types/interfaces'

const useMenuStore = create<MenuStore>((set, get) => ({
    menu: {
        iceCream: []
    },
    setMenu: (newMenu) => {
        set({ menu: newMenu })
    },
    cart: [],
    setCart: (newCart) => set({ cart: newCart }),
    totalQuantity: () => get().cart.reduce((total, item) => total + item.qty, 0),
    order: null,
    setOrder: () => {
        const cart = get().cart;
        if (cart.length > 0) {
            set({
                order: {
                    items: cart.map(item => ({ ...item })),
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
    }
}));

export default useMenuStore;

// Författare Lisa: setup Store. Menu, Cart, Quantity, Order och ApproveOrder