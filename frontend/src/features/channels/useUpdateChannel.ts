// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { updateChannelApi } from "@/services/channel.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useUpdateChannel = () => {
    const queryClient = useQueryClient();

    const { mutate: updateChannel, isPending } = useMutation({
        mutationFn: updateChannelApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["channels", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateChannel, isPending };
}