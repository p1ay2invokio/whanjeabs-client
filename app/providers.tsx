'use client'

import CustomAlert from "@/components/CustomAlert"
import SidebarCustom from "@/components/SidebarCustom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast"

export const Providers = ({ children }: { children: any }) => {

    let path = usePathname()

    return (
        <SidebarProvider>
            {path != '/login' && path != '/register' && path != '/' && path != '/about' ? <>
                <SidebarCustom />
                <SidebarTrigger className="md:hidden  ml-3 mt-3" />
            </> : null}

            {children}
            <Toaster position="bottom-center" />
        </SidebarProvider>
    )
}