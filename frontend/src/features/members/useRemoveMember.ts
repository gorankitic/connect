// lib
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
// type
import type { NormalizedError } from "@/lib/api/apiTypes";
// services
import { removeMemberApi } from "@/services/member.services";

export const useRemoveMember = () => {
    const queryClient = useQueryClient();

    const { mutate: removeMember, isPending } = useMutation({
        mutationFn: removeMemberApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["members", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { removeMember, isPending };
}