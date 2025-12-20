// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { updateDataApi } from "@/services/user.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: updateDataApi,
        onSuccess: ({ message }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateUser, isPending };
}