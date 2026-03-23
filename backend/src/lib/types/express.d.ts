import type { IMember } from "@/lib/types/member.types";
import type { IUser } from "@/lib/types/user.types";
import type { ISession } from "@/lib/types/session.types";

declare global {
    namespace Express {
        interface Request {
            user: IUser;
            session: ISession;
            member: IMember;
        }
    }
}

export { };