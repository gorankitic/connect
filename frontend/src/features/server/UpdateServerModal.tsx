// lib
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Server, X } from "lucide-react";
// components
import Button from "@/components/Button";
import Input from "@/components/Input";
import ServerAvatar from "./ServerAvatar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// schemasm types & constants
import { upsertServerSchema, type UpsertServerSchema } from "@/lib/schemas/server.schema";
// hooks
import { useModal } from "@/hooks/useModal";
import { useServer } from "@/features/server/useServer";
import { useUpdateServer } from "@/features/server/useUpdateServer";

const UpdateServerModal = () => {
    const { isOpen, onClose, type, data: { serverId } } = useModal();
    const { server } = useServer(serverId);
    const { updateServer, isPending } = useUpdateServer();

    const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm<UpsertServerSchema>({
        resolver: zodResolver(upsertServerSchema),
        defaultValues: { name: "", avatarUuid: "" }
    });

    const isModalOpen = isOpen && type === "updateServer" && !!serverId;

    useEffect(() => {
        if (isModalOpen && server) {
            reset({ name: server.name, avatarUuid: server.avatarUuid });
        }
    }, [isModalOpen, server, reset]);

    if (!isModalOpen || !server) return null;

    const handleClose = () => {
        reset({ name: "", avatarUuid: "" });
        onClose();
    }

    const onSubmit = ({ name, avatarUuid }: UpsertServerSchema) => {
        updateServer({ serverId, name, avatarUuid });

        reset({ name: "", avatarUuid: "" });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">Customize your server</DialogTitle>
                    <DialogDescription className="text-center">Change the server name or upload a new avatar. <br /> Click <em>Update</em> when you&apos;re ready.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="flex items-center justify-center w-full mb-5">
                        <ServerAvatar
                            value={watch("avatarUuid")}
                            onChange={(avatarUuid) => setValue("avatarUuid", avatarUuid, { shouldValidate: true })}
                        />
                    </section>
                    <input type="hidden" {...register("avatarUuid")} />
                    {errors.avatarUuid && (<p className="text-red-500 text-sm text-center -mt-3 mb-5">{errors.avatarUuid.message}</p>)}
                    <Input
                        {...register("name")}
                        placeholder="Server name"
                        disabled={isPending}
                        error={errors.name?.message}
                        icon={Server}
                    />
                    <div className="flex gap-3 justify-end mt-5">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                icon={X}
                                disabled={isPending}
                                className="bg-gray-200 text-gray-700 w-28"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            icon={Send}
                            disabled={isPending}
                            className="bg-linear-to-r from-blue-400 to-blue-600 text-white w-28"
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default UpdateServerModal;