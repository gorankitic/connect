// api
import api from "@/lib/api/apiClient";
// types
import type { GetUploadSignatureResponse } from "@/lib/api/apiTypes";

export const getUploadSignature = async () => {
    const { data } = await api.get<GetUploadSignatureResponse>("/uploads/signature");
    return data;
}