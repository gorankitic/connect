"use client";

import axios from "axios";
import qs from "query-string";
// hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
// components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const DeleteChannelModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose, type, data: { channel, server } } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteChannel";

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })
            await axios.delete(url);

            onClose();
            router.refresh();
            // router.push(`/servers/${server?.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-neutral-900 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Delete channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-neutral-700">
                        Are you sure you want to delete <span className="font-semibold text-sky-600">#{channel?.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-neutral-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost" className="bg-neutral-200 hover:bg-neutral-300">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={handleConfirm} variant="primary">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal;