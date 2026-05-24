import { create } from "zustand";
import { persist } from "zustand/middleware";



interface UIState{
    sidebarCollapsed:boolean;
    toggleSideBar: () => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set)=>({
            sidebarCollapsed:false,
            toggleSideBar: () => set((state)=> ({ sidebarCollapsed: !state.sidebarCollapsed }))
        }),
        {name:"ui-preferences"}
    )

)