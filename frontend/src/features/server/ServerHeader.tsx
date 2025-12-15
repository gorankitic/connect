// lib
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
// types
import type { MemberRole, ServerWithChannels } from "@/lib/api/apiTypes";
// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// hooks
import { useModal } from "@/hooks/useModal";

type ServerHeaderProps = {
    server: ServerWithChannels,
    role: MemberRole
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === "ADMIN";
    const isModerator = isAdmin || role === "MODERATOR";

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="group w-full flex items-center px-5 py-1 border border-b-gray-300 bg-gray-200 hover:bg-gray-300/80 transition-all text-gray-600 font-semibold cursor-pointer">
                    {server.name}
                    <ChevronDown className="text-gray-600 size-5 ml-auto group-hover:translate-y-1 transition-all duration-300 ease-in-out" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3 text-gray-600" align="end">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="text-blue-600 focus:text-blue-600 px-3 py-1.5 group cursor-pointer"
                    >
                        Invite people
                        <UserPlus className="text-blue-500 size-4 ml-auto group-hover:scale-110 transition-all duration-300 ease-in-out" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("updateServer", { server })}
                        className="px-3 py-1.5 focus:text-gray-600 group cursor-pointer"
                    >
                        Server settings
                        <Settings className="size-4 ml-auto group-hover:rotate-180 transition-all duration-500 ease-in-out" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("manageMembers", { server })}
                        className="px-3 py-1.5 focus:text-gray-600 group cursor-pointer"
                    >
                        Manage members
                        <Users className="size-4 ml-auto group-hover:-translate-x-1 transition-all duration-500 ease-in-out" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem className="px-3 py-1.5 focus:text-gray-600 group cursor-pointer">
                        Create a channel
                        <PlusCircle className="size-4 ml-auto group-hover:rotate-180 transition-all duration-500 ease-in-out" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem className="text-rose-500 focus:text-rose-500 px-3 py-1.5 group cursor-pointer">
                        Delete server
                        <Trash className="text-rose-400 size-4 ml-auto group-hover:scale-110 transition-all duration-300 ease-in-out" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem className="text-rose-500 focus:text-rose-500 px-3 py-1.5 group cursor-pointer">
                        Leave server
                        <LogOut className="text-rose-400 size-4 ml-auto group-hover:-translate-x-1 transition-all duration-500 ease-in-out" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader;