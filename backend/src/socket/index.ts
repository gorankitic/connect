// modules
import { Server } from "socket.io";
import chalk from "chalk";
// types
import type { Server as HttpServer } from "http";
// constants
import { CLIENT_ORIGIN } from "@/config/env";
// socket-middlewares
import { socketAuth } from "@/socket/middlewares/authenticate";
// handlers
import { registerChannelHandlers } from "@/socket/handlers/channel.handlers";
import { registerConversationHandlers } from "@/socket/handlers/conversation.handlers";

let ioInstance: Server | null = null;

export const initializeSocket = (httpServer: HttpServer) => {

    const io = new Server(httpServer, {
        cors: { origin: CLIENT_ORIGIN, credentials: true },
        // Do not use HTTP polling, only accept native WebSocket connections
        transports: ["websocket"],
        // Server sends a pings (heartbeat pings to keep the connection alive) every 25 seconds
        // No silent disconnects, connection never appears idle
        pingInterval: 25000,
        // Server waits for a pong after a ping for 20 seconds
        // If client doesn’t respond within 20 seconds, Socket.IO disconnects it 
        // Dead connections are cleaned up, no memory leaks, presence stays accurate
        pingTimeout: 20000
    });

    // Socket authentication middleware at handshake
    io.use(socketAuth);

    io.on("connection", (socket) => {
        const userId = String(socket.data.user._id);

        // Single user can have many sockets (new tab or device) → all sockets join the same user room
        // User A (Phone)  -> socket #1 -> joins user:123
        // User A (Laptop) -> socket #2 -> joins user:123
        // User A (Tablet) -> socket #3 -> joins user:123
        // Useful for signout, notifications...
        socket.join(`user:${userId}`);

        console.log(chalk.bgBlue.bold(`Socket connected: ${socket.id} (user: ${userId})`));

        registerChannelHandlers(io, socket);
        registerConversationHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log(chalk.blue.bold(`Socket disconnected: ${socket.id} (user: ${userId})`));
        });
    });

    console.log(chalk.bgGreen.bold("Socket.io initialized. Real-time communication enabled via WebSockets."));

    ioInstance = io;

    return io;
}

export const getIO = (): Server => {
    if (!ioInstance) throw new Error("Socket.IO not initialized. Use initializeSocket function first.");
    return ioInstance;
}