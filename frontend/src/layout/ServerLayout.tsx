// lib
import { Outlet } from "react-router-dom";
// Components
import ServerSidebar from "@/features/server/ServerSidebar";

const ServerLayout = () => {
    return (
        <div className="flex h-full">
            <ServerSidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default ServerLayout;