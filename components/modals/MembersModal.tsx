"use client";

import axios from "axios";
import qs from "query-string";
// hooks
import { useState } from "react";
import { useModal } from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";
// components
import UserAvatar from "@/components/UserAvatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
// types
import { ServerWithMembersWithProfiles } from "@/lib/types";
// assets
import { ShieldX, ShieldCheck, MoreVertical, ShieldQuestion, Shield, Check, Gavel, Loader2 } from "lucide-react";
// prisma
import { MemberRole } from "@prisma/client";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-1 text-sky-500" />,
    "ADMIN": <ShieldX className="h-4 w-4 ml-1 text-rose-500" />
}

const MembersModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const [loadingId, setLoadingId] = useState("");
    const router = useRouter();

    const { server } = data as { server: ServerWithMembersWithProfiles }; 
    const isModalOpen = isOpen && type === "members";

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            });
            const response = await axios.patch(url, { role });
            
            router.refresh();
            onOpen("members", { server: response.data });

        } catch (error) {
            console.log(error);
        } finally{
            setLoadingId("");
        }
    }

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            })
            const response = await axios.delete(url);

            router.refresh();
            onOpen("members", { server: response.data });

        } catch (error) {
            console.log(error);
        } finally{
            setLoadingId("");
        }
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-neutral-900 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Manage members
                    </DialogTitle>
                    <DialogDescription className="text-center text-neutral-600">
                        {server?.members?.length} members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] p-6">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-neutral-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-neutral-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="h-4 w-4 mr-2" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="h-4 w-4 mr-2" />
                                                            Guest
                                                            {member.role === "GUEST" && <Check className="h-4 w-4 ml-auto" />}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="h-4 w-4 mr-2" />
                                                            Moderator
                                                            {member.role === "MODERATOR" && <Check className="h-4 w-4 ml-auto" />}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onKick(member.id)}>
                                                <Gavel className="h-4 w-4 mr-2" />
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-neutral-500 ml-auto h-4 w-4" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default MembersModal;