"use client";

import axios from "axios";
import qs from "query-string";
// hooks
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/useModalStore";
// zod and types
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatInputSchema, chatInputSchema } from "@/types";
// components
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import EmojiPicker from "@/components/EmojiPicker";
// assets
import { Plus } from "lucide-react";

type ChatInputProps = {
    apiUrl: string,
    query: Record<string, any>,
    name: string,
    type: "conversation" | "channel"
}

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
    const router = useRouter();
    const { onOpen } = useModal();
    const form = useForm<ChatInputSchema>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            content: ""
        }
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (value: ChatInputSchema) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });
            await axios.post(url, value);
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-neutral-500 dark:bg-neutral-400 hover:bg-neutral-600 dark:hover:bg-neutral-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input
                                        {...field}
                                        placeholder={`Send message to ${type === "conversation" ? name : "#" + name}`}
                                        autoComplete="off"
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-neutral-200/90 dark:bg-neutral-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-700 dark:text-neutral-200"
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default ChatInput;