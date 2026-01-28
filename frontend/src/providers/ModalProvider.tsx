// components
import CreateServerModal from "@/features/server/CreateServerModal";
import DeleteServerModal from "@/features/server/DeleteServerModal";
import LeaveServerModal from "@/features/server/LeaveServerModal";
import UpdateServerModal from "@/features/server/UpdateServerModal";
import InviteModal from "@/features/invite/InviteModal";
import MembersModal from "@/features/members/MembersModal";
import CreateChannelModal from "@/features/channels/CreateChannelModal";
import UpdateChannelModal from "@/features/channels/UpdateChannelModal";
import DeleteChannelModal from "@/features/channels/DeleteChannelModal";
import DeleteMessageModal from "@/features/chat/DeleteMessageModal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <UpdateServerModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <InviteModal />
            <MembersModal />
            <CreateChannelModal />
            <UpdateChannelModal />
            <DeleteChannelModal />
            <DeleteMessageModal />
        </>
    )
}

export default ModalProvider;