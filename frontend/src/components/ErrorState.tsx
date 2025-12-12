// lib
import { CircleAlert, Home } from "lucide-react";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
// components
import Button from "@/components/Button";

const ErrorState = ({ error }: { error: NormalizedError }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-5">
            <CircleAlert className="size-10 text-gray-800" />
            <p className="text-gray-800 font-medium text-xl">Something went wrong. We hit a brick wall.</p>
            <p className="text-gray-600">{error.message}</p>

            <Button
                onClick={() => window.location.replace("/")}
                className="bg-linear-to-r from-blue-400 to-blue-600 text-white w-40"
                icon={Home}
            >
                Go home
            </Button>
        </div>
    );
}

export default ErrorState;