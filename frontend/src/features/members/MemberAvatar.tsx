// lib
import { format } from "date-fns";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// types
import type { Member } from "@/lib/types/member.types";
// constants
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";

type MemberAvatarProps = {
    member: Member;
}

const MemberAvatar = ({ member }: MemberAvatarProps) => {

    const Icon = MEMBER_ROLE_ICON_MAP[member.role];

    return (
        <div className="flex items-center gap-3">
            {member.avatarUuid ? (
                <img
                    src={getAvatarUrl(member.avatarUuid)!}
                    alt={member.name}
                    className="rounded-full object-cover size-12"
                />
            ) : (
                <Avatar className="size-12 text-gray-700 border border-gray-300">
                    <AvatarFallback>
                        {getInitials(member.name)}
                    </AvatarFallback>
                </Avatar>
            )}
            <div>
                <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-gray-700">{member.name}</p>
                    {Icon && <Icon className={cn("size-5", member.role === "ADMIN" ? "text-amber-500" : "text-blue-500")} />}
                </div>
                <p className="text-xs text-gray-500">{member.email}</p>
                <p className="text-xs text-gray-500">Joined {format(new Date(member.createdAt), "dd.MM.yyyy.")}</p>
            </div>
        </div>
    )
}

export default MemberAvatar;