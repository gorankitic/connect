// lib
import { Navigate, Outlet } from "react-router-dom";
// components
import Loader from "@/components/Loader";
// hooks
import { useAuth } from "@/features/authentication/useAuth";

const ProtectedRoutes = () => {
    const { user, isPending } = useAuth();

    if (isPending) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Loader className="size-16" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/signin" replace />
    }

    return <Outlet />
}

export default ProtectedRoutes;