// next
import { redirect } from "next/navigation";
// components
import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
// utils
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
// prisma
import { ChannelType, MemberRole } from "@prisma/client";
// assets
import { Hash, Mic, ShieldCheck, ShieldX, Video } from "lucide-react";

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4 text-neutral-800" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-sky-500" />,
    [MemberRole.ADMIN]: <ShieldX className="mr-2 h-4 w-4 text-rose-500" />,
}

const ServerSidebar = async ({ serverId }: { serverId: string }) => {

    const profile = await currentProfile();
    if(!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    if(!server) {
        return redirect("/");
    }

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server?.members.filter((member) => member.profileId !== profile.id);
    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="flex-1 px-3">
                <ServerSearch 
                    data={[
                        {
                            label: "Text channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name:channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Audio channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name:channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Video channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name:channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role]
                            }))
                        }
                    ]} 
                />
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar;