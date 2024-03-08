"use client";

// react
import { createContext, useContext, useEffect, useState } from "react";
// socket.io
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false });

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useContext must be used inside an ContextProvider');
    }
    return context;
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            cors: { origin: "*", methods: ["GET", "POST"] }
        });
        socketInstance.on("connect", () => {
            setIsConnected(true);
        });
        socketInstance.on("disconnected", () => {
            setIsConnected(false);
        });
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}