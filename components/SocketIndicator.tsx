"use client";

// hooks
import { useSocket } from "@/components/providers/SocketProvider";
// components
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge className="bg-yellow-600 text-white border-none" variant="outline">
                Connecting...
            </Badge>
        )
    }

    return (
        <Badge className="bg-emerald-600 text-white border-none" variant="outline">
            Socket connection
        </Badge>
    )
}
