// lib
import { Ban, Check, EllipsisVertical, ShieldCheck, ShieldQuestionMark, UserRound } from "lucide-react";
// types
import type { Member } from "@/lib/types/member.types";
// components
import MemberAvatar from "@/features/members/MemberAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// hooks
import { useUpdateMemberRole } from "@/features/members/useUpdateMemberRole";
import { useRemoveMember } from "@/features/members/useRemoveMember";

type MemberItemProps = {
    member: Member;
}

const MemberItem = ({ member }: MemberItemProps) => {
    const { updateRole, isPending: isUpdating } = useUpdateMemberRole();
    const { removeMember, isPending: isRemoving } = useRemoveMember();

    const isLoading = isUpdating || isRemoving;

    return (
        <div className="flex items-center justify-between mx-20 mb-5">
            <MemberAvatar member={member} />
            {member.role !== "ADMIN" && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 cursor-pointer hover:bg-gray-100 rounded-sm">
                        <EllipsisVertical className="size-5 text-gray-600" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="p-2 text-gray-700">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-1 cursor-pointer">
                                <ShieldQuestionMark className="size-4 text-gray-600" />
                                <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="w-36 p-2 text-gray-700">
                                    <DropdownMenuItem
                                        disabled={isLoading}
                                        onClick={() => updateRole({ serverId: member.serverId, memberId: member._id, role: "GUEST" })}
                                        className="flex items-center gap-1 cursor-pointer"
                                    >
                                        <UserRound className="size-4 text-gray-600" />
                                        <span>Guest</span>
                                        {member.role === "GUEST" && <Check className="size-4 text-blue-600 ml-auto" />}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        disabled={isLoading}
                                        onClick={() => updateRole({ serverId: member.serverId, memberId: member._id, role: "MODERATOR" })}
                                        className="flex items-center gap-1 cursor-pointer">
                                        <ShieldCheck className="size-4 text-gray-600" />
                                        <span>Moderator</span>
                                        {member.role === "MODERATOR" && <Check className="size-4 text-blue-600 ml-auto" />}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                            disabled={isLoading}
                            onClick={() => removeMember({ serverId: member.serverId, memberId: member._id })}
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            <Ban className="size-4 text-gray-600" />
                            <span>Kick</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default MemberItem;