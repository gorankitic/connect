// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { generateInviteCodeApi } from "@/services/invite.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useGenerateInviteCode = () => {
    const queryClient = useQueryClient();

    const { mutate: generateInviteCode, isPending } = useMutation({
        mutationFn: generateInviteCodeApi,
        retry: false,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["server", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { generateInviteCode, isPending };
}