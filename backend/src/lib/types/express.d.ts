// types
import type { IMember } from "@/lib/types/member.types.js";
import type { IUser } from "@/lib/types/user.types.js";
import type { ISession } from "@/lib/types/session.types.js";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
            session: ISession;
            member?: IMember;
        }
    }
}

export { };