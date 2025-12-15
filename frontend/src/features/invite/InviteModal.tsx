// lib
import { useState } from "react";
import { Check, Copy, Link, RefreshCw } from "lucide-react";
// components
import Input from "@/components/Input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// hooks
import { useModal } from "@/hooks/useModal";
import { useOrigin } from "@/hooks/useOrigin";
import { useServer } from "@/features/server/useServer";
import { useGenerateInviteCode } from "@/features/invite/useGenerateInviteCode";

const InviteModal = () => {
    const { origin } = useOrigin();
    const [copied, setCopied] = useState(false);
    const { isOpen, onClose, type, data } = useModal();
    const { server } = useServer(data.server?._id);
    const { generateInviteCode, isPending } = useGenerateInviteCode();

    const isModalOpen = isOpen && type === "invite";
    if (!isModalOpen || !server) return null;

    const inviteUrl = `${origin}/invite/${server.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 1000);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">Invite people</DialogTitle>
                    <DialogDescription className="text-center">
                        Share an invite link to let others join your server.<br />
                        You can generate a new link at any time to invalidate the old one.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <span className="text-sm text-gray-700">
                        Server invite link:
                    </span>
                    <div className="flex items-center gap-2">
                        <Input
                            name="invite-code"
                            placeholder="Invite code"
                            disabled={isPending}
                            icon={Link}
                            value={inviteUrl}
                            readOnly
                        />
                        <button
                            disabled={isPending}
                            onClick={onCopy}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm cursor-pointer"
                        >
                            {copied ? <Check className="size-4 text-gray-600" /> : <Copy className="size-4 text-gray-600" />}
                        </button>
                    </div>
                    <button
                        onClick={() => generateInviteCode(server._id)}
                        disabled={isPending}
                        className="flex items-center gap-2 text-gray-700 text-sm mt-4 mb-3 cursor-pointer hover:underline"
                    >
                        Generate a new link
                        <RefreshCw className="size-4 text-gray-600" />
                    </button>
                </div>
            </DialogContent>
        </Dialog >
    )
}

export default InviteModal;