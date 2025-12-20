// lib
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
// services
import { leaveServerApi } from "@/services/server.services";

export const useLeaveServer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: leaveServer, isPending } = useMutation({
        mutationFn: leaveServerApi,
        onSuccess: ({ message }, { serverId }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["servers"] });
            queryClient.removeQueries({ queryKey: ["server", serverId] });
            navigate("/", { replace: true });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { leaveServer, isPending };
}