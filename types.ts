// zod
import * as z from "zod";
// prisma
import { Server, Member, Profile, ChannelType } from "@prisma/client";
// socket.io
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

// zod validation schemas and types
export const serverFormSchema = z.object({
    name: z.string().min(1, { message: "Server name is required." }),
    imageUrl: z.string().min(1, { message: "Image is required." })
});
export type ServerFormSchema = z.infer<typeof serverFormSchema>;

export const channelFormSchema = z.object({
    name: z.string()
        .min(1, { message: "Channel name is required." })
        .refine(name => name !== "general", { message: "Channel name can't be 'general'." }),
    type: z.nativeEnum(ChannelType)
});
export type ChannelFormSchema = z.infer<typeof channelFormSchema>;

export const chatInputSchema = z.object({
    content: z.string().min(1)
});
export type ChatInputSchema = z.infer<typeof chatInputSchema>;

export const messageFileSchema = z.object({
    fileUrl: z.string().min(1, { message: "File image is required." })
});
export type MessageFileSchema = z.infer<typeof messageFileSchema>;

// Socket types
export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[]
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        }
    }
}
