// lib
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { Loader2 } from "lucide-react";
// styles
import "@livekit/components-styles";
// types
import type { CallType } from "@/lib/types/call.types";

type MediaRoomProps = {
    callType: CallType,
    serverId: string,
    targetId: string,
    video: boolean,
    audio: boolean
}

const baseUrl = import.meta.env.VITE_API_URL;

const MediaRoom = ({ callType, serverId, targetId, audio, video }: MediaRoomProps) => {
    const [token, setToken] = useState("");
    const [livekitUrl, setLivekitUrl] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${baseUrl}/api/v1/livekit/token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify({
                        type: callType,
                        targetId,
                        serverId
                    })
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