"use client";

// hooks
import { useEffect, useState } from "react";
// livekit
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
// prisma types
import { Channel } from "@prisma/client";
// clerk auth
import { useUser } from "@clerk/nextjs";
// assets
import { Loader2 } from "lucide-react";

type MediaRoomProps = {
    chatId: string,
    video: boolean,
    audio: boolean
}

import React from 'react'

const MediaRoom = ({ audio, chatId, video }: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;
        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await res.json();
                setToken(data.token);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === "") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-neutral-500 animate-spin my-4" />
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading...</p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
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