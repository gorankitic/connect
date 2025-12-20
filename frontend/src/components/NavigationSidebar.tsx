// components
import { ScrollArea } from "@/components/ui/scroll-area";
import UserButton from "@/features/user/UserButton";
import CreateServerButton from "@/features/server/CreateServerButton";
import ServersList from "@/features/server/ServersList";

const NavigationSidebar = () => {
    return (
        <aside className="fixed bg-gray-300 flex flex-col items-center h-full w-20 py-2 border-r border-r-gray-400/50">
            <div className="flex flex-col items-center w-full">
                <CreateServerButton />
                <div className="border-b border-gray-400/50 h-1 w-2/3 mt-2 mb-3 mx-auto" />
            </div>
            <ScrollArea className="flex-1 w-full overflow-y-auto">
                <ServersList />
            </ScrollArea>
            <div className="border-b border-gray-400/50 h-1 w-2/3 my-3 mx-auto" />
            <UserButton />
        </aside>
    )
}

export default NavigationSidebar;