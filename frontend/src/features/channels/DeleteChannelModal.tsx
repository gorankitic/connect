// lib
import { Send, X } from "lucide-react";
// components
import Button from "@/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useServer } from "@/features/server/useServer";
import { useDeleteChannel } from "@/features/channels/useDeleteChannel";

const DeleteChannelModal = () => {
    const { isOpen, type, onClose, data: { serverId, channelId } } = useModal();
    const { server } = useServer(serverId);
    const { deleteChannel, isPending } = useDeleteChannel();

    const channel = server?.channels.find(ch => ch._id === channelId);

    const isModalOpen = isOpen && type === "deleteChannel" && !!serverId && !!channelId;
    if (!isModalOpen || !server || !channel) return null;

    const handleDeleteServer = () => {
        deleteChannel({ serverId, channelId });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-red-500 my-3">
                        Delete channel
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete <span className="font-semibold text-red-500">{channel.name}</span> channel?
                        This action cannot be undone. All channel content will be deleted.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 justify-end mt-5">
                    <Button
                        type="button"
                        icon={X}
                        disabled={isPending}
                        className="bg-gray-200 text-gray-700 w-28"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        icon={Send}
                        disabled={isPending}
                        className="bg-red-500 text-white w-28"
                        onClick={handleDeleteServer}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal;