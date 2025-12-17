// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { deleteChannelApi } from "@/services/channel.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useDeleteChannel = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteChannel, isPending } = useMutation({
        mutationFn: deleteChannelApi,
        onSuccess: ({ message }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["server"] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { deleteChannel, isPending };
}