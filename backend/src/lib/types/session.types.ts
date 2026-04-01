// lib
import { Request } from "express";
import { Types } from "mongoose";

export interface ISession {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    refreshTokenHash: string;
    userAgent?: string | null;
    location?: string | null;
    ip?: string | null;
    createdAt: Date;
    lastUsedAt: Date;
    expiresAt: Date; // Session lifetime, based on refresh token TTL
    revokedAt?: Date | null;
    replacedBy?: Types.ObjectId | null; // Points to a new session on rotation
}

export type CreateSessionDTO = {
    userId: Types.ObjectId,
    role?: string,
    req: Request
}

export type RotateSessionDTO = {
    refreshToken: string,
    req: Request
}