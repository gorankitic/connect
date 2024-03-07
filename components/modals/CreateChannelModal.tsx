"use client";

import qs from "query-string";
import axios from "axios";
// hooks
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModalStore";
// components
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
// zod validation
import { channelFormSchema, ChannelFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
// prisma
import { ChannelType } from "@prisma/client";



const CreateChannelModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type } = useModal();
    const params = useParams();

    const form = useForm<ChannelFormSchema>({
        resolver: zodResolver(channelFormSchema),
        defaultValues: { name: "", type: ChannelType.TEXT }
    });
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    const isModalOpen = isOpen && type === "createChannel";

    const onSubmit = async (values: ChannelFormSchema) => {
        try {
            const url = qs.stringifyUrl({
                url: '/api/channels',
                query: {
                    serverId: params?.serverId
                }
            });

            await axios.post(url, values);
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-neutral-900 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                       Create channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={control} 
                                name="name" 
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel  className="uppercase text-xs font-bold text-neutral-500 dark:text-secondary/70">
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Channel name" 
                                                disabled={isSubmitting} 
                                                className="bg-neutral-300/50 border-0 focus-visible:ring-0 text-neutral-900 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                } 
                            />
                            <FormField 
                                control={control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Channel type</FormLabel>
                                        <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger className="bg-neutral-300/50 border-0 focus:ring-0 text-neutral-900 ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem key={type} value={type} className="capitalize">
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isSubmitting}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChannelModal;