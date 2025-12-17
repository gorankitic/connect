// lib
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";
// services
import { deleteServerApi } from "@/services/server.services";

export const useDeleteServer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteServer, isPending } = useMutation({
        mutationFn: deleteServerApi,
        onSuccess: ({ message }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["servers"] });
            queryClient.removeQueries({ queryKey: ["server"] });
            navigate("/", { replace: true });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { deleteServer, isPending };
}