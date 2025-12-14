// lib
import type { ComponentType, InputHTMLAttributes } from "react";
// utils
import { cn } from "@/lib/utils";

type IconType = ComponentType<{ className?: string }>;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    type?: string,
    placeholder: string,
    disabled?: boolean,
    className?: string
    icon?: IconType,
    error?: string,
    value?: string,
}

const Input = ({ type, placeholder, value, disabled, error, className, icon: Icon, ...props }: InputProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative">
                {Icon && <Icon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />}
                <input
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    value={value}
                    disabled={disabled}
                    className={cn("w-full pl-10 py-1 rounded-md bg-white text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-blue-500", className)}
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input;