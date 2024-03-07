"use client";

// hooks
import { useModal } from "@/hooks/useModalStore";
// types
import { ServerWithMembersWithProfiles } from "@/lib/types";
import { MemberRole } from "@prisma/client";
// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// assets
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";

type ServerHeaderProps = {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-neutral-900 dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem onClick={() => onOpen("invite", { server })} className="text-purple-600 dark:text-purple-400 px-3 py-2 text-sm cursor-pointer">
                        Invite people
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("editServer", { server })} className="px-3 py-2 text-sm cursor-pointer">
                        Server settings
                        <Settings className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("members", { server })} className="px-3 py-2 text-sm cursor-pointer">
                        Manage members
                        <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem onClick={() => onOpen("createChannel")} className="px-3 py-2 text-sm cursor-pointer">
                        Create a channel
                        <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("deleteServer", { server })} className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Delete server
                        <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem onClick={() => onOpen("leaveServer", { server })} className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Leave server
                        <LogOut className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader;