import { User } from "../../models/user.model.ts"
import { Session } from "../../models/session.model.ts"
import type { IMember } from "@/lib/types";

declare global {
    namespace Express {
        interface Request {
            user?: User;
            session?: Session;
            member?: IMember
        }
    }
}

export { };