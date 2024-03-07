"use client";

// hooks
import { useEffect, useState } from "react";
// components
import CreateServerModal from "@/components/modals/CreateServerModal";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {setIsMounted(true)}, [])

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
        </>
    )
}