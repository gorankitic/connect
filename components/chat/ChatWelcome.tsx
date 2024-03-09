import { Hash } from "lucide-react";

type ChatWelcomeProps = {
    name: string,
    type: "channel" | "conversation"
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
    return (
        <div className="space-y-2 px-4 mb-4">
            {type === "channel" && (
                <div className="h-[60px] w-[60px] rounded-full bg-neutral-500 dark:bg-neutral-700 flex items-center justify-center">
                    <Hash className="h-10 w-10 text-white" />
                </div>
            )}
            <p className="text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                {type === "channel" ? "Welcome to #" : ""}{name}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {type === "channel" ? `Start conversation on #${name} channel.` : `Start conversation with ${name}.`}
            </p>
        </div>
    )
}

export default ChatWelcome;