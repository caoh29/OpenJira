import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";


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
    toggleDarkMode: () => void;
    toggleSideBar: () => void;
    addTask: (task:Task) => void;
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
                date: "some date 1"
            },
            {
                id: uuidv4(),
                title: "Task 2",
                description: "Task 2 description",
                status: "in-progress",
                date: "some date 2"
            },
            {
                id: uuidv4(),
                title: "Task 3",
                description: "Task 3 description",
                status: "finished",
                date: "some date 3"
            },
        ],

        toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
        addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    }));