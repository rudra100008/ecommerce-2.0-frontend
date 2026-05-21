// useAuthStore.ts

import { UserResponse } from "@/types/user.types";
import { create } from "zustand";
import { persist } from "zustand/middleware"

interface AuthState{
    user: UserResponse | null;
    isAuthenticated: boolean;
    setUser: (user: UserResponse) => void;
    clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) =>({
            user:null,
            isAuthenticated:false,
            setUser: (user) => set({user,isAuthenticated:true}),
            clearUser: () => set({user:null,isAuthenticated:false})
        }),
        {
            name: "auth-storage",
            partialize: (state: AuthState) => ({user:state.user,isAuthenticated: state.isAuthenticated})
        }
    )
)