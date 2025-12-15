// components
import InviteModal from "@/features/invite/InviteModal";
import MembersModal from "@/features/members/MembersModal";
import CreateServerModal from "@/features/server/CreateServerModal";
import UpdateServerModal from "@/features/server/UpdateServerModal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <UpdateServerModal />
            <InviteModal />
            <MembersModal />
        </>
    )
}

export default ModalProvider;