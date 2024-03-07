"use client";

// next
import Image from "next/image";
// uploadthing
import { UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
// assets
import { X } from "lucide-react";


type FileUploadProps = {
    onChange: (url?:string) => void,
    value: string,
    endpoint: "messageFile" | "serverImage"
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if(value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="server image" className="rounded-full " />
                <button 
                    onClick={() => {}} 
                    className="bg-purple-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" 
                    type="button"
                >
                    <X className="h-3 w-3" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            className="ut-button:bg-purple-500 ut-label:text-purple-500 ut-label:hover:text-purple-400 cursor-pointer"
            endpoint={endpoint} 
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }} 
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}

export default FileUpload;