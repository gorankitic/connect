// lib
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Send, X } from "lucide-react";
// components
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// schemas & types
import { upsertChannelSchema, type UpsertChannelSchema } from "@/lib/schemas/channel.schema";
import type { ChannelType } from "@/lib/types/channel.types";
// constants
import { CHANNEL_TYPE, CHANNEL_TYPE_OPTIONS } from "@/lib/constants/channel.constants";
// hooks
import { useModal } from "@/hooks/useModal";
import { useCreateChannel } from "@/features/channels/useCreateChannel";

const CreateChannelModal = () => {
    const { isOpen, onClose, type, data: { serverId, channelType } } = useModal();
    const { createChannel, isPending } = useCreateChannel();
    const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<UpsertChannelSchema>({
        resolver: zodResolver(upsertChannelSchema),
        defaultValues: { name: "", type: CHANNEL_TYPE.TEXT }
    });

    const isModalOpen = isOpen && type === "createChannel" && !!serverId;

    useEffect(() => {
        if (isModalOpen && channelType) {
            reset({
                name: "",
                type: channelType ?? CHANNEL_TYPE.TEXT,
            });
        }
    }, [isModalOpen, channelType, reset]);

    if (!isModalOpen) return null;

    const handleClose = () => {
        reset({ name: "", type: CHANNEL_TYPE.TEXT });
        onClose();
    }

    const onSubmit = (body: UpsertChannelSchema) => {
        createChannel({ serverId, body });

        reset({ name: "", type: CHANNEL_TYPE.TEXT });
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center uppercase text-blue-600 my-3">Create a new channel</DialogTitle>
                    <DialogDescription className="text-center">Add a name and select the channel type. <br />You can customize your channel later. Click <em>Create</em> when you&apos;re ready.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register("name")}
                        placeholder="Channel name"
                        disabled={isPending}
                        error={errors.name?.message}
                        icon={Hash}
                    />
                    <Select
                        value={watch("type")}
                        onValueChange={(value) => setValue("type", value as ChannelType)}
                    >
                        <SelectTrigger className="w-full mt-5 cursor-pointer text-gray-700">
                            <SelectValue placeholder="Select channel type" />
                        </SelectTrigger>
                        <SelectContent>
                            {CHANNEL_TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
                                <SelectItem key={value} value={value} className="cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-4" />
                                        {label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex gap-3 justify-end mt-5">
                        <Button
                            type="button"
                            icon={X}
                            disabled={isPending}
                            className="bg-gray-200 text-gray-700 w-28"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
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

export default CreateChannelModal;