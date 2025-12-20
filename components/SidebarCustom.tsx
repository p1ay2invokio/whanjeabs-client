'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { create, useStore } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaLine } from "react-icons/fa6";
import { Button } from "./ui/button"
import CustomAlert from "./CustomAlert"
// import { useAlert } from "./CustomAlert"


type sidebarType = {
    current: number,
    nextPage: (page: number) => void
}

export const sidebarStore = create<sidebarType>((set) => {
    return {
        current: 3,
        nextPage: (page: number) => set((state: any) => {
            return {
                current: page
            }
        })
    }
})

const SidebarCustom = () => {

    let navigate = useRouter()

    let [decode, setDecode] = useState<any>(null)

    let { toggleSidebar, isMobile } = useSidebar()
    // let { setOpen } = useAlert()

    useEffect(() => {
        (async () => {

            let token: any = localStorage.getItem("token")

            let decoded = await jwtDecode(token)


            setDecode(decoded)

            console.log(decoded)

        })()
    }, [])

    return (
        <Sidebar className="font-[regular]">
            <SidebarHeader />
            <SidebarContent>

                <SidebarGroup>

                    <SidebarGroupLabel>{decode ? decode.email : 'Utils'}</SidebarGroupLabel>

                    <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer" onClick={() => {
                            navigate.push("/dashboard")
                            if (isMobile) {
                                toggleSidebar()
                            }
                        }}>Dashboard</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer" onClick={() => {
                            navigate.push("/credential")
                            if (isMobile) {
                                toggleSidebar()
                            }
                        }}>Credentials</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="cursor-pointer" onClick={() => {
                                navigate.push("/line-cannon")
                                if (isMobile) {
                                    toggleSidebar()
                                }
                            }}>
                                <p>Line Cannon</p>
                                <div className="bg-blue-200/40 p-3 pt-0 pb-0 rounded-lg h-5 absolute right-2 text-blue-500 font-[medium]">new</div>
                            </SidebarMenuButton>

                        </SidebarMenuItem>

                    </SidebarMenu>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton className="cursor-pointer" onClick={() => {
                                navigate.push("/package")
                                if (isMobile) {
                                    toggleSidebar()
                                }
                            }}>
                                <p>Package เสริม</p>
                                <div className="bg-green-200/40 p-3 pt-0 pb-0 rounded-lg h-5 absolute right-2 text-green-500 font-[medium]">promotion</div>
                            </SidebarMenuButton>

                        </SidebarMenuItem>

                    </SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer" onClick={() => {
                            window.open('https://documenter.getpostman.com/view/14047437/2sB3dMwAdW#9af66a95-57aa-4a69-91b4-fd8d28f39687', "_blank")
                        }}>Documentation</SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarMenuButton className="font-[klight] cursor-pointer" onClick={() => {
                        window.open("https://line.me/ti/p/EF8-FhTcxt", "_blank")
                    }}>
                        <div>
                            <p>พบปัญหา/ติดต่อสอบถาม</p>
                            <p className="text-[12px] text-gray-400">โดยปกติจะตอบภายใน 3 ~ 5 นาที</p>
                        </div>
                    </SidebarMenuButton>
                    <SidebarMenuButton className="font-[klight]" onClick={() => {
                        // setOpen(true)

                        CustomAlert().then((res) => {
                            if (res) {
                                localStorage.removeItem("token")
                                window.location.href = "/"
                            }
                        })
                    }}>ออกจากระบบ</SidebarMenuButton>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}

export default SidebarCustom