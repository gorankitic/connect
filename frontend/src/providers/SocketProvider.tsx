// lib
import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextValue = {
    socket: Socket | null;
    isConnected: boolean;
}

export const SocketContext = createContext<SocketContextValue>({ socket: null, isConnected: false });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Create socket connection ONCE
        const socketInstance = io(import.meta.env.VITE_API_URL, {
            withCredentials: true,
            transports: ["websocket"],
        });

        // Basic connection logs while in dev
        socketInstance.on("connect", () => {
            setIsConnected(true);
            console.log("Socket connected:", socketInstance.id);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
            console.log("Socket disconnected");
        });

        setSocket(socketInstance);

        // Cleanup on unmount (signout / redirect)
        return () => {
            socketInstance.disconnect();
            setSocket(null);
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
