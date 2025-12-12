// react-router
import { Outlet } from "react-router-dom";
// components
import NavigationSidebar from "@/components/NavigationSidebar";
import ModalProvider from "@/providers/ModalProvider";

const ProtectedLayout = () => {
    return (
        <div className="h-screen w-screen flex overflow-hidden">
            <NavigationSidebar />
            <main className="flex-1 overflow-y-auto ml-20">
                <Outlet />
            </main>
            <ModalProvider />
        </div>
    )
}

export default ProtectedLayout;