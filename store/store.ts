import { create } from "zustand";

export const useStore = create<{
    isDarkMode: boolean;
    isSideBarOpen: boolean;
    toggleDarkMode: () => void;
    toggleSideBar: () => void;
    }>

    ((set) => ({
        isDarkMode: false,
        isSideBarOpen: false,

        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
    }));