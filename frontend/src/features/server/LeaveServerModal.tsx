// lib
import { Send, X } from "lucide-react";
// components
import Button from "@/components/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useLeaveServer } from "@/features/server/useLeaveServer";

const LeaveServerModal = () => {
    const { isOpen, type, onClose, data: { server } } = useModal();
    const { leaveServer, isPending } = useLeaveServer();

    const isModalOpen = isOpen && type === "leaveServer";

    if (!isModalOpen || !server) return null;

    const handleLeaveServer = () => {
        leaveServer({ serverId: server._id });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">
                        Leave server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to leave <span className="font-semibold text-blue-600">{server.name}</span> server?
                        This action cannot be undone. You can join server again only with invite link.
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
                        className="bg-linear-to-r from-blue-400 to-blue-600 text-white w-28"
                        onClick={handleLeaveServer}
                    >
                        Leave
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LeaveServerModal;