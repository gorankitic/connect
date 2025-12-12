// modules
import { generateSecureSignature } from "@uploadcare/signed-uploads";
// utils
import { catchAsync } from "@/lib/utils/catchAsync";
// config
import { UPLOADCARE_SIGNATURE_LIFETIME } from "src/config/uploadcare";
// constants
import { UPLOADCARE_PUBLIC_KEY, UPLOADCARE_SECRET_KEY } from "@/config/env";

// Get signature for upload
// GET method
// Protected route /api/v1/uploads/signature
export const getUploadcareSignature = catchAsync((req, res) => {
    const secretKey = UPLOADCARE_SECRET_KEY;
    const publicKey = UPLOADCARE_PUBLIC_KEY;

    const { secureSignature, secureExpire } = generateSecureSignature(secretKey, { lifetime: UPLOADCARE_SIGNATURE_LIFETIME });

    res.status(200).json({
        status: "success",
        secureSignature,
        secureExpire,
        publicKey,
    });
});