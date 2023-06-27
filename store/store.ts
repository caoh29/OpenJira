import { create } from "zustand";


export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    date: string;
}

export type Status = "pending" | "in-progress" | "finished";

export const useStore = create<{
    isDarkMode: boolean;
    isSideBarOpen: boolean;
    tasks: Task[];
    isAddingTask: boolean;
    isDraggingTask: boolean;
    setIsAddingTask: (arg0: boolean) => void;
    startDraggingTask: () => void;
    endDraggingTask: () => void;
    toggleDarkMode: () => void;
    toggleSideBar: () => void;
    addTask: (task:Task) => void;
    updateTask: (task:Task) => void;
    }>

    ((set) => ({
        isDarkMode: false,
        isSideBarOpen: false,
        isAddingTask: false,
        isDraggingTask: false,
        tasks: [],

        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
        addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
        updateTask: (task) => set((state) => ({ tasks: state.tasks.map((t) => t.id === task.id ? task : t)})),
        setIsAddingTask: (isAddingTask) => set(({ isAddingTask })),
        startDraggingTask: () => set(({ isDraggingTask: true })),
        endDraggingTask: () => set(({ isDraggingTask: false })),
    }));