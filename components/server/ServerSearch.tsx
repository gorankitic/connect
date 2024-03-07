"use client";

// hooks
import { useEffect, useState } from "react";
// assets
import { Search } from "lucide-react";
// components
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

type ServerSearchProps = {
    data: {
        label: string,
        type: "channel" | "member",
        data: {
            icon: React.ReactNode,
            name: string,
            id: string
        }[] | undefined
    }[]
}

const ServerSearch = ({ data }: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(open => !open);
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const onClick = ({ id, type }: { id:string, type: "channel" | "member"}) => {
        setOpen(false);
        if(type === "member") {
            return router.push(`/servers/${params?.serverId}/conversations/${id}`);
        }
        if(type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`);
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="group mt-2 px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition">
                <Search className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <p className="font-semibold text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-sm">Ctrl+K</span>
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if(!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default ServerSearch;