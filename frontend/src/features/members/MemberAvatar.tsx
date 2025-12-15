// lib
import { format } from "date-fns";
import { Crown, ShieldCheck } from "lucide-react";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// types
import type { Member } from "@/lib/api/apiTypes";
// utils
import { getAvatarUrl, getInitials } from "@/lib/utils";

type MemberAvatarProps = {
    member: Member;
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="size-4 text-blue-500" />,
    "ADMIN": <Crown className="size-4 text-amber-500" />
}

const MemberAvatar = ({ member }: MemberAvatarProps) => {

    return (
        <div className="flex items-center gap-3">
            {member.avatarUuid ? (
                <img
                    src={getAvatarUrl(member.avatarUuid)!}
                    alt={member.name}
                    className="rounded-full object-cover size-12"
                />
            ) : (
                <Avatar className="size-12">
                    <AvatarFallback>
                        {getInitials(member.name)}
                    </AvatarFallback>
                </Avatar>
            )}
            <div>
                <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-gray-700">{member.name}</p>
                    {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-gray-500">{member.email}</p>
                <p className="text-xs text-gray-500">Joined {format(new Date(member.createdAt), "dd.MM.yyyy.")}</p>
            </div>
        </div>
    )
}

export default MemberAvatar;