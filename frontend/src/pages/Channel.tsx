// lib
import { useParams } from "react-router-dom"

const Channel = () => {
    const { channelId } = useParams<{ channelId: string }>();

    return (
        <div className="flex w-full h-full items-center justify-center">
            <p>{channelId}</p>
        </div>
    )
}
export default Channel