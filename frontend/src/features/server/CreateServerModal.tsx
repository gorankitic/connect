// lib
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Server, X } from "lucide-react";
// components
import Button from "@/components/Button";
import Input from "@/components/Input";
import ServerAvatar from "./ServerAvatar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// types & schemas
import { createServerSchema, type CreateServerSchema } from "@/lib/schemas/server.schema";
// hooks
import { useModal } from "@/hooks/useModal";
import { useCreateServer } from "@/features/server/useCreateServer";

const CreateServerModal = () => {
    const { isOpen, onClose, type } = useModal();
    const { createServer, isPending } = useCreateServer();

    const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm<CreateServerSchema>({
        resolver: zodResolver(createServerSchema),
        defaultValues: { name: "", avatarUuid: "" }
    });

    const isModalOpen = isOpen && type === "createServer";

    const handleClose = () => {
        reset({ name: "", avatarUuid: "" });
        onClose();
    }

    const onSubmit = ({ name, avatarUuid }: CreateServerSchema) => {
        createServer({ name, avatarUuid });

        reset({ name: "", avatarUuid: "" });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">Create a new server</DialogTitle>
                    <DialogDescription className="text-center">Add a name and upload an avatar for your server. <br /> You can customize your server later. Click <em>Create</em> when you&apos;re ready.</DialogDescription>
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
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default CreateServerModal;