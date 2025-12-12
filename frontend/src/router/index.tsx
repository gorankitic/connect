// react-router
import { createBrowserRouter } from "react-router-dom";
// pages
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Settings from "@/pages/Settings";
import VerificationSuccess from "@/pages/VerificationSuccess";
import VerificationFailed from "@/pages/VerificationFailed";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Onboarding from "@/pages/Onboarding";
import Server from "@/pages/Server";
// route-wrappers
import ProtectedRoutes from "@/router/ProtectedRoutes";
import PublicRoutes from "@/router/PublicRoutes";
// layouts
import ProtectedLayout from "@/layout/ProtectedLayout";
import PublicLayout from "@/layout/PublicLayout";

const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                    { path: "/", element: <Onboarding /> },
                    { path: "/settings", element: <Settings /> },
                    { path: "/servers/:serverId", element: <Server /> }
                ]
            },
        ]
    },
    {
        element: <PublicRoutes />,
        children: [
            {
                element: <PublicLayout />,
                children: [
                    { path: "/signin", element: <SignIn /> },
                    { path: "/signup", element: <SignUp /> },
                    { path: "/verification-success", element: <VerificationSuccess /> },
                    { path: "/verification-failed", element: <VerificationFailed /> },
                    { path: "/forgot-password", element: <ForgotPassword /> },
                    { path: "/reset-password", element: <ResetPassword /> },
                ]
            }
        ]
    }
]);

export default router;