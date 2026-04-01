// types
import { CanDeleteMessageDTO } from "@/lib/types/message.types";
// constants
import { MEMBER_ROLES } from "@/lib/constants/member.constants";
import { MESSAGE_TYPE } from "@/lib/constants/message.constants";

export const canDeleteMessage = ({ messageAuthorId, messageAuthorRole, memberId, memberRole, type }: CanDeleteMessageDTO) => {

    // 1) Message's author (sender) can always delete his own message
    const isSender = String(messageAuthorId) === String(memberId);
    if (isSender) return true;

    // 2) If it's (DM-private) conversation no one gets special privileges over the others
    if (type === MESSAGE_TYPE.CONVERSATION) return false;

    // 3) Admin can delete everyone messages
    if (memberRole === MEMBER_ROLES.ADMIN) return true;

    // 4) Moderator can delete their own messages, but not Admin or other Moderator messages
    if (memberRole === MEMBER_ROLES.MODERATOR) {
        if (messageAuthorRole === MEMBER_ROLES.ADMIN) return false;
        if (messageAuthorRole === MEMBER_ROLES.MODERATOR) return false;
        return true;
    }

    return false;
}