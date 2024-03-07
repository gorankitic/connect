// next
import { redirect } from "next/navigation";
// clerk auth
import { UserButton } from "@clerk/nextjs";
// components
import NavigationAction from "./NavigationAction";
import NavigationItem from "./NavigationItem";
import { ToggleMode } from "@/components/ToggleMode";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// utils
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-neutral-300 dark:bg-neutral-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ToggleMode />
                <UserButton afterSignOutUrl="/" appearance={{ elements: {avatarBox: "h-[36px] w-[36px]"} }} />
            </div>
        </div>
    )
}

export default NavigationSidebar;