// lib
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// components
import Loader from "@/components/Loader"
// hooks
import { useInvite } from "@/features/invite/useInvite";

const Invite = () => {
    const { inviteCode } = useParams();
    const { joinServer, isPending } = useInvite();

    // Run useEffect only once, because React strict mode
    const hasJoinedRef = useRef(false);

    useEffect(() => {
        if (!inviteCode || hasJoinedRef.current) return;

        hasJoinedRef.current = true;
        joinServer(inviteCode);
    }, [inviteCode, joinServer]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        )
    }

    return null;
}

export default Invite;