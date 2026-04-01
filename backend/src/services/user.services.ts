// modules
import { Types } from "mongoose";
import { deleteFile } from "@uploadcare/rest-client";
// config
import { uploadcareAuth } from "@/config/uploadcare";
// models
import { User } from "@/models/user.model";
// schemas
import { UpdateDataSchema } from "@/lib/schemas/user.schemas";
// utils
import { AppError } from "@/lib/utils/AppError";

export const updateUserData = async (userId: Types.ObjectId, data: UpdateDataSchema) => {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
    });

    return updatedUser;
};

export const updateUserAvatar = async (userId: Types.ObjectId, avatarUuid: string) => {
    // 1) Get user document from collection
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User is not found.", 404);
    }

    // 2) If user already had an avatar, delete it from Uploadcare
    if (user.avatarUuid && user.avatarUuid !== avatarUuid) {
        await deleteFile({ uuid: user.avatarUuid }, { authSchema: uploadcareAuth });
    }

    // 3) Update user avatarUuid field
    user.avatarUuid = avatarUuid;
    await user.save();

    // 4) Return data
    return user;
}