"use client";

import axios from "axios";
// hooks
import { useState } from "react";
import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";
// components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// assets
import { Check, Copy, RefreshCw } from "lucide-react";

const InviteModal = () => {
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const origin = useOrigin();

    const { server } = data;
    const isModalOpen = isOpen && type === "invite";
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 1000);
    }

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("invite", { server: response.data });
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
                        Invite friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-neutral-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading} 
                            value={inviteUrl}
                            className="bg-neutral-300/50 border-0 focus-visible:ring-0 text-neutral-900 focus-visible:ring-offset-0" 
                        />
                        <Button disabled={isLoading} onClick={onCopy} size="icon" className="bg-neutral-300/50 text-neutral-700 hover:bg-neutral-300">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            
                        </Button>
                    </div>
                    <Button onClick={onNew} disabled={isLoading} variant="link" size="sm" className="text-xs text-neutral-500 mt-4">
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal;