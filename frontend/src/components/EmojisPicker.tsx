// lib
import { Smile } from "lucide-react";
import EmojiPicker from 'emoji-picker-react';
// components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type EmojiPickerProps = {
    onChange: (value: string) => void;
}

const EmojisPicker = ({ onChange }: EmojiPickerProps) => {

    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="size-6 absolute right-4 top-7 -translate-y-1/2 text-gray-600 hover:text-gray-700 transition cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent
                side="right"
                sideOffset={80}
                className="bg-transparent border-none shadow-none drop-shadow-none mb-24"
            >
                <EmojiPicker onEmojiClick={(emoji) => onChange(emoji.emoji)} />
            </PopoverContent>
        </Popover>
    )
}

export default EmojisPicker;