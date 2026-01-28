// lib
import { Hash } from "lucide-react";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// hooks
import { useChat } from "@/hooks/useChat";

type ChatWelcomeProps = {
    name: string;
}

const ChatWelcome = ({ name }: ChatWelcomeProps) => {
    const type = useChat(s => s.type);

    return (
        <div className="flex items-center gap-3 my-2 text-gray-700">
            {type === CHAT_TYPE.CHANNEL && (
                <div className="size-18 rounded-full bg-gray-300 flex items-center justify-center">
                    <Hash className="size-9 text-gray-600" />
                </div>
            )}
            <div className="flex flex-col">
                <p className="font-medium text-xl">
                    {type === CHAT_TYPE.CHANNEL ? `Welcome to #${name}` : ""}
                </p>
                <p className="text-sm">
                    {type === CHAT_TYPE.CHANNEL ? `Start conversation on #${name} channel` : `Start conversation with ${name}`}
                </p>
            </div>
        </div>
    )
}

export default ChatWelcome;