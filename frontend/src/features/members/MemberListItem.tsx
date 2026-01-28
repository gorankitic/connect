// lib
import { useParams } from "react-router-dom";
// types
import type { Member } from "@/lib/types/member.types";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// constants
import { MEMBER_ROLE, MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// hooks
import { useGetOrCreateConversation } from "@/features/conversation/useGetOrCreateConversation";

const MemberListItem = ({ member }: { member: Member }) => {
    const { conversationId } = useParams<{ serverId: string, conversationId: string }>();
    const { getOrCreate, conversation } = useGetOrCreateConversation();

    const Icon = MEMBER_ROLE_ICON_MAP[member.role];

    let isActive = false;
    if (conversationId) {
        isActive = conversationId === conversation?.conversationId;
    }

    return (
        <button
            onClick={() => getOrCreate({ serverId: member.serverId, memberId: member._id })}
            className={cn("group flex items-center gap-2 w-full py-2 px-3 rounded-sm hover:bg-gray-300 cursor-pointer", isActive && "bg-gray-300")}
        >
            <Avatar className="size-8 text-gray-700">
                {member.avatarUuid ? (
                    <img
                        src={getAvatarUrl(member.avatarUuid)!}
                        alt={member.name}
                        className="rounded-full object-cover size-8"
                    />
                ) : (
                    <AvatarFallback className="bg-gray-300">
                        {getInitials(member.name)}
                    </AvatarFallback>
                )}
            </Avatar>
            <div>
                <div className="flex items-center gap-2">
                    <p className={cn("font-medium text-gray-500 group-hover:text-gray-600", isActive && "text-gray-600")}>{member.name}</p>
                    {Icon && <Icon className={cn("size-5", member.role === MEMBER_ROLE.ADMIN ? "text-amber-500" : "text-blue-500")} />}
                </div>
            </div>
        </button>
    )
}

export default MemberListItem;