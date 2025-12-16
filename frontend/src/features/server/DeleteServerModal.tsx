// lib
import { Send, X } from "lucide-react";
// components
import Button from "@/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useDeleteServer } from "@/features/server/useDeleteServer";

const DeleteServerModal = () => {
    const { isOpen, type, onClose, data: { server } } = useModal();
    const { deleteServer, isPending } = useDeleteServer();

    const isModalOpen = isOpen && type === "deleteServer";

    if (!isModalOpen || !server) return null;

    const handleDeleteServer = () => {
        deleteServer({ serverId: server._id });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-red-500 my-3">
                        Delete server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete <span className="font-semibold text-red-500">{server.name}</span> server?
                        This action cannot be undone. All your channels and members will be deleted.
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

export default DeleteServerModal;