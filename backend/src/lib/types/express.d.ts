import { User } from "../../models/user.model.ts"
import { Session } from "../../models/session.model.ts"
import { Member } from "@/models/member.model.js";

declare global {
    namespace Express {
        interface Request {
            user?: User;
            session?: Session;
            member?: Member;
        }
    }
}
