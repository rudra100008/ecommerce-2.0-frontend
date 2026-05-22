// useAuthStore.ts

import { AuthState } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware"



export const useAuthStore = create<AuthState>()(
    persist(
        (set) =>({
            user:null,
            setUser: (user) => set({user}),
            clearUser: () => set({user:null})
        }),
        {
            name: "auth-storage",
            partialize: (state: AuthState) => ({user:state.user})
        }
    )
)