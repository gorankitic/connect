// lib
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { createServerApi } from "@/services/server.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useCreateServer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: createServer, isPending } = useMutation({
        mutationFn: createServerApi,
        onSuccess: ({ server }) => {
            navigate(`/servers/${server._id}`);
            queryClient.invalidateQueries({ queryKey: ["servers"] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { createServer, isPending };
}