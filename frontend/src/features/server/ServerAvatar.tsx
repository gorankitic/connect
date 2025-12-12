// lib
import { useState } from "react";
import { Image } from "lucide-react";
// hooks
import { useUploadAvatar } from "@/features/user/useUploadAvatar";
// components
import UploadAvatar from "@/features/user/UploadAvatar";
// utils
import { getAvatarUrl } from "@/lib/utils";

type ServerAvatarProps = {
    value: string | null,
    onChange: (avatarUuid: string) => void
}

const ServerAvatar = ({ value, onChange }: ServerAvatarProps) => {
    const { uploadAvatar } = useUploadAvatar();
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (file: File) => {
        setIsUploading(true);
        const response = await uploadAvatar(file);
        if (response) {
            onChange(response.avatarUuid)
        }
        setIsUploading(false);
    };

    return (
        <UploadAvatar
            avatarUrl={getAvatarUrl(value)}
            fallback={<Image className="text-gray-500" />}
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
        />
    )
}

export default ServerAvatar;