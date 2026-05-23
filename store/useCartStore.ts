import { CartState } from "@/types/cart.types";
import { create } from "zustand";
import { persist } from 'zustand/middleware';


export const useCartStore = create<CartState>()(
    persist(
        (set) =>({
            cart: null,
            setCart: (cart) => set({cart}),
            clearCart: () => set({cart:null})
        }),
        {
            name:"cart-storage",
            partialize: (state: CartState) =>({cart:state.cart})
        }
    )
)