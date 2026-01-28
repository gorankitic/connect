// lib
import { Send, X } from "lucide-react";
// components
import Button from "@/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useDeleteMessage } from "@/features/chat/useDeleteMessage";
import { useChat } from "@/hooks/useChat";

const DeleteMessageModal = () => {
    const type = useChat((s) => s.type);
    const serverId = useChat((s) => s.serverId);
    const targetId = useChat((s) => s.targetId);
    const { isOpen, type: modalType, onClose, data: { messageId } } = useModal();

    const { deleteMessage, isPending } = useDeleteMessage({ type, serverId, targetId, messageId });

    const isModalOpen = isOpen && modalType === "deleteMessage";
    if (!isModalOpen) return null;

    const handleDeleteMessage = () => {
        deleteMessage();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-red-500 my-3">
                        Delete message
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete this message? This action cannot be undone right now.
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
                        onClick={handleDeleteMessage}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteMessageModal;