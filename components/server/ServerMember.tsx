"use client";

// hooks
import { useParams, useRouter } from "next/navigation";
// prisma types
import { Member, MemberRole, Profile, Server } from "@prisma/client";
// utils
import { cn } from "@/lib/utils";
// assets
import { ShieldCheck, ShieldX } from "lucide-react";
import UserAvatar from "../UserAvatar";

type ServerMemberProps = {
    member: Member & { profile: Profile },
    server: Server
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-sky-500" />,
    [MemberRole.ADMIN]: <ShieldX className="h-4 w-4 ml-2 text-rose-500" />,
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];

    const onClick = () => {
        router.push(`/servers/${params.serverId}/conversations/${member.id}`);
    }

    return (
        <button 
            onClick={onClick}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1",
                params?.memberId === member.id && "bg-neutral-700/20 dark:bg-neutral-700" 
            )}
        >
            <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
            <p className={cn(
                "font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition",
                params?.memberId === member.id && "text-primary dark:text-neutral-200 dark:group-hover:text-white"
            )}>
                {member.profile.name}
            </p>
            {icon}
        </button>
    )
}

export default ServerMember;