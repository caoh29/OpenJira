import { useStore } from "@/store/store";
import { useRef } from "react";

export default function StoreInitializer ()  {
    const initialized = useRef(false);

    if (!initialized.current) {
        useStore.setState({});
        initialized.current = true;
    }

    return null;
};