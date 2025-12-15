// components
import Loader from "@/components/Loader";
import MemberItem from "@/features/members/MemberItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useServer } from "@/features/server/useServer";
import { useMembers } from "@/features/members/useMembers";

const MembersModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const serverId = data.server?._id;
    const { server } = useServer(serverId);

    const isModalOpen = isOpen && type === "manageMembers" && !!serverId;
    const { members, isPending } = useMembers(isModalOpen, serverId);

    if (!isModalOpen || !server) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">Manage server members</DialogTitle>
                    <DialogDescription className="text-center">
                        {!isPending && <>The <span className="font-semibold">{server.name}</span> server has {members.length} members.
                            As an administrator, you can change members role and kick members from the server.</>}
                    </DialogDescription>
                </DialogHeader>
                {isPending ? (
                    <div className="stroke-1 flex items-center justify-center mb-5">
                        <Loader />
                    </div>
                ) : (
                    <ScrollArea className="max-h-72">
                        {members.map((member) => (
                            <MemberItem key={member._id} member={member} />
                        ))}
                    </ScrollArea>
                )}
            </DialogContent>
        </Dialog >
    )
}

export default MembersModal;