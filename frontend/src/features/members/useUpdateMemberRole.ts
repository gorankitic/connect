// lib
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
// services
import { updateMemberRoleApi } from "@/services/member.services";

export const useUpdateMemberRole = () => {
    const queryClient = useQueryClient();

    const { mutate: updateRole, isPending } = useMutation({
        mutationFn: updateMemberRoleApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["members", serverId] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateRole, isPending };
}