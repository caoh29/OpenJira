import { create } from "zustand";


export interface Task {
    id?: string;
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
        addTask: async (task) => {
            try {
                const res = await fetch('http://localhost:3000/api/postTask',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await res.json();
                set((state) => ({ tasks: [...state.tasks, data] }));
            } catch (error) {
                console.error(error);
            }
        },
        updateTask: async (task) => {
            try {
                const res = await fetch(`http://localhost:3000/api/getTasks/${task.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }
                set((state) => ({ tasks: state.tasks.map((t) => t.id === task.id ? task : t)}));
            } catch (error) {
                console.error(error);
            }
        },
        // set((state) => ({ tasks: state.tasks.map((t) => t.id === task.id ? task : t)})),
        setIsAddingTask: (isAddingTask) => set(({ isAddingTask })),
        startDraggingTask: () => set(({ isDraggingTask: true })),
        endDraggingTask: () => set(({ isDraggingTask: false })),
    }));