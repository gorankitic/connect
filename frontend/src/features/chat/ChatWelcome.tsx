// lib
import { Hash } from "lucide-react";
// types
import type { ChatType } from "@/lib/types/chat.types";

type ChatWelcomeProps = {
    variant: ChatType;
    name: string
}

const ChatWelcome = ({ name, variant }: ChatWelcomeProps) => {
    return (
        <div className="flex items-center gap-3 my-2 text-gray-700">
            {variant === "channel" && (
                <div className="size-18 rounded-full bg-gray-300 flex items-center justify-center">
                    <Hash className="size-9 text-gray-600" />
                </div>
            )}
            <div className="flex flex-col">
                <p className="font-medium text-xl">
                    {variant === "channel" ? `Welcome to #${name}` : ""}
                </p>
                <p className="text-sm">
                    {variant === "channel" ? `Start conversation on #${name} channel` : `Start conversation with ${name}`}
                </p>
            </div>
        </div>
    )
}

export default ChatWelcome;