// lib
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// services
import { updateAvatarApi } from "@/services/user.services";
// types
import type { NormalizedError } from "@/lib/api/apiTypes";

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();

    const { mutate: updateAvatar } = useMutation({
        mutationFn: updateAvatarApi,
        onSuccess: ({ message }, { }) => {
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
        onError: (error: NormalizedError) => {
            toast.error(error.message);
        }
    });

    return { updateAvatar };
};
