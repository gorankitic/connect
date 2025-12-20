// lib
import { useState } from "react";
// hooks
import { useAuth } from "@/features/authentication/useAuth";
import { useUploadAvatar } from "@/features/user/useUploadAvatar";
import { useUpdateAvatar } from "@/features/user/useUpdateAvatar";
// components
import UploadAvatar from "@/features/user/UploadAvatar";
// utils
import { getAvatarUrl, getInitials } from "@/lib/utils";

const UserAvatar = () => {
    const { user } = useAuth();
    const { uploadAvatar } = useUploadAvatar();
    const { updateAvatar } = useUpdateAvatar();
    const [isUploading, setIsUploading] = useState(false);

    if (!user) return null;

    const handleFileSelect = async (file: File) => {
        setIsUploading(true);

        const response = await uploadAvatar(file);
        if (response?.avatarUuid) {
            updateAvatar({ avatarUuid: response.avatarUuid });
        }
        setIsUploading(false);
    };

    return (
        <div className="flex gap-5">
            <UploadAvatar
                avatarUrl={getAvatarUrl(user.avatarUuid)}
                fallback={getInitials(user.name)}
                onFileSelect={handleFileSelect}
                isUploading={isUploading}
            />
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-semibold">{user.name}</h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
        </div>
    )
}

export default UserAvatar;