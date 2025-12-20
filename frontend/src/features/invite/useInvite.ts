// lib
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { joinServerApi } from "@/services/invite.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useInvite = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: joinServer, isPending } = useMutation({
        mutationFn: joinServerApi,
        onSuccess: ({ serverId }) => {
            queryClient.invalidateQueries({ queryKey: ["servers"] });
            navigate(`/servers/${serverId}`);
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { joinServer, isPending };
}