"use client";

import qs from "query-string";
// hooks
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// components
import { ActionTooltip } from "@/components/ActionTooltip";
// assets
import { Video, VideoOff } from "lucide-react";

import React from 'react'

const ChatVideoButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isVideo = searchParams?.get("video");
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "Start video call";

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true });
        router.push(url);
    }

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition mr-4">
                <Icon className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
            </button>

        </ActionTooltip>
    )
}

export default ChatVideoButton