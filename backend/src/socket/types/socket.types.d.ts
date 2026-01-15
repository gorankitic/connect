// types
import { IUser } from "@/lib/types/user.types";
import { ISession } from "@/lib/types/session.types";

declare module "socket.io" {
    interface Socket {
        data: {
            user?: IUser;
            session?: ISession;
        };
    }
}
