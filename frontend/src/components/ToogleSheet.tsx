// lib
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
// components
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import NavigationSidebar from "@/components/NavigationSidebar";
import ServerSidebar from "@/features/server/ServerSidebar";

const ToogleSheet = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Auto-close Sheet on route change
    useEffect(() => {
        setOpen(false)
    }, [location.pathname]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-3 md:hidden">
                    <Menu className="size-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-row gap-0 w-fit md:hidden" showCloseButton={false}  >
                <DialogTitle className="sr-only">Navigation and Server Sidebar</DialogTitle>
                <DialogDescription className="sr-only">
                    Use this menu to navigate between servers and channels.
                </DialogDescription>

                <NavigationSidebar />
                <ServerSidebar />
            </SheetContent>
        </Sheet>
    )
}

export default ToogleSheet;