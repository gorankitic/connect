"use client";

// hooks
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// components
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
// zod validation
import { serverFormSchema, ServerFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";


const InitialModal = () => {
    // to solve hydration problem
    const [isClient, setIsClient] = useState(false);

    const form = useForm<ServerFormSchema>({
        resolver: zodResolver(serverFormSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });
    const { handleSubmit, control, formState: {isSubmitting}  } = form;

    useEffect(() => {setIsClient(true)}, []);

    const onSubmit = async (data: ServerFormSchema) => {
        console.log(data)
    }

    if(!isClient) {
        return null;
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-neutral-900 p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                       Create your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-neutral-600">
                        Create your server to start conversations. You can change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={control} 
                                    name="imageUrl" 
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange}   />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField 
                                control={control} 
                                name="name" 
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-neutral-500 dark:text-secondary/70">
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Server name" 
                                                disabled={isSubmitting} 
                                                className="bg-neutral-300/50 border-0 focus-visible:ring-0 text-neutral-900 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                } 
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

export default InitialModal;