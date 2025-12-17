// types
import type { Member } from "@/lib/api/apiTypes";
// utils
import { cn, getAvatarUrl, getInitials } from "@/lib/utils";
// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// constants
import { MEMBER_ROLE_ICON_MAP } from "@/lib/constants/member.constants";

const MemberListItem = ({ member }: { member: Member }) => {

    const Icon = MEMBER_ROLE_ICON_MAP[member.role];

    return (
        <button className="group flex items-center gap-2 w-full py-2 px-3 rounded-sm hover:bg-gray-200 cursor-pointer">
            {member.avatarUuid ? (
                <img
                    src={getAvatarUrl(member.avatarUuid)!}
                    alt={member.name}
                    className="rounded-full object-cover size-8"
                />
            ) : (
                <Avatar className="size-8 text-gray-700">
                    <AvatarFallback className="bg-gray-300">
                        {getInitials(member.name)}
                    </AvatarFallback>
                </Avatar>
            )}
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-500 group-hover:text-gray-600">{member.name}</p>
                    {Icon && <Icon className={cn("size-5", member.role === "ADMIN" ? "text-amber-500" : "text-blue-500")} />}
                </div>
            </div>
        </button>
    )
}
export default MemberListItem;