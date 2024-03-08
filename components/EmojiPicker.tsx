"use client";

// hooks
import { useTheme } from "next-themes";
// components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
// assets
import { Smile } from "lucide-react";

type EmojiPickerProps = {
    onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition" />
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none drop-shadow-none mb-16" >
                <Picker data={data} theme={resolvedTheme} onEmojiSelect={(emoji: any) => onChange(emoji.native)} />
            </PopoverContent>

        </Popover>
    )
}

export default EmojiPicker;