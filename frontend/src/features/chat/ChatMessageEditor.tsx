// lib
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schema";
// types
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// hooks
import { useChat } from "@/hooks/useChat";
import { useActiveMessage } from "@/hooks/useActiveMessage";
import { useUpdateMessage } from "@/features/chat/useUpdateMessage";

type ChatMessageEditorProps = {
    content: string;
    messageId: string;
}

const ChatMessageEditor = ({ content, messageId }: ChatMessageEditorProps) => {
    const type = useChat((s) => s.type);
    const serverId = useChat((s) => s.serverId);
    const targetId = useChat((s) => s.targetId);
    const { stopUpdating } = useActiveMessage();
    const { updateMessage, isPending } = useUpdateMessage({ type, serverId, targetId, messageId });

    const { register, handleSubmit } = useForm<UpsertMessageSchema>({
        resolver: zodResolver(upsertMessageSchema),
        defaultValues: { content }
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // RHF already registered ref, can't have 2 refs on one element
    // Extract RHF ref and merge it with textareaRef 
    const { ref: rhfRef, ...contentField } = register("content");

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                stopUpdating();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto-expand textarea initially to match message height
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        // Run after DOM updates
        requestAnimationFrame(() => {
            // Focus the textarea
            el.focus();

            // Resize to fit content
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;

            // Move cursor to end
            const length = el.value.length;
            el.setSelectionRange(length, length);
        });
    }, []);


    const onSubmit = ({ content }: UpsertMessageSchema) => {
        if (!content.trim()) return;
        updateMessage({ content });
        stopUpdating();
    }
    // Override textarea default behavior: Enter & also Shift + Enter = New line
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    }
    // Auto-expand textarea on new line of text
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="ml-12 mt-2">
                <div className="relative flex items-end">
                    <Edit className="size-5 absolute left-4 top-5 -translate-y-1/2 text-gray-600 pointer-events-none" />
                    <textarea
                        {...contentField}
                        ref={(el) => {
                            rhfRef(el);
                            textareaRef.current = el;
                        }}
                        rows={1}
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        disabled={isPending}
                        placeholder="Update message"
                        autoComplete="off"
                        className="bg-gray-300 w-full py-2 px-12 rounded-sm shadow-sm text-gray-700 placeholder:text-gray-600 
                        focus:outline-none disabled:opacity-60 resize-none max-h-60 overflow-y-auto"
                    />
                </div>
                <span className="text-xs flex justify-end mt-1">Press ESC to cancel &bull; ENTER to save</span>
            </div>
        </form >
    )
}

export default ChatMessageEditor;