// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { updateServerApi } from "@/services/server.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useUpdateServer = () => {
    const queryClient = useQueryClient();

    const { mutate: updateServer, isPending } = useMutation({
        mutationFn: updateServerApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["servers"] });
            queryClient.invalidateQueries({ queryKey: ["server", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateServer, isPending };
}