// modules
import { Types } from "mongoose";

export type Cursor = {
    createdAt: string;
    id: string;
}

export const encodeCursor = (cursor: Cursor) => {
    const json = JSON.stringify(cursor);
    return Buffer.from(json, "utf-8").toString("base64url");
}

export const decodeCursor = (cursor: string): Cursor => {
    try {
        const json = Buffer.from(cursor, "base64url").toString("utf-8");
        const parsed = JSON.parse(json) as Cursor;

        if (!parsed.createdAt || !parsed.id) {
            throw new Error("Invalid cursor shape!");
        }
        if (!Types.ObjectId.isValid(parsed.id)) {
            throw new Error("Invalid cursor id");
        }
        return parsed;
    } catch {
        throw new Error("Invalid cursor!");
    }
}