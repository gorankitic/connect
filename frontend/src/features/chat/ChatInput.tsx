// lib
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
// components
import EmojiPicker from "@/components/EmojiPicker";
// schemas
import { upsertMessageSchema } from "@/lib/schemas/message.schema";
// types
import type { UpsertMessageSchema } from "@/lib/schemas/message.schema";
// constants
import { CHAT_TYPE } from "@/lib/constants/chat.contants";
// hooks
import { useChat } from "@/hooks/useChat";
import { useCreateMessage } from "@/features/chat/useCreateMessage";

type ChatInputProps = {
    name: string
}

const ChatInput = ({ name }: ChatInputProps) => {
    const type = useChat((s) => s.type);
    const targetId = useChat((s) => s.targetId);
    const serverId = useChat((s) => s.serverId);

    const { createMessage, isPending } = useCreateMessage({ type, serverId, targetId });

    const { register, handleSubmit, reset, watch, setValue } = useForm<UpsertMessageSchema>({
        resolver: zodResolver(upsertMessageSchema),
        defaultValues: { content: "" }
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // RHF already registered ref, can't have 2 refs on one element
    // Extract RHF ref and merge it with textareaRef 
    const { ref: rhfRef, ...contentField } = register("content");

    const onSubmit = ({ content }: UpsertMessageSchema) => {
        // disabled prop on textarea element blocks auto-focus, disable it on submitting
        if (isPending || !content.trim()) return;
        createMessage({ content });
        // Reset text area input
        reset({ content: "" });
        // Reset textarea height and autofocus after sending message
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.focus();
        }
    }
    // Override textarea default behavior: Enter & also Shift + Enter = New line
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    }
    // Auto-expand textarea
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
    }

    const addEmoji = (emoji: string) => {
        const current = watch("content");
        setValue("content", current + emoji, { shouldDirty: true });
        textareaRef.current?.focus();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-40 mb-10">
                <div className="relative flex items-end">
                    <Send className="size-6 absolute left-4 top-7 -translate-y-1/2 text-gray-600 pointer-events-none" />
                    <textarea
                        {...contentField}
                        ref={(el) => {
                            rhfRef(el);
                            textareaRef.current = el;
                        }}
                        rows={1}
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        placeholder={`Send message to ${type === CHAT_TYPE.CHANNEL ? "#" + name : name}`}
                        autoComplete="off"
                        className="bg-gray-300 w-full py-4 px-14 rounded-sm shadow-sm text-gray-700 placeholder:text-gray-600 
                        focus:outline-none disabled:opacity-60 resize-none max-h-60 overflow-y-auto"
                    />
                    <EmojiPicker onChange={addEmoji} />
                </div>
            </div>
        </form >
    )
}

export default ChatInput;