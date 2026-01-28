// lib
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { Loader2 } from "lucide-react";
// styles
import "@livekit/components-styles";
// hooks
import { useChat } from "@/hooks/useChat";

type MediaRoomProps = {
    video: boolean,
    audio: boolean
}

const baseUrl = import.meta.env.VITE_API_URL;

const MediaRoom = ({ audio, video }: MediaRoomProps) => {
    const type = useChat((s) => s.type);
    const targetId = useChat((s) => s.targetId);
    const serverId = useChat((s) => s.serverId);

    const [token, setToken] = useState("");
    const [livekitUrl, setLivekitUrl] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${baseUrl}/api/v1/livekit/token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({ type, targetId, serverId })
                });
                const data = await res.json();
                setToken(data.token);
                setLivekitUrl(data.url);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [targetId]);

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="size-7 text-gray-500 animate-spin my-4" />
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={livekitUrl}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}

export default MediaRoom;