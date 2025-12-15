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
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["servers"] });
            queryClient.invalidateQueries({ queryKey: ["server"] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { generateInviteCode, isPending };
}