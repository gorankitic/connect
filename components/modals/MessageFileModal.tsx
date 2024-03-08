"use client";

import axios from "axios";
import qs from "query-string";
// hooks
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
// components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
// zod validation
import { messageFileSchema, MessageFileSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";



const MessageFileModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data: { apiUrl, query } } = useModal();

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm<MessageFileSchema>({
        resolver: zodResolver(messageFileSchema),
        defaultValues: {
            fileUrl: ""
        }
    });
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const onSubmit = async (values: MessageFileSchema) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            });
            await axios.post(url, { ...values, content: values.fileUrl });
            form.reset();
            router.refresh();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-neutral-900 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-neutral-600">
                        Send a file or image as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isSubmitting}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFileModal;