// components
import InviteModal from "@/features/invite/InviteModal";
import MembersModal from "@/features/members/MembersModal";
import CreateServerModal from "@/features/server/CreateServerModal";
import DeleteServerModal from "@/features/server/DeleteServerModal";
import LeaveServerModal from "@/features/server/LeaveServerModal";
import UpdateServerModal from "@/features/server/UpdateServerModal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <UpdateServerModal />
            <InviteModal />
            <MembersModal />
            <LeaveServerModal />
            <DeleteServerModal />
        </>
    )
}

export default ModalProvider;