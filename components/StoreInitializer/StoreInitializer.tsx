import { Task, useStore } from "@/store/store";
import { useRef } from "react";

export default function StoreInitializer () {
    const initialized = useRef(false);

    if (!initialized.current) {
        useStore.setState({
            isDarkMode: false,
            isSideBarOpen: false,
            isAddingTask: false,
            isDraggingTask: false,
            tasks: []
        })
        initialized.current = true;
    }

    return null;
};