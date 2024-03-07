// hooks
import { useEffect, useState } from "react";

// read browser URL
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {setMounted(true)}, []);

    if(!mounted) {
        return "";
    }

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    return origin;
}