// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { createChannelApi } from "@/services/channel.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useCreateChannel = () => {
    const queryClient = useQueryClient();

    const { mutate: createChannel, isPending } = useMutation({
        mutationFn: createChannelApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["channels", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { createChannel, isPending };
}