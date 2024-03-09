"use client";

import axios from "axios";
import qs from "query-string";
// next
import Image from "next/image";
// hooks
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModalStore";
// components
import UserAvatar from "@/components/UserAvatar";
import { ActionTooltip } from "@/components/ActionTooltip";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// utils
import { cn } from "@/lib/utils";
// prisma types
import { Member, MemberRole, Profile } from "@prisma/client";
// zod validation and schema
import { editMessageSchema, EditMessageSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
// assets
import { Edit, FileIcon, ShieldCheck, ShieldX, Trash } from "lucide-react";

type ChatItemProps = {
    id: string,
    content: string,
    member: Member & {
        profile: Profile,
    },
    timestamp: string,
    fileUrl: string | null,
    deleted: boolean,
    currentMember: Member,
    isUpdated: boolean,
    socketUrl: string,
    socketQuery: Record<string, string>
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-1 text-sky-500" />,
    "ADMIN": <ShieldX className="h-4 w-4 ml-1 text-rose-500" />
}

const ChatItem = ({ content, currentMember, deleted, fileUrl, id, isUpdated, member, socketQuery, socketUrl, timestamp }: ChatItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { onOpen } = useModal();

    const form = useForm<EditMessageSchema>({
        resolver: zodResolver(editMessageSchema),
        defaultValues: { content: content }
    });
    const isLoading = form.formState.isSubmitting;

    const fileType = fileUrl?.split(".").pop();
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    const onSubmit = async (values: EditMessageSchema) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });
            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onMemberClick = () => {
        if (member.id === currentMember.id) return;
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    }

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
            }
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


    useEffect(() => {
        form.reset({ content: content });
    }, [content]);

    return (
        <div className="relative group flex items-center hover:bg-black/5 py-2 px-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-neutral-500 dark:text-neutral-300">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
                            <Image src={fileUrl} alt={content} fill className="object-cover" />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-sky-200 stroke-sky-400" />
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-sky-500 dark:text-sky-400 hover:underline">
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                "text-sm text-neutral-600 dark:text-neutral-300",
                                deleted && "italic text-neutral-500 dark:text-neutral-400 text-xs mt-1"
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text">(edited)</span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center w-full gap-x-2 pt-2">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        {...field}
                                                        disabled={isLoading}
                                                        autoComplete="off"
                                                        className="p-2 bg-neutral-200/90 dark:bg-neutral-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200"
                                                        placeholder="Edit message"
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button size="sm" variant="primary" disabled={isLoading}>Save</Button>
                            </form>
                            <span className="text-[10px] mt-1 text-neutral-400">Press escape to cancel, enter to save</span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-neutral-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer ml-auto h-4 w-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Edit">
                        <Trash
                            onClick={() => onOpen("deleteMessage", { apiUrl: `${socketUrl}/${id}`, query: socketQuery })}
                            className="cursor-pointer ml-auto h-4 w-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition" />
                    </ActionTooltip>
                </div>
            )}
        </div>
    )
}

export default ChatItem;