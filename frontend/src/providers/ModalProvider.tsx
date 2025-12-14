// components
import InviteModal from "@/features/invite/InviteModal";
import CreateServerModal from "@/features/server/CreateServerModal";
import UpdateServerModal from "@/features/server/UpdateServerModal";

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <UpdateServerModal />
            <InviteModal />
        </>
    )
}

export default ModalProvider;