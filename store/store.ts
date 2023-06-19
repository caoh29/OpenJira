import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";


export interface Task {
    id: uuidv4;
    title: string;
    description: string;
    status: Status;
    date: number;
}

export type Status = "pending" | "in-progress" | "finished";

export const useStore = create<{
    isDarkMode: boolean;
    isSideBarOpen: boolean;
    tasks: Task[];
    toggleDarkMode: () => void;
    toggleSideBar: () => void;
    addTask: (task) => void;
    }>

    ((set) => ({
        isDarkMode: false,
        isSideBarOpen: false,
        tasks: [
            {
                id: uuidv4(),
                title: "Task 1",
                description: "Task 1 description",
                status: "pending",
                date: Date.now()
            },
            {
                id: uuidv4(),
                title: "Task 2",
                description: "Task 2 description",
                status: "in-progress",
                date: Date.now()
            },
            {
                id: uuidv4(),
                title: "Task 2",
                description: "Task 3 description",
                status: "finished",
                date: Date.now()
            },
        ],

        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
        addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    }));