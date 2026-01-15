// modules
import type { Socket } from "socket.io";
// utils
import { parseCookies } from "@/socket/utils/parseCookies";
// services
import { authenticateSession } from "@/services/session.services";

export const socketAuth = async (socket: Socket, next: (err?: Error) => void) => {
    try {
        // 1) Extract accessToken from cookie
        const cookieHeader = socket.request.headers.cookie;
        const cookies = parseCookies(cookieHeader);
        const accessToken = cookies["accessToken"];

        // 2) Authenticate session (verify JWT, session & user)
        const { user, session } = await authenticateSession({ accessToken });

        // 3) Grant access to protected socket connection and assign user & session to socket object
        socket.data.user = user;
        socket.data.session = session;

        next();
        // Socket.IO expects Error, not AppError
    } catch (err: any) {
        next(new Error(err?.message ?? "Unauthorized"));
    }
}