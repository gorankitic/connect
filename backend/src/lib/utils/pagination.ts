// utils
import { Cursor } from "@/lib/utils/cursor";
import { Types } from "mongoose";

export const buildOlderThanCursorFilter = (cursor: Cursor) => {
    const cursorDate = new Date(cursor.createdAt);
    const cursorId = new Types.ObjectId(cursor.id);

    // $or: Match a document if any one of listed conditions is true
    // $lt: Messages that are older than the cursor (less than) 
    // "older than cursor" means: older timestamp || Same timestamp AND smaller _id
    return {
        $or: [
            { createdAt: { $lt: cursorDate } },
            { createdAt: cursorDate, _id: { $lt: cursorId } }
        ]
    }
}

export const clampLimit = (n: number) => {
    // `n` might become `NaN` when query params can't be parsed (e.g. `limit=abc`).
    // In that case, fall back to a safe default.
    if (!Number.isFinite(n)) return 30;
    return Math.max(1, Math.min(n, 30));
};